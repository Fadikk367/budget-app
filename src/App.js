import React from 'react';

import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Navigation, Wrapper, LoadingIndicator, Button } from 'components';
import Budget from './pages/BudgetPage';
import GlobalStyles from'./index.css.js';

import theme from 'utils/theme';

toast.configure();

const App = props => {
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
            <Route exact path="/">Homepage</Route>
            <Route path="/budget">
              <Budget />
            </Route>
          </Switch>
        </Wrapper>
      </Router>
    </>
  );
}

const RootApp = () => {
  return (
    <ThemeProvider theme={theme}>
      <React.Suspense fallback={<LoadingIndicator />}>
        <App />
      </React.Suspense>
    </ThemeProvider>
  )
}

export default RootApp;
