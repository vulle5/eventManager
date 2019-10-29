import axios from 'axios';
const baseUrl = 'http://localhost:3003/api/events';

const createConfig = token => {
  return {
    headers: { Authorization: `bearer ${token}` }
  };
};

const getEvents = async token => {
  const config = createConfig(token);

  const response = await axios.get(baseUrl, config);
  return response.data;
};

const getEventWithId = async (token, eventId) => {
  const config = createConfig(token);

  const response = await axios.get(`${baseUrl}/${eventId}`, config);
  return response.data;
};

export default { getEvents, getEventWithId };
