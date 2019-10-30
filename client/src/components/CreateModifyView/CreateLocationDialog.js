import React, { useState } from 'react';
import {
  TextField,
  Button,
  DialogContent,
  Dialog,
  DialogTitle,
  IconButton
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import locationServices from '../../services/locations';
import { useCreateLocationDialogStyles } from '../../styles/styles';

function CreateLocationDialog({ onClose, open, token }) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [areaCode, setAreaCode] = useState('');
  const [city, setCity] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [webUrl, setWebUrl] = useState('');
  const classes = useCreateLocationDialogStyles();

  const handleSubmit = () => {
    locationServices
      .createLocation(token, {
        name,
        address,
        areaCode,
        city,
        phoneNum,
        webUrl
      })
      .then(location => onClose(location.id))
      .catch(err => console.log(err));
  };

  const validateFields = () => {
    if (!address.length || !areaCode.length || !city.length) {
      return true;
    }
    return false;
  };

  return (
    <Dialog
      onClose={() => onClose('')}
      aria-labelledby="create.location-dialog"
      open={open}
    >
      <DialogTitle>
        Lisää uusi siajinti
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={() => onClose('')}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent style={{ padding: 16 }}>
        <TextField
          autoFocus
          id="locationName"
          label="Sijainnin nimi"
          value={name}
          onChange={({ target }) => setName(target.value)}
          margin="normal"
          variant="outlined"
          fullWidth
        />
        <TextField
          error={!address.length ? true : false}
          helperText={!address.length ? 'Anna sijainnin osoite' : ''}
          id="locationAddress"
          label="Osoite"
          value={address}
          onChange={({ target }) => setAddress(target.value)}
          margin="normal"
          variant="outlined"
          fullWidth
        />
        <TextField
          error={!areaCode.length ? true : false}
          helperText={!areaCode.length ? 'Anna sijainnin postinumero' : ''}
          id="locationPostalCode"
          label="Postinumero"
          value={areaCode}
          onChange={({ target }) => setAreaCode(target.value)}
          margin="normal"
          variant="outlined"
          fullWidth
        />
        <TextField
          error={!city.length ? true : false}
          helperText={!city.length ? 'Anna sijainnin kaupunki' : ''}
          id="locationCity"
          label="Kaupunki"
          value={city}
          onChange={({ target }) => setCity(target.value)}
          margin="normal"
          variant="outlined"
          fullWidth
        />
        <TextField
          id="locationPhoneNum"
          label="Puhelinnumero"
          value={phoneNum}
          onChange={({ target }) => setPhoneNum(target.value)}
          margin="normal"
          variant="outlined"
          fullWidth
        />
        <TextField
          id="locationWeb"
          label="Verkkosoite"
          value={webUrl}
          onChange={({ target }) => setWebUrl(target.value)}
          margin="normal"
          variant="outlined"
          fullWidth
        />
        <Button
          variant="contained"
          color="secondary"
          disabled={validateFields()}
          onClick={handleSubmit}
          fullWidth
          type="submit"
          style={{ margin: '8px 0px' }}
        >
          Luo Sijainti
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default CreateLocationDialog;
