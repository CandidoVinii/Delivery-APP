import React, { useEffect, useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Context from '../context/Context';
import OrderCard from '../components/OrderCard';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const history = useHistory();
  const { token } = useContext(Context);

  useEffect(() => {
    (async () => {
      if (!token || token === null) return history.push('/login');
      const config = { headers: { authorization: token.token } };
      const { data } = await axios('http://localhost:3001/sales', config);
      setOrders(data);
    })();
  }, []);

  return (
    <>
      <Navbar />
      <div className="Orders">
        {orders.map((order, index) => (
          <Link key={ index } to={ `/seller/orders/${order.id}` }>
            <OrderCard
              object={ { order, index } }
            />
          </Link>))}
      </div>
    </>
  );
}
