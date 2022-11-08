import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import { getSalesDetails } from '../helpers/apiSales';
import { getLocalStorage } from '../helpers/localStorage';

export default function OrderDetails() {
  const [details, setDetails] = useState({});
  useEffect(() => {
    const userData = getLocalStorage('user');
    const userDataDetails = getSalesDetails(1, userData.token);
    setDetails(userDataDetails);
  }, []);
  return (
    <>
      <Navbar />
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item, index) => (
            <tr
              key={ index }
            >
              <td
                data-testid={
                  `customer_order_details__element-order-table-item-number-${index}`
                }
              >
                {index + 1}
              </td>
              <td
                data-testid={
                  `customer_order_details__element-order-table-name-${index}`
                }
              >
                {item.name}
              </td>
              <td
                data-testid={
                  `customer_order_details__element-order-table-quantity-${index}`
                }
              >
                {item.quantity}
              </td>
              <td
                data-testid={
                  `customer_order_details__element-order-table-unit-price-${index}`
                }
              >
                {item.price.replace('.', ',')}
              </td>
              <td
                data-testid={
                  `customer_order_details__element-order-table-sub-total-${index}`
                }
              >
                {(Number(item.quantity) * Number(item.price))
                  .toFixed(2).replace('.', ',')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>

  );
}
