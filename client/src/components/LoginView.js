import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { TextField, Paper, Typography, Button } from '@material-ui/core';

import { authUser } from '../reducers/loginReducer';

function LoginView({ authUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      history.replace('/');
    }
  }, [history]);

  const handleLogin = event => {
    event.preventDefault();

    authUser(username, password)
      .then(() => history.replace('/'))
      .catch(error => {
        if (error.response.status === 401) {
          setErrorMessage('Virheellinen tunnus tai salasana');
          setHasError(true);
        } else {
          setErrorMessage('Tuntematon virhe');
          setHasError(true);
        }
      });
  };

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
        <Typography style={{ margin: '8px 0px' }} variant="h5">
          Kirjaudu sisään
        </Typography>
        {hasError && <Typography color="error">{errorMessage}</Typography>}
        <form noValidate autoComplete="off" onSubmit={handleLogin}>
          <TextField
            id="username"
            label="Tunnus"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="password"
            label="Salasana"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            type="password"
            autoComplete="current-password"
            margin="normal"
            variant="outlined"
          />
          <Button
            variant="contained"
            color="secondary"
            type="submit"
            style={{ margin: '8px 0px' }}
          >
            Kirjaudu Sisään
          </Button>
        </form>
        <Typography variant="subtitle2" style={{ margin: '8px 0px' }}>
          Tai
        </Typography>
        <Button color="primary">Tee uusi käyttäjä</Button>
      </Paper>
    </div>
  );
}

export default connect(
  null,
  { authUser }
)(LoginView);
