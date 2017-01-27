import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MdDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromRoot from '../reducers';
import * as fromUser from '../reducers/user';
import { UserDetail } from '../models/user-detail';
import { UserDialogComponent } from '../components/user-dialog';

@Component({
  selector: 'user',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <md-card>
      <md-card-title>Users</md-card-title>
      <md-card-content>
        <md-list>
          <h3 md-subheader>All Users</h3>
          <md-list-item class="item-user" (click)="onUser(user)" *ngFor="let user of users$ | async; let i = index">
            <md-icon md-list-avatar>face</md-icon>
            <h4 md-line>{{user.user.userId}}</h4>
            <p md-line class="muted">{{user.user.numberOfEvents}} events & {{user.badges.length}} badges</p>
          </md-list-item>
        </md-list>
      </md-card-content>
      <md-card-actions>
      </md-card-actions>
    </md-card>
  `,
  styles: [`
    :host .muted {
      color: rgba(0,0,0,.6)
    }
    :host .item-user {
      transition: all ease 0.3s;
    }
    :host .item-user:hover {
      background: rgba(0,0,0,.04);
    }
  `]
})
export class UserPageComponent {
  users$: Observable<UserDetail[]>;

  constructor(
    private store: Store<fromRoot.State>,
    public dialog: MdDialog
  ) {
    this.users$ = this.store.select(s => s.user.entities);

    this.store.dispatch({
      type: fromUser.ActionTypes.USERS_REQUEST
    });
  }

  onUser(user: UserDetail) {
    let dialogRef = this.dialog.open(UserDialogComponent);
    dialogRef.componentInstance.info = user;
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
}
