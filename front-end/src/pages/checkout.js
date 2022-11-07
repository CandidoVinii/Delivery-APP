import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Context from '../context/Context';
import { salesCreate, salesProducts } from '../helpers/apiSales';
import { getLocalStorage } from '../helpers/localStorage';

export default function Checkout() {
  const { token } = useContext(Context);
  const [products, setProducts] = useState([]);
  const [sallers, setSallers] = useState([]);
  const [saller, setSallerId] = useState('');
  const [address, setAddress] = useState('');
  const [numberAnddress, setNumberAnddress] = useState();
  const history = useHistory();

  useEffect(() => {
    const readLocalStorage = getLocalStorage('carrinho');
    const filteredProducts = readLocalStorage.filter((item) => item.quantity > 0);
    setProducts(filteredProducts);
  }, []);

  useEffect(() => {
    (async () => {
      const config = { headers: { authorization: token.token } };
      const { data } = await axios('http://localhost:3001/user', config);
      const result = data.filter((seller) => seller.role === 'seller');
      setSallers(result);
    })();
  }, [token.token]);

  const removeProduct = (e) => {
    const remainingItens = products
      .filter((item) => Number(item.id) !== Number(e.target.id));
    setProducts(remainingItens);
  };

  const handleChange = (e) => {
    if (e.target.id === 'seller') {
      if (e.target.value === 'Selecione o Vendedor') {
        setSallerId('');
      } else {
        setSallerId(e.target.value);
      }
    }
    if (e.target.id === 'address') {
      setAddress(e.target.value);
    }
    if (e.target.id === 'numberAddress') {
      setNumberAnddress(Number(e.target.value));
    }
  };

  const handleClick = async () => {
    const totalPrice = products
      .reduce((acc, curr) => acc + (curr.quantity * curr.price), 0)
      .toFixed(2);
    console.log(totalPrice);
    const data = {
      userId: Number(token.id),
      sellerId: Number(saller),
      totalPrice,
      deliveryAddress: address,
      deliveryNumber: Number(numberAnddress),
      status: 'Pendente',
    };
    const urlPath = await salesCreate(data, token.token);
    products.map(async (item) => {
      const dataSaleProduct = {
        saleId: urlPath.id,
        productId: item.id,
        quantity: Number(item.quantity),
      };
      await salesProducts(dataSaleProduct, token.token);
    });
    history.push(`/customer/orders/${urlPath.id}`);
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
          <select
            id="seller"
            onChange={ handleChange }
            data-testid="customer_checkout__select-seller"
          >
            <option>Selecione o Vendedor</option>
            {sallers.map((item, index) => (
              <option value={ item.id } key={ index }>
                {item.name.toLowerCase()}
              </option>
            ))}
          </select>
          <input
            onChange={ handleChange }
            id="address"
            data-testid="customer_checkout__input-address"
          />
          <input
            onChange={ handleChange }
            id="numberAddress"
            min={ 0 }
            type="number"
            data-testid="customer_checkout__input-address-number"
          />
          <button
            type="button"
            data-testid="customer_checkout__button-submit-order"
            onClick={ handleClick }
          >
            Finalizar Pedido
          </button>
        </div>
      </div>
    </>
  );
}
