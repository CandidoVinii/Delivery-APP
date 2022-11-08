import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { createUser } from '../helpers/apiLogin';
import { setLocalStorage } from '../helpers/localStorage';

export default function Register() {
  const history = useHistory();
  const [disabledLoginButton, setDisabledLoginButton] = useState(true);
  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);
  const [name, setName] = useState('');
  const [validName, setValidName] = useState(false);
  const [messageError, setMessageError] = useState(false);

  useEffect(() => {
    if (validEmail && validPassword && validName) {
      return setDisabledLoginButton(false);
    }
    setMessageError(false);
    return setDisabledLoginButton(true);
  }, [validEmail, validPassword, validName]);

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

  const validateName = (value) => {
    const nameMinimumLength = 12;
    const validation = value.length >= nameMinimumLength;
    setValidName(validation);
  };

  const handleChange = (e) => {
    if (e.target.id === 'name') {
      validateName(e.target.value);
      setName(e.target.value);
    }
    if (e.target.id === 'email') {
      validateEmail(e.target.value);
      setEmail(e.target.value);
    }
    if (e.target.id === 'password') {
      validatePassword(e.target.value);
      setPassword(e.target.value);
    }
  };

  const createUserApi = async () => {
    const userCreate = await createUser(name, email, password);
    const errorCode = 409;
    if (userCreate === errorCode) {
      setMessageError(true);
    } else {
      history.push('/customer/products');
      setMessageError(false);
      setLocalStorage('user', userCreate);
    }
  };

  return (
    <div className="register">
      <div>
        <label htmlFor="name">
          Nome:
          {' '}
          <input
            id="name"
            data-testid="common_register__input-name"
            type="text"
            onChange={ handleChange }
            value={ name }
          />
        </label>
        <label htmlFor="email">
          Email:
          {' '}
          <input
            id="email"
            data-testid="common_register__input-email"
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
            data-testid="common_register__input-password"
            type="password"
            onChange={ handleChange }
            value={ password }
          />
        </label>
        <button
          data-testid="common_register__button-register"
          type="button"
          disabled={ disabledLoginButton }
          onClick={ createUserApi }
        >
          CADASTRAR
        </button>
      </div>
      <div data-testid="common_register__element-invalid_register">
        {messageError ? (
          <p>Campos inválidos!</p>
        ) : null}
      </div>
    </div>
  );
}
