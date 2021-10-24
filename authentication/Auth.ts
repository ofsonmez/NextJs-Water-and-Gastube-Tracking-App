import axios from 'axios';

const API_URL = 'http://127.0.0.1:3000';

const login = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/auth/login`, {
    email,
    password,
  });
  if (response.data) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', JSON.stringify(response.data.access_token));
    }
    return true;
  }
  return false;
};

const register = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/auth/register`, {
    email,
    password,
  });
  if (response.data) {
    return true;
  }
  return false;
};

function authHeader() {
  const localToken =
    typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const token = localToken !== null ? JSON.parse(localToken) : '';

  if (token && token.token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token.token}`;
    return token;
  }
  return {};
}

export default {
  login,
  register,
  authHeader,
};
