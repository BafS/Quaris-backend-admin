import { Rule } from '../models/rule';

export const ActionTypes = {
  RULES_REQUESTS: 'RULES_REQUEST',
  RULES_SUCCESS: 'RULES_SUCCESS',
  RULES_FAIL: 'RULES_FAIL',
  RULE_SELECTED: 'RULE_SELECTED',

  RULE_UPDATE_REQUEST: 'RULE_UPDATE_REQUEST',
  RULE_UPDATE_SUCCESS: 'RULE_UPDATE_SUCCESS',
  RULE_UPDATE_FAIL: 'RULE_UPDATE_FAIL',

  RULE_DELETE_REQUEST: 'RULE_DELETE_REQUEST',
  RULE_DELETE_SUCCESS: 'RULE_DELETE_SUCCESS',
  RULE_DELETE_FAIL: 'RULE_DELETE_FAIL',
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

    case ActionTypes.RULE_UPDATE_SUCCESS: {
      const rule: Rule = action.payload;
      let entitiesCopy = state.entities.map(r => {
        if (r.id === rule.id) {
          return rule;
        }
        return r;
      });

      // console.log(entitiesCopy);

      return Object.assign({}, state, {
        entities: entitiesCopy,
        selected: state.selected,
      });
    }

    case ActionTypes.RULE_DELETE_SUCCESS: {
      const id = action.payload;

      let entitiesCopy = state.entities.filter(r => r.id !== id);

      return Object.assign({}, state, {
        entities: entitiesCopy,
        selected: state.selected,
      });
    }

    default: {
      return state;
    }
  }
}

export const getEntities = (state: State) => state.entities;
