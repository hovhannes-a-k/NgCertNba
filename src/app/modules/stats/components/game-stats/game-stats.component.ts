import {ChangeDetectionStrategy, Component} from '@angular/core';
import {map, Observable} from 'rxjs';
import {Team} from "../../../../shared/models/team.model";
import {ActivatedRoute} from "@angular/router";
import {TrackedTeamsService} from "../../../../shared/services/tracked-teams.service";

@Component({
  selector: 'app-game-stats',
  templateUrl: './game-stats.component.html',
  styleUrls: ['./game-stats.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameStatsComponent {

  teams$: Observable<Team[]>;
  numberOfDays: number = 12;

  constructor(
    private readonly route: ActivatedRoute,
    protected readonly trackedTeamsService: TrackedTeamsService,
  ) {
    this.teams$ = this.route.data.pipe(
      map(({teams}) => teams),
    );
  }

  trackTeam(teamId: number): void {
    this.trackedTeamsService.addTrackedTeam(teamId);
  }

  public trackById(_: number, team: Team): number {
    return team.id;
  }

  public changeNumberOfDays(numberOfDays: number): void {
    this.numberOfDays = numberOfDays;
  }
}
