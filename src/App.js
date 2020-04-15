import React from 'react';

import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Navigation } from 'components';
import GlobalStyles from'./index.css.js';

import theme from 'utils/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />  
      <Router>
        <Navigation items={[
          { content: 'Homepage', to: '/'},
          { content: 'Budget', to: '/budget'}
        ]}/>

        <Switch>
          <Route path="/" exact>Homepage</Route>
          <Route path="/budget" exact>Budget page</Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
