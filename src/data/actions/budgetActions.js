import {
  BUDGET_GET,
  BUDGET_CATEGORIES_GET
} from 'data/constants';

import API from 'data/fetch';

export const fetchBudget = id => {
  const promise = API.budget.fetchBudget(id);

  return ({
    promise,
    type: BUDGET_GET
  });
}

export const fetchBudgetCategories = id => {

  const promise = API.budget.fetchBudgetCategories(id);

  return ({
    type: BUDGET_CATEGORIES_GET,
    promise
  });
}