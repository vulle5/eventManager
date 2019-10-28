import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import LoginView from './LoginView';
import PrivateRoute from './PrivateRoute';
import Home from './Home';

function App() {
  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <Route path="/login" component={LoginView} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
