import React, { useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import Context from './Context';
import { getLocalStorage } from '../helpers/localStorage';

function Provider({ children }) {
  const [token, setToken] = useState('');
  const [products, setProducts] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const userData = getLocalStorage('userdata');
    setToken(userData);
  }, []);

  useEffect(() => {
    (async () => {
      const { data } = await axios('http://localhost:3001/products');
      setProducts(data);
    })();
  }, []);

  const context = useMemo(() => ({ token, products }), [products, token]);

  return (
    <div>
      <Context.Provider value={ context }>
        {children}
      </Context.Provider>
    </div>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
