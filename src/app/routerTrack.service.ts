import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RouteTrackerService {
  private previousUrl: string | null = null;
  private currentUrl: string | null = null;

  constructor(private router: Router) {
    this.currentUrl = this.router.url;

    this.router.events
      .pipe(
        filter((event): event is NavigationStart => event instanceof NavigationStart),
        pairwise()
      )
      .subscribe(([prev, curr]) => {
        this.previousUrl = prev.url;
        this.currentUrl = curr.url;
      });
  }

  public getPreviousUrl(): string | null {
    return this.previousUrl;
  }
}
