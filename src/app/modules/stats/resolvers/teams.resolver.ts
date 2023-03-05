import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import {NbaService} from "../../../shared/services/nba.service";
import {Team} from "../../../shared/models/team.model";

@Injectable()
export class TeamsResolver implements Resolve<Team[]> {
  constructor(
    private readonly nbaService: NbaService,
  ) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Team[]> {
    return this.nbaService.getAllTeams();
  }
}
