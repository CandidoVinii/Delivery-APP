import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { getSalesDetails } from '../helpers/apiSales';
import { getLocalStorage } from '../helpers/localStorage';

export default function OrderDetails() {
  const [details, setDetails] = useState({});

  useEffect(() => {
    (async () => {
      const userData = getLocalStorage('user');
      console.log(userData);
      const userDataDetails = await getSalesDetails(1, userData.token);
      console.log(userDataDetails);
      setDetails(userDataDetails);
    })();
  }, []);

  const { id } = details;
  return (
    <>
      <Navbar />
      <div>
        PEDIDO
        {' '}
        <span
          data-testid="customer_order_details__element-order-details-label-order-id"
        >
          {' '}
          {id}
        </span>
      </div>
      <div>
        P. Vend:
        {' '}
        <span
          data-testid="customer_order_details__element-order-details-label-seller-name"
        >
          {' '}
          {details.seller.name}
        </span>
      </div>
      {/* <div
        data-testid="customer_order_details__element-order-details-label-order-date"
      >
        {details.saleDate}
      </div>
      <div
        data-testid={
          `customer_order_details__element-order-details-label-delivery-status-
          ${details.id}`
        }
      >
        {details.status.toUpperCase()}
      </div>
      <button
        type="button"
        data-testid="customer_order_details__button-delivery-check"
      >
        MARCAR COMO ENTREGUE
      </button> */}
      {/* <table>
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
      </table> */}
    </>
  );
}
