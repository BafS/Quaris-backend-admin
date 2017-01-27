import { Scale } from '../models/scale';

export const ActionTypes = {
  SCALE_REQUEST: 'SCALE_REQUEST',
  SCALE_SUCCESS: 'SCALE_SUCCESS',
  SCALE_FAIL: 'SCALE_FAIL',
  SCALE_ADD_REQUEST: 'SCALE_ADD_REQUEST',
  SCALE_ADD_SUCCESS: 'SCALE_ADD_SUCCESS',
  SCALE_ADD_FAIL: 'SCALE_ADD_FAIL',
};

export interface State {
  entities: Scale[];
};

const initialState: State = {
  entities: [],
};

export function reducer(state = initialState, action): State {
  switch (action.type) {
    case ActionTypes.SCALE_SUCCESS: {
      return Object.assign({}, state, {
        entities: action.payload,
      });
    }

    default: {
      return state;
    }
  }
}
