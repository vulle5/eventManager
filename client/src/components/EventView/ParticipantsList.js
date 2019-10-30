import React from 'react';
import {
  Avatar,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar
} from '@material-ui/core';

function ParticipantsList({ event }) {
  return (
    <>
      <Typography variant="h5" style={{ marginBottom: 16 }}>
        Osallistujat
      </Typography>
      <List style={{ display: 'flex', flexWrap: 'wrap', marginBottom: 32 }}>
        {event.participants
          .filter(({ type }) => type === 'yes')
          .map(({ participant }) => (
            <ListItem key={participant.id} style={{ maxWidth: 250 }}>
              <ListItemAvatar>
                <Avatar>{participant.name.substring(0, 1)}</Avatar>
              </ListItemAvatar>
              <ListItemText primary={participant.name} />
            </ListItem>
          ))}
      </List>
    </>
  );
}

export default ParticipantsList;
