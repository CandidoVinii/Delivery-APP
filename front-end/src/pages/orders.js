import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import OrderSellerCard from '../components/OrderSellerCard';
import OrderCustomerCard from '../components/OrderCustomerCard';
import { getLocalStorage } from '../helpers/localStorage';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [userToken, setUserToken] = useState({});
  const history = useHistory();

  useEffect(() => {
    const useStorage = getLocalStorage('user');
    setUserToken(useStorage);
    (async () => {
      if (!useStorage.token || useStorage.token === null) return history.push('/login');
      const config = { headers: { authorization: useStorage.token } };
      const { data } = await axios('http://localhost:3001/sales', config);
      setOrders(data);
    })();
  }, []);

  return (
    <>
      <Navbar />
      {userToken.role === 'seller' ? (
        <div className="Orders">
          <div>{userToken.role}</div>
          {orders.map((order, index) => (
            <Link key={ index } to={ `/seller/orders/${order.id}` }>
              <OrderSellerCard object={ { order, index } } />
            </Link>
          ))}
        </div>
      ) : (
        <div className="Orders">
          <div>{userToken.role}</div>
          {orders.map((order, index) => (
            <Link key={ index } to={ `/customer/orders/${order.id}` }>
              <OrderCustomerCard object={ { order, index } } />
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
