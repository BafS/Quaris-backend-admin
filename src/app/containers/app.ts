import 'rxjs/add/operator/let';
import { Observable } from 'rxjs/Observable';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRoot from '../reducers';
import * as layout from '../actions/layout';


@Component({
  selector: 'quaris-app',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <bc-layout>
      <bc-sidenav [open]="showSidenav$ | async">
        <bc-nav-item (activate)="closeSidenav()" routerLink="/dashboard" icon="book" hint="The main dashboard">
          Dashboard
        </bc-nav-item>
        <bc-nav-item (activate)="closeSidenav()" routerLink="/rules" icon="code" hint="Show scales">
          Rules
        </bc-nav-item>
        <bc-nav-item (activate)="closeSidenav()" routerLink="/badges" icon="star" hint="Show scales">
          Badges
        </bc-nav-item>
        <bc-nav-item (activate)="closeSidenav()" routerLink="/scales" icon="assessment" hint="Show scales">
          Scales
        </bc-nav-item>
        <bc-nav-item (activate)="closeSidenav()" routerLink="/users" icon="people" hint="Show all users">
          Users
        </bc-nav-item>
        <bc-nav-item (activate)="closeSidenav()" routerLink="/" icon="book" hint="">
          Login / Logout
        </bc-nav-item>
      </bc-sidenav>
      <bc-toolbar (openMenu)="openSidenav()">
        Quaris
      </bc-toolbar>

      <router-outlet></router-outlet>
    </bc-layout>
  `
})
export class AppComponent {
  showSidenav$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>) {
    /**
     * Selectors can be applied with the `select` operator which passes the state
     * tree to the provided selector
     */
    this.showSidenav$ = this.store.select(fromRoot.getShowSidenav);
  }

  closeSidenav() {
    /**
     * All state updates are handled through dispatched actions in 'container'
     * components. This provides a clear, reproducible history of state
     * updates and user interaction through the life of our
     * application.
     */
    this.store.dispatch(new layout.CloseSidenavAction());
  }

  openSidenav() {
    this.store.dispatch(new layout.OpenSidenavAction());
  }
}
