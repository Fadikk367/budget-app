import {
  LOADING_STATES,
  BUDGET_GET,
  BUDGET_GET_REQUEST,
  BUDGET_GET_SUCCES,
  BUDGET_GET_FAILFURE
} from 'data/constants';

const initialState = {
  loadingState: {},
  budget: {},
  budgetCategories: [],
}

const budgetReducer = (state = initialState, action) => {
  const loadingStateCpy = {...state.loadingState};
  switch(action.type) {
    case BUDGET_GET_REQUEST:
      return {
        ...state,
        loadingState: {
          ...state.loadingState,
          [action.type]: LOADING_STATES.LOADING
        }
      }
    case BUDGET_GET_SUCCES:
      delete loadingStateCpy.BUDGET_GET_REQUEST;
      return {
        ...state,
        budget: action.payload,
        loadingState: loadingStateCpy
      };
    case BUDGET_GET_FAILFURE:
      delete loadingStateCpy.BUDGET_GET_REQUEST;
      return {
        ...state,
        budget: {},
        loadingState: loadingStateCpy
      }
    default:
      return state;
  }
}

export default budgetReducer;