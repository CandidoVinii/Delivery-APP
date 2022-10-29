import axios from 'axios';

const loginUser = async (email, password) => {
  const data = JSON.stringify({
    email,
    password,
  });

  const config = {
    method: 'post',
    url: 'http://localhost:3001/login',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  };

  return axios(config)
    .then((response) => response.data)
    .catch((error) => error.response);
};

const createUser = async (name, email, password) => {
  const data = JSON.stringify({
    name,
    email,
    password,
  });

  const config = {
    method: 'post',
    url: 'http://localhost:3001/user',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  };

  return axios(config)
    .then((response) => response)
    .catch((error) => error.response);
};

export { loginUser, createUser };
