import React, { useState } from 'react';

export default function Checkout() {
  const [products, setProducts] = useState([]);
  const [sellers, setSellers] = useState([]);

  const removeProduct = (name) => {
    setProducts(products.filter((item) => item.name !== name));
    console.log(setSellers);
  };

  return (
    <div className="checkout">
      {products.length !== 0 ? (
        <ul>
          {products.map((item, index) => (
            <li
              key={ item.valor }
              data-testId={ `element-order-table-item-number${index}` }
            >
              <div key={ item.name }>
                <p
                  data-testId={ `element-order-table-name-${index}` }
                >
                  {item.name}
                </p>
                <p
                  data-testId={ `element-order-table-quantity-${index}` }
                >
                  {item.quantidade}
                </p>
                <p
                  data-testId={ `element-order-table-unit-price-${index}` }
                >
                  {item.valor}
                </p>
                <p
                  data-testId={ `element-order-table-sub-total-${index}` }
                >
                  {Number(item.quantidade) * Number(item.valor)}
                </p>
                <button
                  type="button"
                  onClick={ () => removeProduct() }
                  data-testId={ `element-order-table-remove-${index}` }
                >
                  Remover
                </button>
              </div>
            </li>))}
          ;
          <h2 data-testId="element-order-table-total-price">TOTAL PRICE</h2>
        </ul>) : null}

      <div>
        <select data-testId="customer_checkout__select-seller">
          {sellers.map((item, index) => <options key={ index }>{item.name}</options>)}
          ;
        </select>
        <input data-testId="customer_checkout__input-address" />
        <input type="number" data-testId="customer_checkout__input-address-number" />
        <button
          type="button"
          data-testId="customer_checkout__button-submit-order"
        >
          Finalizar Pedido
        </button>
      </div>
    </div>
  );
}
