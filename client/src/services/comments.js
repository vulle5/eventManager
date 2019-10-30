import axios from 'axios';
const baseUrl = 'http://localhost:3003/api/comments';

const createConfig = token => {
  return {
    headers: { Authorization: `bearer ${token}` }
  };
};

const getComments = async (token, eventId) => {
  const config = createConfig(token);

  const response = await axios.get(`${baseUrl}/${eventId}`, config);
  return response.data;
};

const createComment = async (token, comment) => {
  const config = createConfig(token);

  const response = await axios.post(baseUrl, comment, config);
  return response.data;
};

const deleteComment = async (token, commentId) => {
  const config = createConfig(token);

  const response = await axios.delete(`${baseUrl}/${commentId}`, config);
  return response.data;
};

export default { getComments, createComment, deleteComment };
