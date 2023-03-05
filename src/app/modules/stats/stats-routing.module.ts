import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GameStatsComponent} from "./components/game-stats/game-stats.component";
import {TeamsResolver} from "./resolvers/teams.resolver";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: GameStatsComponent,
    resolve: {
      teams: TeamsResolver,
    }
  },
  {
    path: '**', redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StatsRoutingModule {
}
