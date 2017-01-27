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
      // const payload = action.payload;

      return {
        userId: 'test',
        token: '123123',
        isLogged: true
      };
    }

    default: {
      return state;
    }
  }
}
