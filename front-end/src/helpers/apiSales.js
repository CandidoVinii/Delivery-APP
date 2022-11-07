import axios from 'axios';

const salesCreate = async (data, token) => {
  // let data = JSON.stringify({
  //   "userId": 3,
  //   "sellerId": 2,
  //   "totalPrice": 300,
  //   "deliveryAddress": "rua c",
  //   "deliveryNumber": 200,
  //   "saleDate": "11-06-2022",
  //   "status": "pending"
  // });
  
  let config = {
    method: 'post',
    url: 'http://localhost:3001/sales',
    headers: { 
      'Authorization': token, 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  return axios(config)
  .then((response) => {
    return response.data;
  })
  .catch((error) => {
    console.log(error);
  });
}

export default salesCreate;