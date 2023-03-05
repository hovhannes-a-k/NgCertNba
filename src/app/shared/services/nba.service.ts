import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable, shareReplay, tap} from 'rxjs';
import { format, subDays } from 'date-fns';
import {Config} from "../../config/config";
import {Team} from "../models/team.model";
import {Game} from "../models/game.model";
import {Stats} from "../models/stats.model";

@Injectable({
  providedIn: 'root',
})
export class NbaService {

  private _allTeams: Team[] = [];
  private cachedRequests: Record<string, Observable<any>> = {};

  get allTeams(): Team[] {
    return this._allTeams;
  }
  constructor(private http: HttpClient) { }

  getAllTeams(): Observable<Team[]> {
    const url = `${Config.API}/teams?page=0`;
    if (!this.cachedRequests[url]) {
      this.cachedRequests[url] = this.http.get<{data: Team[]}>(`${Config.API}/teams?page=0`).pipe(
        map(res => res.data),
        tap(data => this._allTeams = data),
        shareReplay(1),
      );
    }
    return this.cachedRequests[url];
  }

  getLastResults(teamId: Team['id'], numberOfDays = 12 ): Observable<Game[]> {
    const url = `${Config.API}/games?page=0${this.getDaysQueryString(numberOfDays)}&per_page=12&team_ids[]=${+teamId}`;
    if (!this.cachedRequests[url]) {
      this.cachedRequests[url] = this.http.get<{ meta: any, data: Game[] }>(url)
        .pipe(
          map(res => res.data),
          shareReplay(1),
        );
    }
    return this.cachedRequests[url];
  }

  getStatsFromGames(games: Game[], team: Team): Stats {
        const stats: Stats = {wins: 0, losses: 0, averagePointsScored: 0, averagePointsConceded: 0, lastGames: []};
        games.forEach(game => {
            const gameStats = this.getSingleGameStats(team, game);
            stats.wins += gameStats.wins;
            stats.losses += gameStats.losses;
            stats.averagePointsConceded += gameStats.averagePointsConceded;
            stats.averagePointsScored += gameStats.averagePointsScored;
          stats.lastGames.push(gameStats.wins == 1 ? 'W' : 'L');
        });
        stats.averagePointsScored = Math.round(stats.averagePointsScored / games.length);
        stats.averagePointsConceded = Math.round(stats.averagePointsConceded / games.length);
        return stats;
  }

  private getDaysQueryString(nbOfDays = 12): string {
    let qs = "";
    for (let i = 1;i < nbOfDays; i++) {
      let date = format(subDays(new Date(), i), "yyyy-MM-dd")
      qs = qs.concat("&dates[]=" + date);
    }
    return qs;
  }

  private getSingleGameStats(team: Team, game: Game): Stats {
    const stats: Stats = {wins: 0, losses: 0, averagePointsScored: 0, averagePointsConceded: 0, lastGames: []};
    if (game.home_team.id === team.id) {
      stats.averagePointsScored = game.home_team_score;
      stats.averagePointsConceded = game.visitor_team_score;
      if (game.home_team_score > game.visitor_team_score) {
        stats.wins +=1;
      } else {
        stats.losses += 1;
      }
    }
    if (game.visitor_team.id === team.id) {
      stats.averagePointsScored = game.visitor_team_score;
      stats.averagePointsConceded = game.home_team_score;
      if (game.visitor_team_score > game.home_team_score) {
        stats.wins = 1;
      } else {
        stats.losses = 1;
      }
    }
    return stats;
  }
}
