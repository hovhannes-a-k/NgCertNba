import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ResultsGuard} from "./shared/guards/results.guard";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./modules/stats/stats.module'),
  },
  {
    path: 'results/:teamAbbr',
    loadChildren: () => import('./modules/results/results.module'),
    canMatch: [ResultsGuard],
  },
  {
    path: '**', redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
