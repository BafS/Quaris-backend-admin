import { Badge } from '../models/badge';

export const ActionTypes = {
  BADGES_REQUEST: 'BADGES_REQUEST',
  BADGES_SUCCESS: 'BADGES_SUCCESS',
  BADGES_FAIL: 'BADGES_FAIL',
  BADGES_ADD_REQUEST: 'BADGES_ADD_REQUEST',
  BADGES_ADD_SUCCESS: 'BADGES_ADD_SUCCESS',
  BADGES_ADD_FAIL: 'BADGES_ADD_FAIL',
};

export interface State {
  entities: Badge[];
};

const initialState: State = {
  entities: [],
};

export function reducer(state = initialState, action): State {
  switch (action.type) {
    case ActionTypes.BADGES_SUCCESS: {
      return Object.assign({}, state, {
        entities: action.payload,
      });
    }

    case ActionTypes.BADGES_ADD_SUCCESS: {
      return {
        entities: [...state.entities, action.payload]
      };
    }

    default: {
      return state;
    }
  }
}
