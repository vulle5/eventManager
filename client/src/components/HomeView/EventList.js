import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Typography, CircularProgress } from "@material-ui/core";
import moment from "moment";
import "moment/locale/fi";
import { get } from "lodash";

import eventServices from "../../services/events";
import EventItem from "./EventItem";
import { useEventListStyles } from "../../styles/styles";
import FilterBar from "./FilterBar";

function EventList({ token }) {
  const [events, setEvents] = useState(null);
  const [locationFilter, setLocationFilter] = useState("");
  const [dateFilter, setDateFilter] = useState(moment());
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
    return (
      <div style={{ marginTop: 16, width: "100%", textAlign: "center" }}>
        <CircularProgress />
      </div>
    );
  }

  const locations = [...new Set(events.map(({ location }) => location.name))];
  const eventsToShow = events
    .filter(({ location }) => location.name.includes(locationFilter))
    .filter(({ startDate }) =>
      moment(startDate).isAfter(dateFilter.startOf("day"))
    );

  return (
    <div>
      <Typography variant="h2" className={classes.title}>
        Tapahtumat
      </Typography>
      <FilterBar
        locationFilter={locationFilter}
        setLocationFilter={setLocationFilter}
        setDateFilter={setDateFilter}
        dateFilter={dateFilter}
        locations={locations}
      />
      <div className={classes.eventWrapper}>
        {eventsToShow.map(event => (
          <EventItem
            key={event.id}
            id={event.id}
            name={event.name}
            description={event.description}
            organizer={event.organizer}
            startDate={moment(event.startDate)
              .locale("fi")
              .format("DD.MMM YYYY, HH:mm")}
          />
        ))}
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    token: get(state, "user.token", null)
  };
};

export default connect(mapStateToProps)(EventList);
