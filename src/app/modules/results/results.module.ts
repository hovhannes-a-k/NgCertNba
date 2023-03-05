import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GameResultsComponent} from "./components/game-results/game-results.component";
import {ResultsRoutingModule} from "./results-routing.module";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    GameResultsComponent,
  ],
  imports: [
    CommonModule,
    ResultsRoutingModule,
    FormsModule,
  ]
})
export default class ResultsModule { }
