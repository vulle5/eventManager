import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { TextField, Typography, Button } from '@material-ui/core';

import { authUser } from '../../reducers/loginReducer';
import userServices from '../../services/user';

function CreateUserForm({ authUser }) {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleSubmit = event => {
    event.preventDefault();

    userServices
      .createUser({ username, password, name })
      .then(() => authUser(username, password))
      .then(() => history.replace('/'))
      .catch(error => console.log(error));
  };

  const validateFields = () => {
    if (username.length < 3 || password.length < 6 || !name.length) {
      return true;
    }
    return false;
  };

  return (
    <>
      <Typography style={{ margin: '8px 0px' }} variant="h5">
        Uusi Käyttäjä
      </Typography>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          autoFocus
          error={!name.length ? true : false}
          id="name-create"
          label="Nimi"
          value={name}
          onChange={({ target }) => setName(target.value)}
          margin="normal"
          variant="outlined"
          helperText={!name.length ? 'Anna nimi' : ''}
        />
        <TextField
          error={username.length < 3 ? true : false}
          id="username-create"
          label="Tunnus"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
          margin="normal"
          variant="outlined"
          helperText={username.length < 3 ? 'Kolme kirjainta tai enemmän' : ''}
        />
        <TextField
          error={password.length < 6 ? true : false}
          id="password-create"
          label="Salasana"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          type="password"
          autoComplete="current-password"
          margin="normal"
          variant="outlined"
          helperText={password.length < 6 ? 'Kuusi kirjainta tai enemmän' : ''}
        />
        <Button
          disabled={validateFields()}
          variant="contained"
          color="secondary"
          type="submit"
          style={{ margin: '8px 0px' }}
        >
          Tee uusi käyttäjä
        </Button>
      </form>
    </>
  );
}

export default connect(
  null,
  { authUser }
)(CreateUserForm);
