import axios from 'axios';

const loginUser = async (email, password) => {
  const data = {
    email,
    password,
  };

  const config = {
    method: 'post',
    url: 'http://localhost:3001/login',
    data,
  };

  return axios(config)
    .then((response) => response.data)
    .catch((error) => error.response.status);
};

const createUser = async (name, email, password) => {
  const data = {
    name,
    email,
    password,
  };

  const config = {
    method: 'post',
    url: 'http://localhost:3001/user',
    data,
  };

  return axios(config)
    .then((response) => response.data)
    .catch((error) => error.response.status);
};

const createUserAdmin = async (data, token) => {
  const config = {
    method: 'post',
    url: 'http://localhost:3001/user/admin',
    headers: {
      Authorization: token,
    },
    data,
  };

  return axios(config)
    .then((response) => response.data)
    .catch((error) => error.response.status);
};

const getAllUsers = async (token) => {
  const config = {
    method: 'get',
    url: 'http://localhost:3001/user',
    headers: {
      Authorization: token,
    },
  };

  return axios(config)
    .then((response) => response.data)
    .catch((error) => error.response.status);
};

// requisição para apagar que recebe id e token
const deleteUser = async (id, token) => {
  const config = {
    method: 'delete',
    url: `http://localhost:3001/user/admin/${id}`,
    headers: {
      Authorization: token,
    },
  };

  return axios(config)
    .then((response) => response.data)
    .catch((error) => error.response.status);
};

export {
  loginUser,
  createUser,
  createUserAdmin,
  getAllUsers,
  deleteUser,
};
