import axios from 'axios';
const baseUrl = 'http://localhost:3003/api/events';

const getEvents = async token => {
  const config = {
    headers: { Authorization: `bearer ${token}` }
  };

  const response = await axios.get(baseUrl, config);
  return response.data;
};

export default { getEvents };
