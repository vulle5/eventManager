import axios from 'axios';
const baseUrl = 'http://localhost:3003/auth/users';

const createUser = async credentials => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

export default { createUser };
