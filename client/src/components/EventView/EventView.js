import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Paper,
  Typography,
  Avatar,
  ListItem,
  ListItemText,
  ListItemAvatar,
  CircularProgress
} from '@material-ui/core';
import moment from 'moment';
import 'moment/locale/fi';
import { get } from 'lodash';

import eventServices from '../../services/events';
import placeholder from '../../assets/placeholder.jpg';

function EventView({ match: { params }, token }) {
  const [event, setEvent] = useState(null);

  useEffect(() => {
    if (token) {
      eventServices
        .getEventWithId(token, params.id)
        .then(event => setEvent(event))
        .catch(err => console.log(err));
    }
  }, [token, params.id]);

  if (!event) {
    return <CircularProgress />;
  }

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
            {event.name}
          </Typography>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center'
            }}
          >
            <Typography>
              {moment(event.startDate)
                .local('fi')
                .format('DD.MMM YYYY, HH:mm')}
            </Typography>
            <Typography style={{ margin: 8 }}> – </Typography>
            <Typography>
              {moment(event.endDate)
                .local('fi')
                .format('DD.MMM YYYY, HH:mm')}
            </Typography>
          </div>
        </div>
        <img
          src={placeholder}
          alt="Event location"
          style={{ width: '100%', marginTop: 16, marginBottom: 32 }}
        />
        <ListItem style={{ maxWidth: 200, marginBottom: 32 }} disableGutters>
          <ListItemAvatar>
            <Avatar>{event.organizer.name.substring(0, 1)}</Avatar>
          </ListItemAvatar>
          <ListItemText primary={event.organizer.name} />
        </ListItem>
        <div style={{ display: 'flex', alignItems: 'baseline' }}>
          <Typography
            variant="h5"
            style={{ marginBottom: 32, marginRight: 16 }}
          >
            Tapahtuma paikka:
          </Typography>
          <Typography variant="subtitle1">
            {`${event.location.name ? `${event.location.name}, ` : ''} ${
              event.location.address
            }, ${event.location.areaCode} ${event.location.city}`}
          </Typography>
        </div>
        <Typography variant="h5" style={{ marginBottom: 16 }}>
          Tapahtuman kuvaus
        </Typography>
        <Typography variant="subtitle1" style={{ marginBottom: 32 }}>
          {event.description}
        </Typography>
        <Typography variant="h5" style={{ marginBottom: 16 }}>
          Tiedot
        </Typography>
        <Typography variant="subtitle1">{`puh: ${event.location.phoneNum}`}</Typography>
        <Typography variant="subtitle1">
          <a
            href={`http://${event.location.webUrl}`}
          >{`web: ${event.location.webUrl}`}</a>
        </Typography>
      </Paper>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    token: get(state, 'user.token', null)
  };
};

export default connect(mapStateToProps)(EventView);
