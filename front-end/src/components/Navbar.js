import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getLocalStorage, removeLocalStorage } from '../helpers/localStorage';

export default function Navbar() {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const history = useHistory();

  useEffect(() => {
    const userData = getLocalStorage('user');
    setName(userData.name);
    setRole(userData.role);
  }, []);

  const logout = () => {
    history.push('/');
    removeLocalStorage('user');
    removeLocalStorage('carrinho');
  };

  const goToOrder = () => {
    history.push('/customer/orders');
  };

  return (
    <nav>
      <ul>
        {role === 'customer'
          && (
            <li>
              <div data-testid="customer_products__element-navbar-link-products">
                produtos
              </div>
            </li>
          )}
        <li>
          <button
            type="button"
            data-testid="customer_products__element-navbar-link-orders"
            onClick={ goToOrder }
          >
            pedidos
          </button>
        </li>
        <li>
          <div data-testid="customer_products__element-navbar-user-full-name">
            {name}
          </div>
        </li>
        <li>
          <button
            type="button"
            data-testid="customer_products__element-navbar-link-logout"
            onClick={ logout }
          >
            sair
          </button>
        </li>
      </ul>
    </nav>
  );
}
