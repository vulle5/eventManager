import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

import { setUser } from '../reducers/loginReducer';

const PrivateRoute = ({
  setUser,
  isLoggedIn,
  component: Component,
  ...rest
}) => {
  useEffect(() => {
    setUser(isLoggedIn);
  }, [setUser, isLoggedIn]);

  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
      }
    />
  );
};

const checkUser = user => {
  if (!user) {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      return JSON.parse(loggedUserJSON);
    }
  }

  return user;
};

const mapStateToProps = state => {
  return {
    isLoggedIn: checkUser(state.user)
  };
};

export default connect(
  mapStateToProps,
  { setUser }
)(PrivateRoute);
