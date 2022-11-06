import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import './products.css';
import Context from '../context/Context';
// import CartContext from '../context/CartContext';
import { setLocalStorage } from '../helpers/localStorage';

export default function Products() {
  const { token, products, setProducts } = useContext(Context);
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const history = useHistory();
  // const { cart } = useContext(CartContext);

  useEffect(() => {
    const result = cart.reduce((acc, curr) => acc + (curr.quantity * curr.price), 0);
    setTotalPrice(result);
  }, [cart]);

  useEffect(() => {
    (async () => {
      if (!token || token === null) return history.push('/login');
      const config = { headers: { authorization: token.token } };
      const { data } = await axios('http://localhost:3001/products', config);
      const modeledData = data.map((item) => ({ ...item, quantity: 0 }));
      setCart(modeledData);
      setProducts(data);
    })();
  }, [token, setProducts, history]);

  const toCheckout = () => {
    setLocalStorage('carrinho', cart);
    history.push('/customer/checkout');
  };

  return (
    <>
      <Navbar />
      {products.map((product, index) => (
        <ProductCard
          key={ product.id }
          object={ { product, index, cart, setCart } }
        />))}
      <button
        type="button"
        data-testid="customer_products__button-cart"
        onClick={ toCheckout }
        disabled={ cart.every((item) => (item.quantity === 0)) }

      >
        <div>Ver carrinho:</div>
        <div data-testid="customer_products__checkout-bottom-value">
          {totalPrice.toFixed(2).replace('.', ',')}
        </div>
      </button>

    </>
  );
}
