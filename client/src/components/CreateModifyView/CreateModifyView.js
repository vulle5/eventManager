import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  TextField,
  Typography,
  Button,
  Paper,
  MenuItem,
  TextareaAutosize,
  CircularProgress
} from '@material-ui/core';
import moment from 'moment';
import { DateTimePicker } from '@material-ui/pickers';
import { get } from 'lodash';
import qs from 'qs';

import locationServices from '../../services/locations';
import eventServices from '../../services/events';
import CreateLocationDialog from './CreateLocationDialog';

function CreateModifyView({ token, location: { search } }) {
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState(moment().add(1, 'hour'));
  const [endDate, setEndDate] = useState(moment().add(2, 'hours'));
  const [locationId, setLocationId] = useState('');
  const [description, setDescription] = useState('');
  const [locations, setLocations] = useState(null);
  const [eventId, setEventId] = useState(null);
  const [open, setOpen] = useState(false);
  const history = useHistory();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = value => {
    setOpen(false);
    setLocationId(value);
  };

  useEffect(() => {
    if (token) {
      locationServices
        .getLocations(token)
        .then(locations => setLocations(locations))
        .catch(err => console.log(err));
    }
  }, [token, locationId]);

  useEffect(() => {
    if (search.length) {
      const {
        name,
        startDate,
        endDate,
        description,
        locationId,
        eventId
      } = qs.parse(search.substring(1));
      setName(name);
      setLocationId(locationId);
      setStartDate(moment(startDate));
      setEndDate(moment(endDate));
      setDescription(description);
      setEventId(eventId);
    }
  }, [search]);

  const handleSubmit = event => {
    event.preventDefault();

    if (search) {
      console.log('hello');
      console.log(eventId);
      eventServices
        .updateEvent(token, eventId, {
          name,
          startDate,
          endDate,
          description,
          locationId
        })
        .then(_ => history.replace('/'))
        .catch(err => console.log(err));
    } else {
      eventServices
        .createEvent(token, {
          name,
          startDate,
          endDate,
          description,
          locationId
        })
        .then(_ => history.replace('/'))
        .catch(err => console.log(err));
    }
  };

  const validateFields = () => {
    if (!name.length || !locationId.length) {
      return true;
    }
    if (
      moment(startDate).isAfter(endDate) ||
      moment(startDate).isBefore(moment().add(1, 'minute'))
    ) {
      return true;
    }
    return false;
  };

  return (
    <div
      style={{
        textAlign: 'center',
        paddingTop: '32px'
      }}
    >
      <Paper
        style={{
          maxWidth: 500,
          padding: '8px 16px',
          margin: 'auto'
        }}
      >
        <Typography style={{ margin: '8px 0px' }} variant="h5">
          {search ? 'Muokkaa tapahtumaa' : 'Lisää uusi tapahtuma'}
        </Typography>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            autoFocus
            error={!name.length ? true : false}
            helperText={!name.length ? 'Anna tapahtuman nimi' : ''}
            id="eventName"
            label="Tapahtuman nimi"
            value={name}
            onChange={({ target }) => setName(target.value)}
            margin="normal"
            variant="outlined"
            fullWidth
          />
          <TextField
            error={!locationId.length ? true : false}
            helperText={!locationId.length ? 'Anna tapahtuman sijainti' : ''}
            id="eventName"
            label="Tapahtuman sijainti"
            select
            value={locationId}
            onChange={({ target }) => setLocationId(target.value)}
            margin="normal"
            variant="outlined"
            fullWidth
          >
            {locations ? (
              locations.map(location => (
                <MenuItem key={location.id} value={location.id}>
                  {`${location.address}, ${location.areaCode} ${location.city}`}
                </MenuItem>
              ))
            ) : (
              <MenuItem>
                <CircularProgress />
              </MenuItem>
            )}
          </TextField>
          <Button color="primary" onClick={handleClickOpen}>
            Luo Sijainti
          </Button>
          <CreateLocationDialog
            open={open}
            onClose={handleClose}
            token={token}
          />
          <DateTimePicker
            style={{ marginTop: 16, marginBottom: 8 }}
            id="startDate"
            label="Aloitus päivämäärä"
            ampm={false}
            disablePast
            inputVariant="outlined"
            cancelLabel="Peruuta"
            minDateMessage="Päivämäärä ei saa olla menneisyydessä"
            strictCompareDates
            value={startDate}
            onChange={date => setStartDate(date)}
            fullWidth
          />
          <DateTimePicker
            style={{ marginTop: 16, marginBottom: 8 }}
            id="endDate"
            label="Loppu päivämäärä"
            disablePast
            minDate={startDate}
            ampm={false}
            inputVariant="outlined"
            cancelLabel="Peruuta"
            minDateMessage="Päivämäärä ei saa olla ennen aloitus päivämäärää"
            strictCompareDates
            value={endDate}
            onChange={date => setEndDate(date)}
            fullWidth
          />
          <TextareaAutosize
            style={{
              resize: 'vertical',
              width: '100%',
              marginTop: 16,
              marginBottom: 8,
              borderRadius: 4,
              fontFamily: 'inherit',
              fontSize: 'inherit'
            }}
            rows="4"
            placeholder="Tapahtuman kuvaus"
            id="description"
            label="Tapahtuman kuvaus"
            value={description}
            onChange={({ target }) => setDescription(target.value)}
            margin="normal"
            variant="outlined"
          />
          <Button
            variant="contained"
            disabled={validateFields()}
            color="secondary"
            fullWidth
            type="submit"
            style={{ margin: '8px 0px' }}
          >
            {search ? 'Muokkaa tapahtumaa' : 'Luo Tapahtuma'}
          </Button>
        </form>
      </Paper>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    token: get(state, 'user.token', null)
  };
};

export default connect(mapStateToProps)(CreateModifyView);
