import React from 'react';
import PropTypes from 'prop-types';

export default function ProductCard({ object }) {
  const { id, name, price, url_image: urlImage } = object.product;

  const handleClick = (e) => {
    if (e.target.id === 'increment') {
      const cartQuantity = object.cart.map((item) => {
        if (item.id === id) {
          item.quantity += 1;
        }
        return item;
      });
      object.setCart(cartQuantity);
    }
    if (e.target.id === 'decrement') {
      const cartQuantity = object.cart.map((item) => {
        if (item.id === id) {
          item.quantity -= 1;
        }
        if (item.quantity < 0) item.quantity = 0;
        return item;
      });
      object.setCart(cartQuantity);
    }
  };

  const handleChange = (e) => {
    let fieldValue = Number(e.target.value);
    if (fieldValue < 0) fieldValue = 0;
    const cartQuantity = object.cart.map((item) => {
      if (item.id === id) {
        item.quantity = fieldValue;
      }
      return item;
    });
    object.setCart(cartQuantity);
  };

  return (
    <div key={ id }>
      <h3 data-testid={ `customer_products__element-card-title-${id}` }>
        {name}
      </h3>
      <h1 data-testid={ `customer_products__element-card-price-${id}` }>
        {price.replace('.', ',')}
      </h1>
      <img
        data-testid={ `customer_products__img-card-bg-image-${id}` }
        alt="imagem produto"
        src={ urlImage }
      />
      <button
        id="increment"
        type="button"
        data-testid={ `customer_products__button-card-add-item-${id}` }
        onClick={ handleClick }
      >
        +
      </button>
      <button
        id="decrement"
        type="button"
        data-testid={ `customer_products__button-card-rm-item-${id}` }
        onClick={ handleClick }
      >
        -
      </button>
      <input
        type="number"
        data-testid={ `customer_products__input-card-quantity-${id}` }
        value={ object.cart[object.index].quantity }
        onChange={ handleChange }
      />
    </div>
  );
}

ProductCard.propTypes = {
  object: PropTypes.objectOf.isRequired,
};
