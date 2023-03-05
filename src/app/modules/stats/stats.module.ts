import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {StatsRoutingModule} from "./stats-routing.module";
import { GameStatsFiltersComponent } from './components/game-stats-filters/game-stats-filters.component';
import {GameStatsComponent} from "./components/game-stats/game-stats.component";
import {TeamStatsComponent} from "./components/team-stats/team-stats.component";
import {TeamsResolver} from "./resolvers/teams.resolver";
import {FilterByPipe} from "../../shared/pipes/filter-by.pipe";
import {FormsModule} from "@angular/forms";
import {ModalModule} from "../modal/modal.module";
import { RemoveConfirmationComponent } from './components/remove-confirmation/remove-confirmation.component';

@NgModule({
  declarations: [
    TeamStatsComponent,
    GameStatsComponent,
    GameStatsFiltersComponent,
    RemoveConfirmationComponent,
  ],
    imports: [
        CommonModule,
        StatsRoutingModule,
        FilterByPipe,
        FormsModule,
        ModalModule,
        NgOptimizedImage,
    ],
  providers: [
    TeamsResolver,
  ]
})
export default class StatsModule { }
