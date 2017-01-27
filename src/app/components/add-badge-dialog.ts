import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { Store } from '@ngrx/store';
import { Badge } from '../models/badge';
import * as fromRoot from '../reducers';
import * as fromBadge from '../reducers/badge';

@Component({
  selector: 'add-badge-dialog',
  template: `
    <md-card-content class="badge-dialog">
      <h1 md-dialog-title>Add badge</h1>

      <md-dialog-content>
        <md-input placeholder="Name" style="width: 100%" [(ngModel)]="name"></md-input>
        <md-input-container class="example-full-width" style="width: 100%">
          <textarea md-input placeholder="Description" [(ngModel)]="description"></textarea>
        </md-input-container>

        <button md-button (click)="save()">
          <md-icon class="md-24">add</md-icon>
        </button>
        <button md-button (click)="dialogRef.close()">
          <md-icon class="md-24">clear</md-icon>
        </button>
      </md-dialog-content>
    </md-card-content>
  `,
  styles: [`
    :host  .badge-dialog {
      max-width: 350px;
      margin: 20px 0;
    }
  `]
})
export class AddBadgeDialogComponent {
  public name: string;
  public description: string;

  constructor(
    public dialogRef: MdDialogRef<AddBadgeDialogComponent>,
    private store: Store<fromRoot.State>,
  ) { }

  save() {
    this.store.dispatch({
      type: fromBadge.ActionTypes.BADGES_ADD_REQUEST,
      payload: <Badge> {
        name: this.name,
        description: this.description
      }
    });

    this.dialogRef.close();
  }
}
