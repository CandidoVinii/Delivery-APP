import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { getLocalStorage } from '../helpers/localStorage';

export default function Checkout() {
  const [products, setProducts] = useState([]);
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    const readLocalStorage = getLocalStorage('carrinho');
    const filteredProducts = readLocalStorage.filter((item) => item.quantity > 0);
    setProducts(filteredProducts);
  }, []);

  const removeProduct = (e) => {
    const remainingItens = products
      .filter((item) => Number(item.id) !== Number(e.target.id));
    setProducts(remainingItens);
    console.log(setSellers); // <---- só pro lint não reclamar!
  };

  return (
    <>
      <Navbar />
      <div className="checkout">
        {products.length !== 0 ? (
          <>
            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Descrição</th>
                  <th>Quantidade</th>
                  <th>Valor Unitário</th>
                  <th>Sub-total</th>
                  <th>Remover item</th>
                </tr>
              </thead>
              <tbody>
                {products.map((item, index) => (
                  <tr
                    key={ index }
                  >
                    <td
                      data-testid={
                        `customer_checkout__element-order-table-item-number-${index}`
                      }
                    >
                      {index + 1}
                    </td>
                    <td
                      data-testid={
                        `customer_checkout__element-order-table-name-${index}`
                      }
                    >
                      {item.name}
                    </td>
                    <td
                      data-testid={
                        `customer_checkout__element-order-table-quantity-${index}`
                      }
                    >
                      {item.quantity}
                    </td>
                    <td
                      data-testid={
                        `customer_checkout__element-order-table-unit-price-${index}`
                      }
                    >
                      {item.price.replace('.', ',')}
                    </td>
                    <td
                      data-testid={
                        `customer_checkout__element-order-table-sub-total-${index}`
                      }
                    >
                      {(Number(item.quantity) * Number(item.price))
                        .toFixed(2).replace('.', ',')}
                    </td>
                    <td>
                      <button
                        id={ item.id }
                        type="button"
                        onClick={ removeProduct }
                        data-testid={
                          `customer_checkout__element-order-table-remove-${index}`
                        }
                      >
                        Remover
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h2 data-testid="customer_checkout__element-order-total-price">
              TOTAL:
              {' '}
              {products.reduce((acc, curr) => acc + (curr.quantity * curr.price), 0)
                .toFixed(2).replace('.', ',')}
            </h2>
          </>
        ) : null}
        <div>
          <select data-testid="customer_checkout__select-seller">
            {sellers.map((item, index) => <options key={ index }>{item.name}</options>)}
          </select>
          <input data-testid="customer_checkout__input-address" />
          <input type="number" data-testid="customer_checkout__input-address-number" />
          <button
            type="button"
            data-testid="customer_checkout__button-submit-order"
          >
            Finalizar Pedido
          </button>
        </div>
      </div>
    </>
  );
}
