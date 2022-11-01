import React from 'react';

export default function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <div data-testid="customer_products__element-navbar-link-products">
            produtos
          </div>
        </li>
        <li>
          <div data-testid="customer_products__element-navbar-link-orders">
            pedidos
          </div>
        </li>
        <li>
          <div data-testid="customer_products__element-navbar-user-full-name">
            nome
          </div>
        </li>
        <li>
          <div data-testid="customer_products__element-navbar-link-logout">
            logout
          </div>
        </li>
      </ul>
    </nav>
  );
}
