import React from 'react';
import { Typography } from '@material-ui/core';

import EventItem from './EventItem';

function EventList() {
  return (
    <div>
      <Typography
        variant="h2"
        style={{ fontWeight: 'bold', margin: '16px 0px' }}
      >
        Events
      </Typography>
      <EventItem />
    </div>
  );
}

export default EventList;
