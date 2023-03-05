import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NbaService} from '../../../../shared/services/nba.service';
import {first, map, Observable, zip} from 'rxjs';
import {Team} from "../../../../shared/models/team.model";
import {Game} from "../../../../shared/models/game.model";
import {TrackedTeamsService} from "../../../../shared/services/tracked-teams.service";

@Component({
  selector: 'app-game-results',
  templateUrl: './game-results.component.html',
  styleUrls: ['./game-results.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameResultsComponent {

  team?: Team;
  games$?: Observable<Game[]>;
  numberOfDays = 12;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly trackedTeamsService: TrackedTeamsService,
    private readonly nbaService: NbaService,
  ) {
    this.getGameResults();
  }

  private getGameResults(): void {
    zip([
      this.getTeam(),
      this.getNumberOfDays(),
    ])
      .pipe(
        first()
      )
      .subscribe(([team, numberOfDays]) => {
        this.numberOfDays = numberOfDays;
        this.team = team;
        if (this.team)
          this.games$ = this.nbaService.getLastResults(this.team.id, +numberOfDays);
      })
  }

  private getTeam(): Observable<Team | undefined> {
    return this.activatedRoute.paramMap.pipe(
      map(paramMap => this.trackedTeamsService.getTeamByAbbr(paramMap.get('teamAbbr'))),
    );
  }

  private getNumberOfDays(): Observable<number> {
    return this.activatedRoute.queryParamMap.pipe(
      map(queryParamMap => {
        const numberOfDays = queryParamMap.get('numberOfDays');
        return numberOfDays ? +numberOfDays : 12;
      }),
    );
  }

  public trackById(_: number, item: { id: number }): number {
    return item.id;
  }

  public refreshGameData(numberOfDays: number): void {
    if (this.team)
      this.games$ = this.nbaService.getLastResults(this.team.id, numberOfDays);
  }

}
