import React from 'react';
import './App.css';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import Products from './pages/products';
import Checkout from './pages/checkout';
import Provider from './context/Provider';
import Orders from './pages/orders';
import OrderDetails from './pages/orderDetails';
import SellerOrderDetails from './pages/sellerOrderDetail';
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
          <Route exact path="/customer/orders/:id" component={ OrderDetails } />
          <Route exact path="/customer/orders" component={ Orders } />
          <Route exact path="/seller/orders/:id" component={ SellerOrderDetails } />
          <Route exact path="/seller/orders" component={ Orders } />
        </Provider>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
