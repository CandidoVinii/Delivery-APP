import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CartContext from './CartContext';
import { getLocalStorage } from '../helpers/localStorage';

function Provider({ children }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const cartData = getLocalStorage('carrinho');
    if (cartData === null) { return setCart([]); }
    setCart(cartData);
  }, []);

  const addItem = () => {
    
  }

  // const context = useMemo(() => (
  //   { token, products, cart, setToken, setProducts }
  // ), [products, token]);

  return (
    <div>
      <CartContext.Provider value={ context }>
        {children}
      </CartContext.Provider>
    </div>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
