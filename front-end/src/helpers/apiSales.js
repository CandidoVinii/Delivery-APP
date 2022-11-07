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

export default salesCreate;
