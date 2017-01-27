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

import { RuleService } from '../services/rule';

@Injectable()
export class RuleEffects {
  constructor(
    private actions$: Actions,
    private api: RuleService
  ) { }

  @Effect()
  auth$: Observable<Action> = this.actions$
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

    //   return this.googleBooks.searchBooks(query)
    //     .takeUntil(nextSearch$)
    //     .map(books => new book.SearchCompleteAction(books))
    //     .catch(() => of(new book.SearchCompleteAction([])));
    // });
}
