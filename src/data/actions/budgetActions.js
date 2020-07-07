import {
  BUDGET_GET,
  BUDGET_CATEGORIES_GET,
  SET_SELECTED_PARENT_CATEGORY_ID,
  BUDGET_TRANSACTION_ADD
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

export const addTransaction = ({ budgetId, transactionData }) => {
  const promise = API.budget.addTransaction({
    budgetId,
    transactionData
  });

  return ({
    type: BUDGET_TRANSACTION_ADD,
    promise,
    successMessage: 'Transaction has been added!'
  });
}

export const selectParentCategory = id => {
  return {
    type: SET_SELECTED_PARENT_CATEGORY_ID,
    payload: id
  };
}