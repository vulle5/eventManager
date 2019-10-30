import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import CssBaseline from '@material-ui/core/CssBaseline';

import LoginView from './LoginView/LoginView';
import PrivateRoute from './PrivateRoute';
import Home from './HomeView/Home';
import HeaderBar from './HeaderBar';
import EventView from './EventView/EventView';
import CreateModifyView from './CreateModifyView/CreateModifyView';
import LocationsView from './LocationsView/LocationsView';

function App() {
  return (
    <>
      <CssBaseline />
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <BrowserRouter>
          <HeaderBar />
          <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <PrivateRoute path="/locations" component={LocationsView} />
            <PrivateRoute path="/event/:id" component={EventView} />
            <PrivateRoute path="/createEvent" component={CreateModifyView} />
            <PrivateRoute
              path="/modifyEvent/:id"
              component={CreateModifyView}
            />
            <Route path="/login" component={LoginView} />
          </Switch>
        </BrowserRouter>
      </MuiPickersUtilsProvider>
    </>
  );
}

export default App;
