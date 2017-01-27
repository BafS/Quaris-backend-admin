import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { UserDetail } from '../models/user-detail';

@Component({
  selector: 'user-dialog',
  template: `
    <md-dialog-content>
      <h1 md-dialog-title color="primary">{{info.user.userId}}</h1>
      <p md-line class="muted">{{info.user.numberOfEvents}} events created</p>

        <md-list>
          <h3 md-subheader>Badges</h3>
          <md-list-item *ngFor="let badge of info.badges">
            <md-icon md-list-avatar>face</md-icon>
            <h4 md-line>{{badge.name}}</h4>
            <p md-line class="muted">{{badge.description}}</p>
          </md-list-item>
        </md-list>

        <md-list>
          <h3 md-subheader>Scales</h3>
          <md-list-item *ngFor="let scale of info.scales">
            <md-icon md-list-avatar>assessment</md-icon>
            <h4 md-line>{{scale.name}}</h4>
            <p md-line class="muted">{{scale.description}}</p>
          </md-list-item>
        </md-list>
    </md-dialog-content>
  `,
  styles: [`
    :host  .badge-dialog {
      max-width: 350px;
      margin: 20px 0;
    }
    :host h1 {
      font-family: sans-serif;
    }
  `]
})
export class UserDialogComponent {
  public info: UserDetail;

  constructor(
    public dialogRef: MdDialogRef<UserDialogComponent>,
  ) { }
}
