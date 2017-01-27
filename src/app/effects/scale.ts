import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromScale from '../reducers/scale';

import { ScaleService } from '../services/scale';

@Injectable()
export class ScaleEffects {
  constructor(
    private actions$: Actions,
    private api: ScaleService
  ) { }

  @Effect()
  getAll$: Observable<Action> = this.actions$
    .ofType(fromScale.ActionTypes.SCALE_REQUEST)
    .debounceTime(50)
    .map(action => action.payload)
    .switchMap(() => {
      return this.api.getAll()
        .map((res: Response) => {
          if (res.ok) {
            return res.json();
          } else {
            return <Action>{
              type: fromScale.ActionTypes.SCALE_FAIL
            };
          }
        })
        .map(scales => {
          return <Action>{
            type: fromScale.ActionTypes.SCALE_SUCCESS,
            payload: scales
          };
      });
    });
}
