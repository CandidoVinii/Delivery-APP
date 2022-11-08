import React from 'react';
import PropTypes from 'prop-types';

export default function OrderCustomerCard({ object }) {
  const { id, status, saleDate, totalPrice } = object.order;
  const parsingDate = new Date(saleDate);
  const formatedDate = parsingDate.toLocaleDateString();
  return (
    <div
      key={ id }
      data-testid={ `customer_orders__element-order-id-${id}` }
    >
      {id}
      <h1 data-testid={ `customer_orders__element-delivery-status-${id}` }>
        {status}
      </h1>
      <h1 data-testid={ `customer_orders__element-order-date-${id}` }>
        { formatedDate }
      </h1>
      <h1 data-testid={ `customer_orders__element-card-price-${id}` }>
        {totalPrice.replace('.', ',')}
      </h1>
    </div>
  );
}

OrderCustomerCard.propTypes = {
  object: PropTypes.objectOf.isRequired,
};
