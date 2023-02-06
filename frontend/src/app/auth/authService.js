import axios from 'axios';

const api = 'http://localhost:5000/api/users/';

const register = async (note) => {
  const response = await axios.post(api, note);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};
const login = async (note) => {
  const response = await axios.post(api + 'login', note);

  console.log(response);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

function logout() {
  return localStorage.removeItem('user');
}

const authService = {
  register,
  login,
  logout,
};

export default authService;
