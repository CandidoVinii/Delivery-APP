import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import CartContext from '../context/CartContext';

export default function ProductCard({ product }) {
  const [quantity, setQuantity] = useState(0);
  const [setCart] = useContext(CartContext);
  const { id, name, price, url_image: urlImage } = product;
  const cartItem = { ...product, quantity };

  const handleClick = (e) => {
    if (e.target.id === 'increment') {
      setQuantity((prevState) => prevState + 1);
      setCart(cartItem);
    }
    if (e.target.id === 'decrement') {
      setQuantity((prevState) => {
        if (prevState > 0) { return prevState - 1; }
        return 0;
      });
    }
  };

  const handleChange = (e) => {
    const fieldValue = Number(e.target.value);
    if (fieldValue > 0) { return setQuantity(fieldValue); }
    setQuantity(0);
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
        type="text"
        data-testid={ `customer_products__input-card-quantity-${id}` }
        value={ quantity }
        onChange={ handleChange }
      />
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.objectOf.isRequired,
};
