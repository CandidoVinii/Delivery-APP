import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
// import PropTypes from 'prop-types';
import Navbar from '../components/navbar';
import ProductCard from '../components/ProductCard';
import './products.css';
import Context from '../context/Context';

export default function Products() {
  const { token, products, setProducts } = useContext(Context);
  const history = useHistory();

  useEffect(() => {
    (async () => {
      if (!token || token === null) return history.push('/login');
      const config = { headers: { authorization: token.token } };
      const { data } = await axios('http://localhost:3001/products', config);
      setProducts(data);
    })();
  }, [token, setProducts, history]);

  return (
    <>
      <Navbar />
      {products.map((product) => (
        <ProductCard key={ product.id } product={ product } />))}
    </>
  );
}

// Products.propTypes = {
//   obj: PropTypes.objectOf.isRequired,
// };
