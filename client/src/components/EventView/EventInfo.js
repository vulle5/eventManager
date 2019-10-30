import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Typography,
  Avatar,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Button
} from '@material-ui/core';
import moment from 'moment';
import 'moment/locale/fi';
import { get } from 'lodash';

import placeholder from '../../assets/placeholder.jpg';
import eventServices from '../../services/events';

function EventInfo({ event, token, username }) {
  const history = useHistory();

  const handleEventDelete = () => {
    eventServices
      .deleteEventWithId(token, event.id)
      .then(_ => history.replace('/'))
      .catch(err => console.log(err));
  };

  return (
    <>
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
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 32 }}>
        <ListItem style={{ maxWidth: 200 }} disableGutters>
          <ListItemAvatar>
            <Avatar>{event.organizer.name.substring(0, 1)}</Avatar>
          </ListItemAvatar>
          <ListItemText primary={event.organizer.name} />
        </ListItem>
        {event.organizer.username === username && (
          <Button
            variant="contained"
            color="secondary"
            onClick={handleEventDelete}
          >
            Poista Tapahtuma
          </Button>
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline' }}>
        <Typography variant="h5" style={{ marginBottom: 32, marginRight: 16 }}>
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
      <Typography variant="subtitle1" style={{ marginBottom: 32 }}>
        <a
          href={`http://${event.location.webUrl}`}
        >{`web: ${event.location.webUrl}`}</a>
      </Typography>
    </>
  );
}

const mapStateToProps = state => {
  return {
    token: get(state, 'user.token', null)
  };
};

export default connect(mapStateToProps)(EventInfo);
