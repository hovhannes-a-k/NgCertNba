import {
  ChangeDetectionStrategy,
  Component,
  Input, OnChanges,
  SimpleChanges,
} from '@angular/core';
import {Observable, tap} from 'rxjs';
import {NbaService} from '../../../../shared/services/nba.service';
import {Team} from "../../../../shared/models/team.model";
import {Stats} from "../../../../shared/models/stats.model";
import {Game} from "../../../../shared/models/game.model";
import {ModalService} from "../../../modal/services/modal.service";
import {RemoveConfirmationComponent} from "../remove-confirmation/remove-confirmation.component";
import {TrackedTeamsService} from "../../../../shared/services/tracked-teams.service";

@Component({
  selector: 'app-team-stats',
  templateUrl: './team-stats.component.html',
  styleUrls: ['./team-stats.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamStatsComponent implements OnChanges {

  @Input() team!: Team;

  @Input() numberOfDays!: number;

  games$!: Observable<Game[]>;
  stats!: Stats;
  constructor(
    private readonly nbaService: NbaService,
    private readonly trackedTeamsService: TrackedTeamsService,
    private readonly modalService: ModalService,
  ) { }

  ngOnChanges(changes:SimpleChanges): void {
    if (changes['numberOfDays']?.currentValue && this.team)
      this.games$ = this.getStatsFromGames();
  }

  public removeTrackedTeam(teamId: Team['id']): void {
    this.modalService.openModal(RemoveConfirmationComponent)
      .subscribe(() => {
        this.trackedTeamsService.removeTrackedTeam(teamId);
      });
  }

  private getStatsFromGames(): Observable<Game[]> {
    return this.nbaService.getLastResults(this.team.id, this.numberOfDays).pipe(
      tap(games => this.stats = this.nbaService.getStatsFromGames(games, this.team))
    )
  }

}
