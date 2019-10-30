import axios from 'axios';
const baseUrl = 'http://localhost:3003/api/locations';

const createConfig = token => {
  return {
    headers: { Authorization: `bearer ${token}` }
  };
};

const getLocations = async token => {
  const config = createConfig(token);

  const response = await axios.get(baseUrl, config);
  return response.data;
};

const createLocation = async (token, location) => {
  const config = createConfig(token);

  const response = await axios.post(baseUrl, location, config);
  return response.data;
};

const deleteLocation = async (token, locationId) => {
  const config = createConfig(token);

  const response = await axios.delete(`${baseUrl}/${locationId}`, config);
  return response.data;
};

export default { getLocations, createLocation, deleteLocation };
