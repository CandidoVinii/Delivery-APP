import React from 'react';
import PropTypes from 'prop-types';

export default function OrderSellerCard({ object }) {
  const { id, status, saleDate, totalPrice, deliveryAddress,
    deliveryNumber } = object.order;
  return (
    <div key={ id }>
      <div>
        Pedido:
        {' '}
        <span data-testid={ `seller_orders__element-order-id-${id}` }>
          {id}
        </span>
      </div>
      <div
        data-testid={ `seller_orders__element-delivery-status-${id}` }
      >
        {status}
      </div>
      <div
        data-testid={ `seller_orders__element-order-date-${id}` }
      >
        {saleDate}
      </div>
      <div>
        R$
        {' '}
        <span data-testid={ `seller_orders__element-card-price-${id}` }>
          {totalPrice}
        </span>
      </div>
      <div
        data-testid={ `seller_orders__element-card-address-${id}` }
      >
        {deliveryAddress}
        ,
        {' '}
        {deliveryNumber}
      </div>
    </div>
  );
}

OrderSellerCard.propTypes = {
  object: PropTypes.objectOf.isRequired,
};
