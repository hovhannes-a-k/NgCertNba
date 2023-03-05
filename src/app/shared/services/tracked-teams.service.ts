import { Injectable } from '@angular/core';
import {Team} from "../models/team.model";
import {BehaviorSubject, Observable} from "rxjs";
import {NbaService} from "./nba.service";

@Injectable({
  providedIn: 'root'
})
export class TrackedTeamsService {

  private trackedTeams: Team[] = [];
  private _trackedTeams$ = new BehaviorSubject<Team[]>([]);
  get trackedTeams$(): Observable<Team[]> {
    return this._trackedTeams$.asObservable();
  }
  constructor(
    private readonly nbaService: NbaService,
  ) { }

  addTrackedTeam(teamId: Team['id']): void {
    let team = this.nbaService.allTeams.find(team => team.id == teamId);
    if (!team) return;
    this.trackedTeams.push(team);
    this._trackedTeams$.next(this.trackedTeams);
  }

  removeTrackedTeam(teamId: Team['id']): void {
    const index = this.trackedTeams.findIndex(({id}) => id === teamId);
    this.trackedTeams.splice(index, 1);
    this._trackedTeams$.next(this.trackedTeams);
  }

  getTeamByAbbr(abbr: string | null = ''): Team | undefined {
    return this.trackedTeams.find(team => team.abbreviation === abbr);
  }
}
