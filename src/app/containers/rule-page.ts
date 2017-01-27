import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
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
          <md-list-item (click)="selectRule(rule)" *ngFor="let rule of rules$ | async; let i = index">
            <md-icon *ngIf="rule.enabled" md-list-avatar>visibility</md-icon>
            <md-icon *ngIf="!rule.enabled" md-list-avatar>visibility_off</md-icon>
            <h4 md-line>{{rule.name}} [{{i}}]</h4>
            <p md-line class="muted"> {{rule.criteria}} </p>
          </md-list-item>
        </md-list>

        <md-card *ngIf="selectedRule" class="editors-wrapper">
          <md-card-header>
            <md-card-title>Editors</md-card-title>
            <md-card-subtitle>Edit {{selectedRule.name}} rule (criteria on left, action on right)</md-card-subtitle>
          </md-card-header>
          <md-card-content>
            <md-input-container class="editor">
              <textarea md-input>{{selectedRule.criteria}}</textarea>
            </md-input-container>

            <md-input-container class="editor">
              <textarea md-input>{{selectedRule.action}}</textarea>
            </md-input-container>
          </md-card-content>
        </md-card>

      </md-card-content>
      <md-card-actions>
      </md-card-actions>
    </md-card>
  `,
  styles: [`
    :host .muted {
      color: rgba(0,0,0,.6)
    }
    :host .editor {
      width: 49.5%;
      font-family: monospace;
    }
    :host .editor textarea {
      height: 140px;
    }
    :host .editors-wrapper {
    }
  `]
})
export class RulePageComponent implements OnInit  {
  rules$: Observable<Rule[]>;

  selectedRule: Rule;

  constructor(
    private store: Store<fromRoot.State>,
    // private router: Router
  ) {
    this.rules$ = this.store.select(s => s.rule.entities);

    this.store.dispatch({
      type: fromRule.ActionTypes.RULES_REQUESTS
    });
  }

  ngOnInit() {
  }

  selectRule(rule: Rule) {
    console.log('3456789', rule);

    this.selectedRule = rule;

    this.store.dispatch({
      type: fromRule.ActionTypes.RULE_SELECTED,
      payload: rule.name
    });
  }
}
