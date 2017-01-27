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

import * as fromAuthentication from '../reducers/authentication';


import { AuthenticationService } from '../services/authentication';

@Injectable()
export class AuthenticationEffects {
  constructor(private actions$: Actions, private api: AuthenticationService) { }

  @Effect()
  preAuth$: Observable<Action> = this.actions$
    .ofType(fromAuthentication.ActionTypes.AUTHENTICATION_TEST_REQUEST)
    .map(() => {
      if (window.localStorage && window.localStorage.getItem('token')) {
        return <Action>{
          type: fromAuthentication.ActionTypes.AUTHENTICATION_SUCCESS,
          payload: window.localStorage.getItem('token')
        };
      } else {
        return <Action>{
          type: fromAuthentication.ActionTypes.AUTHENTICATION_FAIL
        };
      }
    });

  @Effect()
  auth$: Observable<Action> = this.actions$
    .ofType(fromAuthentication.ActionTypes.AUTHENTICATION_REQUEST)
    // .debounceTime(300)
    .map(action => action.payload)
    .switchMap(payload => {
      console.log(payload);
      return this.api.authenticate(payload.username, payload.password)
      .map((response: Response) => {
        if (response.ok) {
          const token = response.headers.get('Authorization').replace(/Bearer */i, '');

          window.localStorage.setItem('token', token);

          return <Action>{
            type: fromAuthentication.ActionTypes.AUTHENTICATION_SUCCESS,
            payload: token
          };
        } else {
          return <Action>{
            type: fromAuthentication.ActionTypes.AUTHENTICATION_FAIL
          };
        }
      });
    });

    //   return this.googleBooks.searchBooks(query)
    //     .takeUntil(nextSearch$)
    //     .map(books => new book.SearchCompleteAction(books))
    //     .catch(() => of(new book.SearchCompleteAction([])));
    // });
}
