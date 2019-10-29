import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import LoginView from './LoginView';
import PrivateRoute from './PrivateRoute';
import Home from './Home';
import HeaderBar from './HeaderBar';
import EventView from './EventView';

function App() {
  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <HeaderBar />
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute path="/event/:id" component={EventView} />
          <Route path="/login" component={LoginView} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
