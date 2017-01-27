import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromRoot from '../reducers';

@Component({
  selector: 'dashboard',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <md-card>
      <md-card-title>Dashboard</md-card-title>
      <md-card-content>

        <md-grid-list cols="8" rowHeight="70px">
          <md-grid-tile [colspan]="2" [rowspan]="1" class="btn">
            <a md-raised-button routerLink="/rules">Rules</a>
          </md-grid-tile>
          <md-grid-tile [colspan]="2" [rowspan]="1" class="btn">
            <a md-raised-button routerLink="/badges">Badges</a>
          </md-grid-tile>
          <md-grid-tile [colspan]="2" [rowspan]="1" class="btn">
            <a md-raised-button routerLink="/scales">Scales</a>
          </md-grid-tile>
          <md-grid-tile [colspan]="2" [rowspan]="1" class="btn">
                <a md-raised-button routerLink="/users">Users</a>
          </md-grid-tile>
          <md-grid-tile [colspan]="2" [rowspan]="1" class="btn">
                <a md-raised-button routerLink="/about">About</a>
          </md-grid-tile>
        </md-grid-list>

      </md-card-content>
      <md-card-actions>
      </md-card-actions>
    </md-card>
  `,
  styles: [`
    :host {
      text-align: center;
    }
    :host .btn {
      width: 100%
    }
  `]
})
export class DashboardPageComponent {
  authentication$: Observable<any>;

  constructor(
    private store: Store<fromRoot.State>,
    // private router: Router
  ) {
    this.authentication$ = this.store.select(s => s.authentication);
  }
}
