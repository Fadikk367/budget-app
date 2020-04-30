import React, { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';

import { Grid } from './BudgetPage.css';
import BudgetCategoryList from './components/BudgetCategoryList'

import { fetchBudget, fetchBudgetCategories } from 'data/actions/budgetActions';
import { fetchAllCategories } from 'data/actions/commonActions';
import { LoadingIndicator } from 'components';

const BudgetPage = ({ 
  commonState, budgetState, 
  fetchBudget, fetchBudgetCategories, fetchAllCategories 
}) => {
  useEffect(() => {
    fetchAllCategories();
    fetchBudget(1);
    fetchBudgetCategories(1)
    return () => {
      console.log("test");
    }
  }, [fetchBudget, fetchBudgetCategories, fetchAllCategories]);

  const isLoaded = useMemo(
    () => (!!commonState && Object.keys(commonState).length === 0) 
      && (!!budgetState && Object.keys(budgetState).length === 0), 
    [commonState, budgetState]);

  return (
    <Grid>
      <section>
        {isLoaded ? <BudgetCategoryList /> : (
          <LoadingIndicator />
        )}
      </section>
      <section>
        {isLoaded ? 'Transactions List' : (
          <LoadingIndicator />
        )}
      </section>
    </Grid>
  )
}

export default connect(state => {
  return {
    budget: state.budget.budget,
    commonState: state.common.loadingState,
    budgetState: state.budget.loadingState
  }
}, {
  fetchAllCategories,
  fetchBudgetCategories,
  fetchBudget
})(BudgetPage);

