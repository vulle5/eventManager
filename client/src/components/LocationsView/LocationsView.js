import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Typography, Paper, Button } from '@material-ui/core';
import { get } from 'lodash';

import locationServices from '../../services/locations';

function LocationsView({ token }) {
  const [locations, setLocations] = useState([]);
  const [didDelete, setDidDelete] = useState(false);

  useEffect(() => {
    if (token) {
      locationServices
        .getLocations(token)
        .then(locations => setLocations(locations))
        .catch(err => console.log(err));
    }
  }, [token, didDelete]);

  const onLocationDelete = locationId => {
    locationServices
      .deleteLocation(token, locationId)
      .then(_ => setDidDelete(!didDelete))
      .catch(err => console.log(err));
  };

  return (
    <div style={{ margin: 16 }}>
      <Typography variant="h2" style={{ fontWeight: 'bold', marginBottom: 16 }}>
        Omat Sijainnit
      </Typography>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {locations.map(location => (
          <Paper
            key={location.id}
            style={{ margin: 8, padding: 8, maxWidth: 300 }}
          >
            <Typography variant="h6">{`${location.name}`}</Typography>
            <Typography>{`${location.address}, ${location.areaCode} ${location.city}`}</Typography>
            {location.events.length ? (
              <Typography color="error" style={{ marginTop: 8 }}>
                Sijaintia ei voi poistaa, koska sijainissa on tapahtumia
              </Typography>
            ) : (
              <Button
                color="secondary"
                onClick={() => onLocationDelete(location.id)}
              >
                Poista Sijainti
              </Button>
            )}
          </Paper>
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

export default connect(mapStateToProps)(LocationsView);
