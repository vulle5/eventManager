import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Typography, CircularProgress } from '@material-ui/core';
import moment from 'moment';
import 'moment/locale/fi';
import { get } from 'lodash';

import eventServices from '../services/events';
import EventItem from './EventItem';
import { useEventListStyles } from '../styles/styles';

function EventList({ token }) {
  const [events, setEvents] = useState(null);
  const classes = useEventListStyles();

  useEffect(() => {
    if (token) {
      eventServices
        .getEvents(token)
        .then(events => setEvents(events))
        .catch(err => console.log(err));
    }
  }, [token]);

  if (!events) {
    return <CircularProgress />;
  }

  return (
    <div>
      <Typography variant="h2" className={classes.title}>
        Events
      </Typography>
      <div className={classes.eventWrapper}>
        {events.map(event => (
          <EventItem
            key={event.id}
            id={event.id}
            name={event.name}
            description={event.description}
            organizer={event.organizer}
            startDate={moment(event.startDate)
              .locale('fi')
              .format('MMM DD YYYY, HH:mm')}
          />
        ))}
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    token: get(state, 'user.token', null)
  };
};

export default connect(mapStateToProps)(EventList);
