import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import CartContext from './CartContext';
import { getLocalStorage } from '../helpers/localStorage';

function Provider({ children }) {
  const [cart, setCart] = useState([]);

  // useEffect(() => {
  //   const cartData = getLocalStorage('carrinho');
  //   if (cartData === null) { return setCart([]); }
  //   setCart(cartData);
  // }, []);

  const addItem = (value) => {
    setCart(
      cart.map((item) => {
        if (item.id === value.id) {
          return { ...item, quantity: value.quantity };
        }
        return setCart([...cart, value]);
      }),
    );
  };

  const context = useMemo(() => (
    { cart, addItem }
  ), [cart]);

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
