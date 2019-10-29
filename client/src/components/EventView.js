import React from 'react';
import {
  Paper,
  Typography,
  Avatar,
  ListItem,
  ListItemText,
  ListItemAvatar
} from '@material-ui/core';

import placeholder from '../assets/placeholder.jpg';

function EventView({ match: { params } }) {
  console.log(params.id);
  return (
    <div style={{ paddingTop: 16 }}>
      <Paper style={{ maxWidth: 1000, margin: 'auto', padding: 16 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Typography variant="h3" style={{ padding: 8 }}>
            Maken Bändi
          </Typography>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center'
            }}
          >
            <Typography>2019-29-10, klo 18:00</Typography>
            <Typography style={{ margin: 8 }}> – </Typography>
            <Typography>2019-29-10, klo 22:00</Typography>
          </div>
        </div>
        <img
          src={placeholder}
          alt="Event location"
          style={{ width: '100%', marginTop: 16, marginBottom: 32 }}
        />
        <ListItem style={{ maxWidth: 200, marginBottom: 32 }} disableGutters>
          <ListItemAvatar>
            <Avatar>A</Avatar>
          </ListItemAvatar>
          <ListItemText primary="Severi Tikkanen" />
        </ListItem>
        <div style={{ display: 'flex', alignItems: 'baseline' }}>
          <Typography
            variant="h5"
            style={{ marginBottom: 32, marginRight: 16 }}
          >
            Tapahtuma paikka:
          </Typography>
          <Typography variant="subtitle1">
            Urho kekkosen katu 3 A, 00100 Helsinki
          </Typography>
        </div>
        <Typography variant="h5" style={{ marginBottom: 16 }}>
          Tapahtuman kuvaus
        </Typography>
        <Typography variant="subtitle1">Tapahtuman kuvaus</Typography>
      </Paper>
    </div>
  );
}

export default EventView;
