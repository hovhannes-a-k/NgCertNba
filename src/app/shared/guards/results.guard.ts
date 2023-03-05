import { Injectable } from '@angular/core';
import {CanMatch, Route, Router, UrlSegment, UrlTree} from '@angular/router';
import {TrackedTeamsService} from "../services/tracked-teams.service";

@Injectable()
export class ResultsGuard implements CanMatch {

  constructor(
    private readonly router: Router,
    private readonly trackedTeamsService: TrackedTeamsService,
  ) {}
  canMatch(
    route: Route,
    segments: UrlSegment[]): boolean | UrlTree {
    const teamAttr = segments[1].path;
    return !!this.trackedTeamsService.getTeamByAbbr(teamAttr) || this.router.createUrlTree(['/']);
  }

}
