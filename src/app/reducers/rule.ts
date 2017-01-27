import { Rule } from '../models/rule';

export const ActionTypes = {
  RULES_REQUESTS: 'RULES_REQUEST',
  RULES_SUCCESS: 'RULES_SUCCESS',
  RULES_FAIL: 'RULES_FAIL',
  RULE_SELECTED: 'RULE_SELECTED',
};

export interface State {
  entities: Rule[];
  selected: string;
};

const initialState: State = {
  entities: [],
  selected: null,
};

export function reducer(state = initialState, action): State {
  switch (action.type) {
    case ActionTypes.RULES_SUCCESS: {
      return Object.assign({}, state, {
        entities: action.payload,
        selected: null,
      });
    }

    // case ActionTypes.RULES_ADD: {
    //   return Object.assign({}, state, {
    //     entities: action.payload
    //   });
    // }

    default: {
      return state;
    }
  }
}

export const getEntities = (state: State) => state.entities;
