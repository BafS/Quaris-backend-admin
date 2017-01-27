import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
// import { empty } from 'rxjs/observable/empty';
// import { of } from 'rxjs/observable/of';

import * as fromRule from '../reducers/rule';

import { Rule } from '../models/rule';
import { RuleService } from '../services/rule';

@Injectable()
export class RuleEffects {
  constructor(
    private actions$: Actions,
    private api: RuleService
  ) { }

  @Effect()
  getAll$: Observable<Action> = this.actions$
    .ofType(fromRule.ActionTypes.RULES_REQUESTS)
    // .debounceTime(300)
    .map(action => action.payload)
    .switchMap(payload => {
      console.log(payload);
      return this.api.getAll()
        .map((res: Response) => {
          if (res.ok) {
            return res.json();
          } else {
            return <Action>{
              type: fromRule.ActionTypes.RULES_FAIL
            };
          }
        })
        .map(rules => {
          return <Action>{
            type: fromRule.ActionTypes.RULES_SUCCESS,
            payload: rules
          };
      });
    });

  @Effect()
  update$: Observable<Action> = this.actions$
    .ofType(fromRule.ActionTypes.RULE_UPDATE_REQUEST)
    .map(action => action.payload)
    .switchMap((rule: Rule) => {
      return this.api.update(rule.id, rule)
        .map((res: Response) => {
          if (res.ok) {
            return rule;
          } else {
            return <Action>{
              type: fromRule.ActionTypes.RULE_UPDATE_FAIL
            };
          }
        })
        .map(rule => {
          return <Action>{
            type: fromRule.ActionTypes.RULE_UPDATE_SUCCESS,
            payload: rule
          };
      });
    });
}
