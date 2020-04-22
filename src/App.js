import React, { useEffect } from 'react';

import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';

import { Navigation, Wrapper, LoadingIndicator, Button } from 'components';
import GlobalStyles from'./index.css.js';

import { fetchBudget, fetchBudgetCategories } from 'data/actions/budgetActions';

import theme from 'utils/theme';


const App = ({ budget, fetchBudget, fetchBudgetCategories }) => {
  useEffect(() => {
    fetchBudget(1);
    fetchBudgetCategories(1)
    return () => {
      console.log("test");
    }
  }, [fetchBudget, fetchBudgetCategories]);
  const { i18n } = useTranslation();
  return (
    <>
      <GlobalStyles />  
      <Router>
        <Navigation 
          items={[
            { content: 'Homepage', to: '/'},
            { content: 'Budget', to: '/budget'}
          ]}
          RightElement={(
            <div>
              <Button variant='regular' onClick={() => i18n.changeLanguage('pl')}>pl</Button>
              <Button variant='regular' onClick={() => i18n.changeLanguage('en')}>en</Button>
            </div>
          )}
        />
        <Wrapper>
          <Switch>
            <Route path="/" exact>Homepage</Route>
            <Route path="/budget" exact>Budget page</Route>
          </Switch>
        </Wrapper>
      </Router>
    </>
  );
}

const ConnectedApp = connect(state => {
  return {
    budget: state.budget.budget
  }
}, {
  fetchBudgetCategories,
  fetchBudget
})(App);

const RootApp = () => {
  return (
    <ThemeProvider theme={theme}>
      <React.Suspense fallback={<LoadingIndicator />}>
        <ConnectedApp />
      </React.Suspense>
    </ThemeProvider>
  )
}

export default RootApp;
