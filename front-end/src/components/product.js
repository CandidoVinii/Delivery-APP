import React from 'react';

export default function ProductCard(product) {
  const { id, name, price, url_image: urlImage } = product;
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
        type="button"
        data-testid={ `customer_products__button-card-add-item-${id}` }
      >
        +
      </button>
      <button
        type="button"
        data-testid={ `customer_products__button-card-rm-item-${id}` }
      >
        -
      </button>
      <input
        type="text"
        data-testid={ `customer_products__input-card-quantity-${id}` }
        value="0"
      />
    </div>
  );
}
