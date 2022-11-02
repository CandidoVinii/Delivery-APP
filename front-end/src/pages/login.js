import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { loginUser } from '../helpers/apiLogin';
import { getLocalStorage, setLocalStorage } from '../helpers/localStorage';
import Context from '../context/Context';

export default function Login() {
  const history = useHistory();
  const [disabledLoginButton, setDisabledLoginButton] = useState(true);
  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);
  const [messageError, setMessageError] = useState(false);

  const { setToken } = useContext(Context);

  useEffect(() => {
    const userData = getLocalStorage('user');
    if (userData) {
      setToken(userData);
      history.push('/customer/products');
    }
  }, []);

  useEffect(() => {
    if (validEmail && validPassword) {
      return setDisabledLoginButton(false);
    }
    setMessageError(false);
    return setDisabledLoginButton(true);
  }, [validEmail, validPassword]);

  const validateEmail = (value) => {
    const pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/igm;
    const validation = pattern.test(value);
    setValidEmail(validation);
  };

  const validatePassword = (value) => {
    const passwordMinimumLength = 6;
    const validation = value.length >= passwordMinimumLength;
    setValidPassword(validation);
  };

  const handleChange = (e) => {
    if (e.target.id === 'email') {
      validateEmail(e.target.value);
      setEmail(e.target.value);
    }
    if (e.target.id === 'password') {
      validatePassword(e.target.value);
      setPassword(e.target.value);
    }
  };

  const loginApi = async () => {
    const login = await loginUser(email, password);
    const errorCode = 404;
    if (login === errorCode) {
      setMessageError(true);
    } else {
      setMessageError(false);
      setLocalStorage('user', login);
      history.push('/customer/products');
    }
  };

  return (
    <div className="Login">
      <div>
        <label htmlFor="email">
          Email:
          {' '}
          <input
            id="email"
            data-testid="common_login__input-email"
            type="text"
            onChange={ handleChange }
            value={ email }
          />
        </label>
        <label htmlFor="password">
          Senha:
          {' '}
          <input
            id="password"
            data-testid="common_login__input-password"
            type="password"
            onChange={ handleChange }
            value={ password }
          />
        </label>
        <button
          data-testid="common_login__button-login"
          type="button"
          disabled={ disabledLoginButton }
          onClick={ () => loginApi() }
        >
          LOGIN
        </button>
        <button
          data-testid="common_login__button-register"
          type="button"
          onClick={ () => history.push('/register') }
        >
          Ainda não tenho conta
        </button>
      </div>
      <div data-testid="common_login__element-invalid-email">
        {messageError ? (
          <p>Login Inválido!</p>
        ) : null}
      </div>
    </div>
  );
}
