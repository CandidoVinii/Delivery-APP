import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { getSalesById } from '../helpers/apiSales';
// import Context from '../context/Context';
import { getLocalStorage } from '../helpers/localStorage';

export default function OrderCustomer() {
  const [order, setOrder] = useState([]);
  const history = useHistory();
  //  const { token } = useContext(Context);

  useEffect(() => {
    const useStorage = getLocalStorage('user');
    (async () => {
      if (!useStorage.token || useStorage.token === null) return history.push('/login');
      const response = await getSalesById(
        Number(useStorage.id),
        useStorage.token,
      );
      setOrder(response);
      console.log(order);
    })();
  }, []);

  return (
    <div className="Login">
      {order.length !== 0
        ? order.map((elem) => (
          <Link key={ elem.id } to={ `/customer/orders/${elem.id}` }>
            <div
              key={ elem.id }
              data-testid={ `customer_orders__element-order-id-${elem.id}` }
            >
              { elem.id }
              <h1
                data-testid={ `customer_orders__element-delivery-status-${elem.id}` }
              >
                { elem.status }
              </h1>
              <h1
                data-testid={ `customer_orders__element-order-date-${elem.id}` }
              >
                { elem.saleDate.replace(/-/g, '/').split('T')[0] }
              </h1>
              <h1
                data-testid={ `customer_orders__element-card-price-${elem.id}` }
              >
                { elem.totalPrice }
              </h1>
            </div>
          </Link>
        ))
        : 'loading'}
    </div>
  );
}
