import axios from 'axios';
const baseUrl = 'http://localhost:3003/api/participations';

const createConfig = token => {
  return {
    headers: { Authorization: `bearer ${token}` }
  };
};

const createParticipation = async (token, participation) => {
  const config = createConfig(token);

  const response = await axios.post(baseUrl, participation, config);
  return response.data;
};

const updateParticipation = async (token, eventId, participationType) => {
  const config = createConfig(token);

  const response = await axios.put(
    `${baseUrl}/${eventId}`,
    participationType,
    config
  );
  return response.data;
};

export default { createParticipation, updateParticipation };
