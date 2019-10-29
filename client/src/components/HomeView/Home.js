import React from 'react';

import EventList from './EventList';
import FAB from '../FAB';

function Home() {
  return (
    <div style={{ margin: 16 }}>
      <EventList />
      <FAB title="Luo Tapahtuma" to={'/createEvent'} isLink />
    </div>
  );
}

export default Home;
