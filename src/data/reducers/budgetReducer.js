import {
  LOADING_STATES,

  BUDGET_GET_REQUEST,
  BUDGET_GET_SUCCESS,
  BUDGET_GET_FAILURE,
  
  BUDGET_CATEGORIES_GET_REQUEST,
  BUDGET_CATEGORIES_GET_SUCCESS,
  BUDGET_CATEGORIES_GET_FAILURE,

  BUDGET_TRANSACTION_ADD_REQUEST,
  BUDGET_TRANSACTION_ADD_SUCCESS,

  SET_SELECTED_PARENT_CATEGORY_ID
} from 'data/constants';

const initialState = {
  loadingState: null,
  budget: {},
  budgetCategories: [],
  selectedParentCategoryId: undefined
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
    case BUDGET_GET_SUCCESS:
      delete loadingStateCpy.BUDGET_GET_REQUEST;
      return {
        ...state,
        budget: action.payload,
        loadingState: loadingStateCpy
      };
    case BUDGET_GET_FAILURE:
      delete loadingStateCpy.BUDGET_GET_REQUEST;
      return {
        ...state,
        budget: {},
        loadingState: loadingStateCpy
      }
    case BUDGET_CATEGORIES_GET_REQUEST:
      return {
        ...state,
        loadingState: {
          ...state.loadingState,
          [action.type]: LOADING_STATES.LOADING
        }
      };
    case BUDGET_CATEGORIES_GET_SUCCESS:
      delete loadingStateCpy.BUDGET_CATEGORIES_GET_REQUEST;
      return {
        ...state,
        budgetCategories: action.payload,
        loadingState: loadingStateCpy
      };
    case BUDGET_CATEGORIES_GET_FAILURE:
      delete loadingStateCpy.BUDGET_CATEGORIES_GET_REQUEST;
      return {
        ...state,
        budgetCategories: {},
        loadingState: loadingStateCpy
      };
    case SET_SELECTED_PARENT_CATEGORY_ID:
      return {
        ...state,
        selectedParentCategoryId: action.payload
      };
    case BUDGET_TRANSACTION_ADD_REQUEST:
      return {
        ...state,
        loadingState: {
          ...state.loadingState,
          [action.type]: LOADING_STATES.LOADING
        }
      }
    case BUDGET_TRANSACTION_ADD_SUCCESS:
      delete loadingStateCpy.BUDGET_TRANSACTION_ADD_REQUEST;
      return {
        ...state,
        budget: {
          ...state.budget,
          transactions: [
            action.payload,
            ...state.budget.transactions,
          ]
        },
        loadingState: loadingStateCpy
      };
    default:
      return state;
  }
}

export default budgetReducer;