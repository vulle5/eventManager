import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Paper } from '@material-ui/core';

import LoginForm from './LoginForm';
import CreateUserForm from './CreateUserForm';

function LoginView() {
  const [showCreateUser, setShowCreateUser] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      history.replace('/');
    }
  }, [history]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '20%'
      }}
    >
      <Paper
        style={{
          maxWidth: 300,
          padding: '8px 16px',
          textAlign: 'center'
        }}
      >
        {!showCreateUser && <LoginForm showCreateForm={setShowCreateUser} />}
        {showCreateUser && <CreateUserForm />}
      </Paper>
    </div>
  );
}

export default LoginView;
