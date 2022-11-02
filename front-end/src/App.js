import React from 'react';
import './App.css';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import Products from './pages/products';
import Provider from './context/Provider';

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
        </Provider>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
