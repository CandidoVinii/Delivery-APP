import React from 'react';
import './App.css';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import Products from './pages/products';
import Checkout from './pages/checkout';
import Provider from './context/Provider';
import OrderDetail from './pages/orderDetail';
import OrderCustomer from './pages/ordersCustomer';
// import CartProvider from './context/CartProvider';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Provider>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route exact path="/login" component={ Login } />
          <Route exact path="/register" component={ Register } />
          <Route exact path="/customer/products" component={ Products } />
          <Route exact path="/customer/checkout" component={ Checkout } />
          <Route exact path="/customer/orders/:id" component={ OrderDetail } />
          <Route exact path="/customer/orders" component={ OrderCustomer } />
        </Provider>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
