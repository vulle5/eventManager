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

const deleteEventWithId = async (token, eventId) => {
  const config = createConfig(token);

  const response = await axios.delete(`${baseUrl}/${eventId}`, config);
  return response.data;
};

const createEvent = async (token, event) => {
  const config = createConfig(token);

  const response = await axios.post(baseUrl, event, config);
  return response.data;
};

const updateEvent = async (token, eventId, event) => {
  const config = createConfig(token);

  const response = await axios.put(`${baseUrl}/${eventId}`, event, config);
  return response.data;
};

export default {
  getEvents,
  getEventWithId,
  deleteEventWithId,
  createEvent,
  updateEvent
};
