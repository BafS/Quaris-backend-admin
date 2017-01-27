import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MdDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromRoot from '../reducers';
import * as fromBadge from '../reducers/badge';
import { Badge } from '../models/badge';
import { AddBadgeDialogComponent } from '../components/add-badge-dialog';

@Component({
  selector: 'rule',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <md-card>
      <md-card-title>Badges</md-card-title>
      <md-card-content>
        <md-list>
          <h3 md-subheader>Badges</h3>
          <md-list-item *ngFor="let badge of badges$ | async; let i = index">
            <h4 md-line>{{badge.name}}</h4>
            <p md-line class="muted">{{badge.description}}</p>
          </md-list-item>
        </md-list>
      </md-card-content>
      <md-card-actions>
        <a md-raised-button color="primary" (click)="openDialog()">Add new badge</a>
      </md-card-actions>
    </md-card>
  `,
  styles: [`
    :host .muted {
      color: rgba(0,0,0,.6)
    }
  `]
})
export class BadgePageComponent {
  badges$: Observable<Badge[]>;

  constructor(
    private store: Store<fromRoot.State>,
    public dialog: MdDialog
  ) {
    this.badges$ = this.store.select(s => s.badge.entities);

    this.store.dispatch({
      type: fromBadge.ActionTypes.BADGES_REQUEST
    });
  }

  openDialog() {
    let dialogRef = this.dialog.open(AddBadgeDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      // this.selectedOption = result;
    });
  }
}
