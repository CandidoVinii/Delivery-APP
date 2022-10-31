import React from 'react';

export default function Products() {
  return (
    <div className="register">
      <nav>navbar
        <div data-testid='customer_products__element-navbar-link-products'>
          produtos
        </div>
        <div data-testid='customer_products__element-navbar-link-orders'>
          pedidos
        </div>
        <div data-testid='customer_products__element-navbar-user-full-name'>
          nome
        </div>
        <div data-testid='customer_products__element-navbar-link-logout'>
          logout
        </div>
      </nav>
    </div>
  );
}
