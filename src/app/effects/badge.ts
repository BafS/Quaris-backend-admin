import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromBadge from '../reducers/badge';

import { BadgeService } from '../services/badge';

@Injectable()
export class BadgeEffects {
  constructor(
    private actions$: Actions,
    private api: BadgeService
  ) { }

  @Effect()
  getAll$: Observable<Action> = this.actions$
    .ofType(fromBadge.ActionTypes.BADGES_REQUEST)
    .debounceTime(50)
    .map(action => action.payload)
    .switchMap(() => {
      return this.api.getAll()
        .map((res: Response) => {
          if (res.ok) {
            return res.json();
          } else {
            return <Action>{
              type: fromBadge.ActionTypes.BADGES_FAIL
            };
          }
        })
        .map(badges => {
          return <Action>{
            type: fromBadge.ActionTypes.BADGES_SUCCESS,
            payload: badges
          };
      });
    });

  @Effect()
  create$: Observable<Action> = this.actions$
    .ofType(fromBadge.ActionTypes.BADGES_ADD_REQUEST)
    .debounceTime(50)
    .map(action => action.payload)
    .switchMap(badge => {
      return this.api.create(badge)
        .map((res: Response) => {
          if (res.ok) {
            return <Action>{
              type: fromBadge.ActionTypes.BADGES_ADD_SUCCESS,
              payload: badge
            };
          } else {
            return <Action>{
              type: fromBadge.ActionTypes.BADGES_ADD_FAIL
            };
          }
        });
      });
}
