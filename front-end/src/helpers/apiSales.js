import axios from 'axios';

const salesCreate = async (data, token) => {
  const config = {
    method: 'post',
    url: 'http://localhost:3001/sales',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
    data,
  };

  return axios(config)
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

const salesProducts = async (data, token) => {
  const config = {
    method: 'post',
    url: 'http://localhost:3001/sales-products',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
    data,
  };

  return axios(config)
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

const getSalesById = async (id, token) => {
  // const { id } = data;
  const config = {
    method: 'get',
    url: `http://localhost:3001/sales/${id}`,
    headers: {
      Authorization: token,
      'Content-type': 'apllication/json',
    },
  };

  return axios(config)
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

const getSalesDetails = async (id, token) => {
  // const { id } = data;
  const config = {
    method: 'get',
    url: `http://localhost:3001/sales/details/${id}`,
    headers: {
      Authorization: token,
      'Content-type': 'apllication/json',
    },
  };

  return axios(config)
    .then((response) => response.data)
    .catch((error) => console.log(error));
};
const updateSalesStatus = async (id, status, token) => {
  axios.patch(`http://localhost:3001/sales/${id}`, { status }, { headers: { Authorization: token } })
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

export { salesCreate, salesProducts, getSalesById, getSalesDetails, updateSalesStatus };
