import React from 'react';
import { AppBar, Typography, Toolbar, Button } from '@material-ui/core';
import { useHeaderBarStyles } from '../styles/styles';

function HeaderBar() {
  const classes = useHeaderBarStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Event Manager
          </Typography>
          <Button color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default HeaderBar;
