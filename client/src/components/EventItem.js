import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  CardHeader,
  Avatar,
  IconButton
} from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';

import placeholder from '../assets/placeholder.jpg';
import { useEventItemStyles } from '../styles/styles';

function EventItem({
  id = '',
  name = 'Ei nimeä',
  description = 'Ei kuvausta',
  organizer = { name: 'Ei järjestäjää' },
  startDate = 'Ei päivämäärää'
}) {
  const classes = useEventItemStyles();
  const history = useHistory();

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="Event host">
            {organizer.name.substring(0, 1)}
          </Avatar>
        }
        title={organizer.name}
        subheader={startDate}
        action={
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        }
      />
      <CardMedia
        style={{ height: 140 }}
        image={placeholder}
        title="Placeholder"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {name}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={() => history.push(`/event/${id}`)}
        >
          Tarkemmat Tiedot
        </Button>
        <Button size="small" color="primary">
          Tykkää
        </Button>
      </CardActions>
    </Card>
  );
}

export default EventItem;
