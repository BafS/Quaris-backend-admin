// import { createSelector } from 'reselect';

export const ActionTypes = {
  AUTHENTICATION_REQUEST: 'AUTHENTICATION_REQUEST',
  AUTHENTICATION_SUCCESS: 'AUTHENTICATION_SUCCESS',
  AUTHENTICATION_FAIL: 'AUTHENTICATION_FAIL',
  AUTHENTICATION_TEST_REQUEST: 'AUTHENTICATION_TEST_REQUEST',
};

export interface State {
  userId: string;
  token: string;
  isLogged: boolean;
};

const initialState: State = {
  userId: null,
  token: null,
  isLogged: false,
};

export function reducer(state = initialState, action): State {
  switch (action.type) {
    case ActionTypes.AUTHENTICATION_SUCCESS: {
      const payload = action.payload;

      return {
        userId: '', // TODO
        token: payload,
        isLogged: true
      };
    }

    case ActionTypes.AUTHENTICATION_FAIL: {
      return {
        userId: null,
        token: null,
        isLogged: false
      };
    }

    default: {
      return state;
    }
  }
}
