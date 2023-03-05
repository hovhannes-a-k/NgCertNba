import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Team} from "../../../../shared/models/team.model";
import {DIVISIONS} from "../../constants/divisions";
import {CONFERENCES} from "../../constants/conferences";

@Component({
  selector: 'app-game-stats-filters',
  templateUrl: './game-stats-filters.component.html',
  styleUrls: ['./game-stats-filters.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameStatsFiltersComponent {
  @Input() teams: Team[] = [];
  @Output() onTrackTeam = new EventEmitter<Team['id']>();
  @Output() onNumberOfDaysChange = new EventEmitter<number>();

  public conferences = CONFERENCES;
  public divisions = DIVISIONS;
  public conference = null;
  public division = null;
  public numberOfDays = 12;

  public trackById(_: number, item: { id: number | string }): string | number {
    return item?.id;
  }

  public trackTeam(teamId: Team['id']): void {
    if (!teamId) return;
    this.onTrackTeam.emit(teamId);
  }

  public changeNumberOfDays(numberOfDays: number): void {
    this.onNumberOfDaysChange.emit(numberOfDays);
  }
}
