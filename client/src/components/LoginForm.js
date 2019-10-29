import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { TextField, Typography, Button } from '@material-ui/core';

import { authUser } from '../reducers/loginReducer';

function LoginForm({ authUser, showCreateForm }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();
  const location = useLocation();

  const handleLogin = event => {
    event.preventDefault();
    const { from } = location.state || { from: { pathname: '/' } };

    authUser(username, password)
      .then(() => history.replace(from))
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
    <>
      <Typography style={{ margin: '8px 0px' }} variant="h5">
        Kirjaudu sisään
      </Typography>
      {hasError && <Typography color="error">{errorMessage}</Typography>}
      <form noValidate autoComplete="off" onSubmit={handleLogin}>
        <TextField
          autoFocus
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
      <Button color="primary" onClick={() => showCreateForm(true)}>
        Tee uusi käyttäjä
      </Button>
    </>
  );
}

export default connect(
  null,
  { authUser }
)(LoginForm);
