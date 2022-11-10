import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Navbar from '../components/Navbar';
import { getLocalStorage } from '../helpers/localStorage';
import { getSalesDetails, updateSalesStatus } from '../helpers/apiSales';

export default function SellerOrderDetails(props) {
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
  // const [details, setDetails] = useState({});
  const [pending, setPending] = useState(false);
  const [delivery, setDelivery] = useState(true);
  const PENDENTE = 'Pendente';
  const PREPARANDO = 'Preparando';
  const EM_TRANSITO = 'Em Trânsito';
  // const ENTREGUE = 'Entregue';

  useEffect(() => {
    (async () => {
      const userData = getLocalStorage('user');
      const orderDetails = await getSalesDetails(id, userData.token);
      setDetails(orderDetails);
    })();
  }, [id]);

  const updateStatus = async (status) => {
    const userData = getLocalStorage('user');
    await updateSalesStatus(id, status, userData.token);
    setDetails((prevState) => (
      { ...prevState, status }));
  };

  // const pendindStatus = () => {
  //   if (details.status === PREPARANDO
  //     && details.status === EM_TRANSITO
  //     && details.status === ENTREGUE) {
  //     setPending(true);
  //   }
  // };

  // const deliveryStatus = () => {
  //   if (details.status === PENDENTE
  //     && details.status === EM_TRANSITO
  //     && details.status === ENTREGUE) {
  //     setPending(true);
  //   }
  // };

  const handleStatus = () => {
    if (details.status === PENDENTE) {
      setPending(true);
      setDetails((prevState) => (
        { ...prevState, status: PREPARANDO }));
      updateStatus(PREPARANDO);
      setDelivery(false);
    }
  };

  const handleDelivery = () => {
    if (details.status === PREPARANDO) {
      setPending(true);
      setDelivery(false);
      setDetails((prevState) => (
        { ...prevState, status: EM_TRANSITO }));
      updateStatus(EM_TRANSITO);
      setDelivery(true);
    }
  };

  return (
    <>
      <Navbar />
      {!details.products ? 'Loading'
        : (
          <div>
            <div>
              PEDIDO
              {' '}
              <span
                data-testid="seller_order_details__element-order-details-label-order-id"
              >
                {' '}
                {details.id}
              </span>
            </div>
            <div
              data-testid="seller_order_details__element-order-details-label-order-date"
            >
              {' '}
              {new Date(details.saleDate).toLocaleDateString('pt-br')}
            </div>
            <div
              data-testid={
                `seller_order_details__element-order-details-label-delivery-status-
          ${details.id}`
              }
            >
              {' '}
              {details.status}
            </div>
            <button
              type="button"
              data-testid="seller_order_details__button-preparing-check"
              onClick={ handleStatus }
              disabled={ pending }
            >
              PREPARAR PEDIDO
            </button>
            <button
              type="button"
              data-testid="seller_order_details__button-dispatch-check"
              onClick={ handleDelivery }
              disabled={ delivery }
            >
              SAIU PARA ENTREGA
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
                        `seller_order_details__element-order-table-item-number-${index}`
                      }
                    >
                      {index + 1}
                    </td>
                    <td
                      data-testid={
                        `seller_order_details__element-order-table-name-${index}`
                      }
                    >
                      {item.name}
                    </td>
                    <td
                      data-testid={
                        `seller_order_details__element-order-table-quantity-${index}`
                      }
                    >
                      {item.salesProducts.quantity}
                    </td>
                    <td
                      data-testid={
                        `seller_order_details__element-order-table-unit-price-${index}`
                      }
                    >
                      {item.price.replace('.', ',')}
                    </td>
                    <td
                      data-testid={
                        `seller_order_details__element-order-table-sub-total-${index}`
                      }
                    >
                      {(Number(item.salesProducts.quantity) * Number(item.price))
                        .toFixed(2).replace('.', ',')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h2 data-testid="seller_order_details__element-order-total-price">
              Total:
              {' '}
              {details.totalPrice.replace('.', ',')}
            </h2>
          </div>
        )}
    </>
  );
}

SellerOrderDetails.propTypes = {
  match: PropTypes.objectOf.isRequired,
  params: PropTypes.objectOf.isRequired,
  id: PropTypes.string.isRequired,
};
