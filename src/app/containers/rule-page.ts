import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromRoot from '../reducers';
import * as fromRule from '../reducers/rule';
import { Rule } from '../models/rule';

@Component({
  selector: 'rule',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <md-card>
      <md-card-title>Rules</md-card-title>
      <md-card-content>
        <md-list>
          <h3 md-subheader>Rules</h3>
          <md-list-item
            class="item-rule"
            *ngFor="let rule of rules$ | async; let i = index"
            [class.active]="rule.id === currentId"
            (click)="selectRule(rule)"
          >
            <md-icon *ngIf="rule.enabled" md-list-avatar>visibility</md-icon>
            <md-icon *ngIf="!rule.enabled" md-list-avatar>visibility_off</md-icon>
            <h4 md-line>{{rule.name}} <small>({{i}})</small></h4>
            <p md-line class="muted"> {{rule.criteria}} </p>
          </md-list-item>
        </md-list>

        <md-card *ngIf="selectedRule" class="editors-wrapper">
          <md-card-header>
            <md-card-title>Editors</md-card-title>
            <md-card-subtitle>Edit {{selectedRule.name}} rule (criteria on left, action on right)</md-card-subtitle>

            <md-slide-toggle
              style="float: right"
              [checked]="currentEnabled"
              (change)="toggleEnable()"
            >
              Enable rule ?
            </md-slide-toggle>
          </md-card-header>
          <md-card-content>
            <md-input-container class="editor">
              <textarea md-input [(ngModel)]="currentCriteria"></textarea>
            </md-input-container>

            <md-input-container class="editor">
              <textarea md-input [(ngModel)]="currentAction"></textarea>
            </md-input-container>
          </md-card-content>
          <md-card-actions>
            <button md-raised-button color="primary" (click)="doUpdate()">
              Update this rule
            </button>
            <button md-raised-button (click)="doReset()">
              Reset editors
            </button>
          </md-card-actions>
        </md-card>
      </md-card-content>
    </md-card>
  `,
  styles: [`
    :host .muted {
      color: rgba(0,0,0,.6)
    }
    :host .editor {
      width: 47%;
      margin: 0 1.25%;
      font-family: monospace;
    }
    :host .editor textarea {
      height: 140px;
      background: #fafafa;
      padding: 5px 8px;
    }
    :host .editors-wrapper {
      margin-top: 8px;
    }
    :host .item-rule {
      transition: all ease 0.3s;
    }
    :host .item-rule.active {
      border-right: 2px solid rgba(0,0,0,.5);
      background: rgba(0,0,0,.03);
    }
    :host .item-rule:hover {
      background: rgba(0,0,0,.04);
    }
  `]
})
export class RulePageComponent  {
  rules$: Observable<Rule[]>;

  selectedRule: Rule;
  currentId: number = -1;
  currentName: string;
  currentCriteria: string;
  currentAction: string;
  currentEnabled: boolean;

  constructor(
    private store: Store<fromRoot.State>,
  ) {
    this.rules$ = this.store.select(s => s.rule.entities);

    this.store.dispatch({
      type: fromRule.ActionTypes.RULES_REQUESTS
    });
  }

  selectRule(rule: Rule) {
    console.log('3456789', rule);

    this.selectedRule = rule;

    this.store.dispatch({
      type: fromRule.ActionTypes.RULE_SELECTED,
      payload: rule.id
    });

    this.doReset();
  }

  toggleEnable() {
    this.currentEnabled = !this.currentEnabled;
  }

  doReset() {
    this.currentId = this.selectedRule.id;
    this.currentAction = this.selectedRule.action;
    this.currentCriteria = this.selectedRule.criteria;
    this.currentEnabled = this.selectedRule.enabled;
  }

  doUpdate() {
    console.log(this.currentEnabled);

    this.store.dispatch({
      type: fromRule.ActionTypes.RULE_UPDATE_REQUEST,
      payload: <Rule> {
        id: this.selectedRule.id,
        name: this.selectedRule.name,
        criteria: this.currentCriteria,
        action: this.currentAction,
        enabled: this.currentEnabled
      }
    });
  }
}
