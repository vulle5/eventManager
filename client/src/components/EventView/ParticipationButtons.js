import React from 'react';
import { Button, ButtonGroup, Typography } from '@material-ui/core';

function ParticipationButtons({ event, onPartaking }) {
  return (
    <>
      <Typography variant="h5" style={{ marginBottom: 16 }}>
        Haluan Osallistua...
      </Typography>
      <ButtonGroup
        color="primary"
        variant="contained"
        aria-label="Participation buttons"
        fullWidth
      >
        <Button onClick={() => onPartaking('yes')}>{`Kyllä (${
          event.participants.filter(participant => participant.type === 'yes')
            .length
        })`}</Button>
        <Button onClick={() => onPartaking('no')}>{`Ei (${
          event.participants.filter(participant => participant.type === 'no')
            .length
        })`}</Button>
        <Button onClick={() => onPartaking('maybe')}>{`Ehkä (${
          event.participants.filter(participant => participant.type === 'maybe')
            .length
        })`}</Button>
      </ButtonGroup>
    </>
  );
}

export default ParticipationButtons;
