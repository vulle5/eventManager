import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  Typography,
  CircularProgress,
  Button,
  Menu,
  MenuItem
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import moment from 'moment';
import 'moment/locale/fi';
import { get } from 'lodash';

import eventServices from '../../services/events';
import EventItem from './EventItem';
import { useEventListStyles } from '../../styles/styles';
import { DatePicker } from '@material-ui/pickers';

function EventList({ token }) {
  const [events, setEvents] = useState(null);
  const [locationFilter, setLocationFilter] = useState('');
  const [dateFilter, setDateFilter] = useState(moment());
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useEventListStyles();

  useEffect(() => {
    if (token) {
      eventServices
        .getEvents(token)
        .then(events => setEvents(events))
        .catch(err => console.log(err));
    }
  }, [token]);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = value => {
    setAnchorEl(null);
    setLocationFilter(value);
  };

  if (!events) {
    return <CircularProgress />;
  }

  const locations = [...new Set(events.map(({ location }) => location.name))];
  const eventsToShow = events
    .filter(({ location }) => location.name.includes(locationFilter))
    .filter(({ startDate }) =>
      moment(startDate).isAfter(dateFilter.startOf('day'))
    );

  return (
    <div>
      <Typography variant="h2" className={classes.title}>
        Tapahtumat
      </Typography>
      <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center' }}>
        <Typography style={{ marginRight: 16 }}>Valitse sijainti:</Typography>
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          variant="outlined"
          style={{ marginRight: 16 }}
          onClick={handleClick}
        >
          {locationFilter.length === 0 ? 'Näytä Kaikki' : locationFilter}
          <ArrowDropDownIcon style={{ marginLeft: '16px' }} />
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          <MenuItem onClick={() => handleClose('')}>Näytä kaikki</MenuItem>
          {locations.map((location, i) => (
            <MenuItem key={i} onClick={() => handleClose(location)}>
              {location}
            </MenuItem>
          ))}
        </Menu>
        <Typography style={{ marginRight: 16 }}>Valitse Päivämäärä:</Typography>
        <DatePicker
          label=""
          value={dateFilter}
          onChange={setDateFilter}
          format="DD/MM/YYYY"
        />
      </div>
      <div className={classes.eventWrapper}>
        {eventsToShow.map(event => (
          <EventItem
            key={event.id}
            id={event.id}
            name={event.name}
            description={event.description}
            organizer={event.organizer}
            startDate={moment(event.startDate)
              .locale('fi')
              .format('DD.MMM YYYY, HH:mm')}
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
