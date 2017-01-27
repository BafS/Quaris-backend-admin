import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromRoot from '../reducers';
import * as fromScale from '../reducers/scale';
import { Scale } from '../models/scale';

@Component({
  selector: 'scale',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <md-card>
      <md-card-title>Scales</md-card-title>
      <md-card-content>
        <md-list>
          <h3 md-subheader>All scales</h3>
          <md-list-item
            class="item-rule"
            *ngFor="let scale of scales$ | async; let i = index"
          >
            <md-icon md-list-avatar>assessment</md-icon>
            <h4 md-line>{{scale.name}}</h4>
            <p md-line class="muted">{{scale.description}}</p>
          </md-list-item>
        </md-list>

      </md-card-content>
    </md-card>
  `,
  styles: [`
    :host .muted {
      color: rgba(0,0,0,.6)
    }
  `]
})
export class ScalePageComponent  {
  scales$: Observable<Scale[]>;

  constructor(
    private store: Store<fromRoot.State>,
  ) {
    this.scales$ = this.store.select(s => s.scale.entities);

    this.store.dispatch({
      type: fromScale.ActionTypes.SCALE_REQUEST
    });
  }
}
