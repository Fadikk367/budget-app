import React, { useEffect, useMemo, Fragment } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, useHistory } from 'react-router-dom';

import { Grid } from './BudgetPage.css';
import BudgetCategoryList from './components/BudgetCategoryList'
import BudgetTransactionList from 'pages/BudgetPage/components/BudgetTransactionList';
import AddTransactionForm from 'pages/BudgetPage/components/AddTransactionForm';

import { fetchBudget, fetchBudgetCategories, addTransaction } from 'data/actions/budgetActions';
import { fetchAllCategories } from 'data/actions/commonActions';
import { LoadingIndicator, Modal, Button } from 'components';

const BudgetPage = ({ 
  commonState, budgetState, allCategories, budget,
  fetchBudget, fetchBudgetCategories, fetchAllCategories, addTransaction
}) => {
  const history = useHistory();
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

  const handleAddTransaction = (values) => {
    addTransaction({
      budgetId: budget.id,
      transactionData: values
    }).then(() => {
      history.goBack();
    })
  }

  return (
    <Fragment>
      <Grid>
        <section>
          {isLoaded ? <BudgetCategoryList /> : (
            <LoadingIndicator />
          )}
        </section>
        <section>
          {isLoaded ? (
            <Fragment>
              <Button to="/budget/transactions/new">Add transaction</Button>
              <BudgetTransactionList />
            </Fragment>
          ) : (
            <LoadingIndicator />
          )}
        </section>
      </Grid>

      <Switch>
        <Route exact path="/budget/transactions/new">
          <Modal>
            <AddTransactionForm 
              onSubmit={handleAddTransaction}
              categories={allCategories}
              groupCategoriesBy="parentCategory.name"
            />
          </Modal>
        </Route>
      </Switch>
    </Fragment>
  )
}

export default connect(state => {
  return {
    budget: state.budget.budget,
    commonState: state.common.loadingState,
    budgetState: state.budget.loadingState,
    allCategories: state.common.allCategories
  }
}, {
  fetchAllCategories,
  fetchBudgetCategories,
  fetchBudget,
  addTransaction
})(BudgetPage);

