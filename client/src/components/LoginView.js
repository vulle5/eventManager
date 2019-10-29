import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Paper, Typography } from '@material-ui/core';

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
        textAlign: 'center',
        paddingTop: '32px'
      }}
    >
      <Typography variant="h3" style={{ marginTop: 32, marginBottom: 48 }}>
        Event Manager
      </Typography>
      <Paper
        style={{
          maxWidth: 300,
          padding: '8px 16px',
          margin: 'auto'
        }}
      >
        {!showCreateUser && <LoginForm showCreateForm={setShowCreateUser} />}
        {showCreateUser && <CreateUserForm />}
      </Paper>
    </div>
  );
}

export default LoginView;
