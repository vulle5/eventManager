import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Paper, CircularProgress } from '@material-ui/core';
import { get } from 'lodash';

import eventServices from '../../services/events';
import participationServices from '../../services/participations';
import ParticipantsList from './ParticipantsList';
import ParticipationButtons from './ParticipationButtons';
import EventInfo from './EventInfo';
import FAB from '../FAB';

function EventView({ match: { params }, token, username }) {
  const [event, setEvent] = useState(null);
  const [didUpdate, setDidUpdate] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (token) {
      eventServices
        .getEventWithId(token, params.id)
        .then(event => setEvent(event))
        .catch(err => console.log(err));
    }
  }, [token, params.id, didUpdate]);

  const onPartaking = type => {
    const hasParticipation = event.participants.filter(
      ({ participant }) => participant.username === username
    );

    if (hasParticipation.length === 1) {
      participationServices
        .updateParticipation(token, hasParticipation[0].id, { type })
        .then(_ => setDidUpdate(!didUpdate))
        .catch(err => console.log(err));
    } else {
      participationServices
        .createParticipation(token, { type, eventId: event.id })
        .then(_ => setDidUpdate(!didUpdate))
        .catch(err => console.log(err));
    }
  };

  if (!event) {
    return <CircularProgress />;
  }

  return (
    <div style={{ padding: '16px 0px' }}>
      <Paper style={{ maxWidth: 1000, margin: 'auto', padding: 16 }}>
        <EventInfo event={event} />
        <ParticipantsList event={event} />
        <ParticipationButtons event={event} onPartaking={onPartaking} />
        {event.organizer.username === username && (
          <FAB
            title="Muokkaa"
            onClick={() =>
              history.push(
                `/modifyEvent/${event.id}?name=${event.name}&locationId=${event.location.id}` +
                  `&eventId=${event.id}&startDate=${event.startDate}&endDate=${event.endDate}&description=${event.description}`
              )
            }
          />
        )}
      </Paper>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    token: get(state, 'user.token', null),
    username: get(state, 'user.username', null)
  };
};

export default connect(mapStateToProps)(EventView);
