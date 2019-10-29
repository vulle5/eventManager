import React from 'react';
import {
  Typography,
  Card,
  CardActionArea,
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

function EventItem() {
  return (
    <Card style={{ maxWidth: 345 }}>
      <CardHeader
        avatar={<Avatar aria-label="Event host">A</Avatar>}
        title="Severi Tikkanen"
        subheader="Nov 14, 2019"
        action={
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        }
      />
      <CardActionArea>
        <CardMedia
          style={{ height: 140 }}
          image={placeholder}
          title="Placeholder"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Matin Bändi
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Matin bändi soittaa musiikkia Tavastialla Marraskuussa Rock
            musiikkia. Vain yli 18-vuotiaille
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Learn More
        </Button>
        <Button size="small" color="primary">
          Like This
        </Button>
      </CardActions>
    </Card>
  );
}

export default EventItem;
