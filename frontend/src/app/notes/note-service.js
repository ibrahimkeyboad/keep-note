import axios from 'axios';

const api = 'http://localhost:5000/api/notes';

const createNote = async (noteData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(api, noteData, config);

  console.log(response);

  return response.data;
};
const getNotes = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(api, config);

  return response.data;
};

const noteService = {
  createNote,
  getNotes,
};

export default noteService;
