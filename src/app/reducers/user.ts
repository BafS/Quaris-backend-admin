import { UserDetail } from '../models/user-detail';
// import { createSelector } from 'reselect';

export const ActionTypes = {
  USERS_REQUEST: 'USERS_REQUEST',
  USERS_SUCCESS: 'USERS_SUCCESS',
  USERS_FAIL: 'USERS_FAIL',
};

export interface State {
  entities: UserDetail[];
};

const initialState: State = {
  entities: [],
};

export function reducer(state = initialState, action): State {
  switch (action.type) {
    case ActionTypes.USERS_SUCCESS: {
      // const payload = action.payload;

      return {
        entities: action.payload
      };
    }

    default: {
      return state;
    }
  }
}
