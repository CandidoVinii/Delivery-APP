import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Navbar from '../components/Navbar';
import { getSalesDetails, updateSalesStatus } from '../helpers/apiSales';
import { getLocalStorage } from '../helpers/localStorage';

export default function OrderDetails(props) {
  const { match: { params: { id } } } = props;
  const [details, setDetails] = useState({
    id: 0,
    userId: 0,
    sellerId: 0,
    totalPrice: '',
    deliveryAddress: '',
    deliveryNumber: '',
    saleDate: '',
    products: [], // *** FONTE: https://stackoverflow.com/a/71677602/18172843
    seller: {}, // ***
    status: '',
  });

  const [delivered, setDelivered] = useState(true);

  useEffect(() => {
    (async () => {
      const userData = getLocalStorage('user');
      const orderDetails = await getSalesDetails(id, userData.token);
      setDetails(orderDetails);
    })();
  }, []);

  const updateStatus = async (status) => {
    const userData = getLocalStorage('user');
    await updateSalesStatus(id, status, userData.token);
    setDetails((prevState) => (
      { ...prevState, status }));
  };

  const handleStatus = () => {
    if (details.status !== 'Entregue') {
      setDelivered(true);
      setDetails((prevState) => (
        { ...prevState, status: 'Entregue' }));
      updateStatus('Entregue');
    }
  };

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
          {details.id}
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
      <div
        data-testid="customer_order_details__element-order-details-label-order-date"
      >
        {' '}
        {new Date(details.saleDate).toLocaleDateString('pt-br')}
      </div>
      <div
        data-testid={
          `customer_order_details__element-order-details-label-delivery-status-
          ${details.id}`
        }
      >
        {' '}
        {details.status}
      </div>
      <button
        type="button"
        data-testid="customer_order_details__button-delivery-check"
        onClick={ handleStatus }
        disabled={ delivered }
      >
        MARCAR COMO ENTREGUE
      </button>
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
          {details.products.map((item, index) => (
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
                {item.salesProducts.quantity}
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
                {(Number(item.salesProducts.quantity) * Number(item.price))
                  .toFixed(2).replace('.', ',')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2 data-testid="customer_order_details__element-order-total-price">
        Total:
        {' '}
        {details.totalPrice.replace('.', ',')}
      </h2>
    </>
  );
}

OrderDetails.propTypes = {
  match: PropTypes.objectOf.isRequired,
  params: PropTypes.objectOf.isRequired,
  id: PropTypes.string.isRequired,
};
