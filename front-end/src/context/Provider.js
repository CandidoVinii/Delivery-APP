import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import { getLocalStorage } from '../helpers/localStorage';

function Provider({ children }) {
  const [token, setToken] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const userData = getLocalStorage('user');
    setToken(userData);
  }, []);

  const context = useMemo(() => (
    { token, products, setToken, setProducts }
  ), [products, token]);

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
