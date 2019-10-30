import React from 'react';
import { connect } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import {
  AppBar,
  Typography,
  Toolbar,
  Button,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar
} from '@material-ui/core';
import { get } from 'lodash';

import { useHeaderBarStyles } from '../styles/styles';

function HeaderBar({ usersName }) {
  const classes = useHeaderBarStyles();
  const { pathname } = useLocation();
  const history = useHistory();

  if (pathname === '/login') {
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem('loggedUser');
    history.replace('/login');
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Event Manager
          </Typography>
          <Button color="inherit" onClick={() => history.push('/locations')}>
            Omat Sijainnit
          </Button>
          <ListItem style={{ maxWidth: 225 }}>
            <ListItemAvatar>
              <Avatar>{usersName.substring(0, 1)}</Avatar>
            </ListItemAvatar>
            <ListItemText primary={usersName} />
          </ListItem>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    usersName: get(state, 'user.name', '')
  };
};

export default connect(mapStateToProps)(HeaderBar);
