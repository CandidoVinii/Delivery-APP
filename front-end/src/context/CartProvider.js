// import React, { useState, useMemo } from 'react';
// import PropTypes from 'prop-types';
// import CartContext from './CartContext';
// // import { getLocalStorage } from '../helpers/localStorage';

// function Provider({ children }) {
//   const [cart, setCart] = useState([]);

//   // useEffect(() => {
//   //   const cartData = getLocalStorage('carrinho');
//   //   if (cartData === null) { return setCart([]); }
//   //   setCart(cartData);
//   // }, []);

//   // useEffect(() => {
//   //   setCart([...cart]);
//   // }, [cart]);

//   const addItem = (value) => {
//     if (cart.find((item) => { item.id === value.id; })) { cart.find(); }
//     // setCart([...cart, value]);
//     if (cart.length === 0) setCart([...cart, value]);
//     cart.map((item) => {
//       if (item.id === value.id) {
//         console.log({ item });
//         console.log({ value });
//         return setCart({ ...item, quantity: value.quantity });
//       }
//       console.log('4', cart);
//       return setCart([...cart, value]);
//     });
//   };

//   const context = useMemo(() => (
//     { cart, addItem }
//   ), [cart]);

//   return (
//     <div>
//       <CartContext.Provider value={ context }>
//         {children}
//       </CartContext.Provider>
//     </div>
//   );
// }

// Provider.propTypes = {
//   children: PropTypes.node.isRequired,
// };

// export default Provider;
