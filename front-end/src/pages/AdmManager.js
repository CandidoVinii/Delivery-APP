import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { createUserAdmin, getAllUsers } from '../helpers/apiLogin';
import { getLocalStorage } from '../helpers/localStorage';

// importar o deleteUser quando for usar

export default function AdmManager() {
  const history = useHistory();
  const [disabledLoginButton, setDisabledLoginButton] = useState(true);
  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);
  const [name, setName] = useState('');
  const [validName, setValidName] = useState(false);
  const [role, setRole] = useState('seller');
  const [messageError, setMessageError] = useState(false);
  const [users, setUsers] = useState([]);
  const [ls, setLs] = useState();

  useEffect(() => {
    // verificação para que somente o usuário admin consiga acessar essa página
    const useStorage = getLocalStorage('user');
    setLs(useStorage);
    if (useStorage.role === 'customer' || null) {
      return history.push('/customer/products');
    }
    if (useStorage.role === 'seller') {
      return history.push('/seller/orders');
    }
    (async () => {
      if (!useStorage.token || useStorage.token === null) return history.push('/login');
      const usersData = await getAllUsers(useStorage.token);
      setUsers(usersData);
    })();
  }, []);

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

    if (e.target.id === 'role') {
      setRole(e.target.value);
    }
  };

  const createUserApi = async () => {
    const data = { name, email, password, role };
    const userCreate = await createUserAdmin(data, ls.token);
    const errorCode409 = 409;
    if (userCreate === errorCode409) {
      setMessageError(true);
    } else {
      setMessageError(false);
    }
  };

  // Função de remover já criada, para passar no bonus tem que fazer com que
  // a tela atualize a cada usuário removido
  // const removeUser = async (id) => {
  //     await deleteUser(id, ls.token);
  // }

  return (
    <div className="register">
      <div>
        <label htmlFor="name">
          Nome:
          {' '}
          <input
            id="name"
            data-testid="admin_manage__input-name"
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
            data-testid="admin_manage__input-email"
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
            data-testid="admin_manage__input-password"
            type="password"
            onChange={ handleChange }
            value={ password }
          />
        </label>
        <select
          id="role"
          onChange={ handleChange }
          data-testid="admin_manage__select-role"
        >
          <option value="seller">Vendedor</option>
          <option value="administrator">Admin</option>
          <option value="customer">Customer</option>
        </select>
        <button
          data-testid="admin_manage__button-register"
          type="button"
          disabled={ disabledLoginButton }
          onClick={ createUserApi }
        >
          CADASTRAR
        </button>
      </div>
      <div data-testid="admin_manage__element-invalid-register">
        {messageError ? (
          <p>Campos inválidos!</p>
        ) : null}
      </div>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Tipo</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>
          {users.map((item, index) => (
            <tr
              key={ index }
            >
              <td
                data-testid={
                  `admin_manage__element-user-table-item-number-${index}`
                }
              >
                {index + 1}
              </td>
              <td
                data-testid={
                  `admin_manage__element-user-table-name-${index}`
                }
              >
                {item.name}
              </td>
              <td
                data-testid={
                  `admin_manage__element-user-table-email-${index}`
                }
              >
                {item.email}
              </td>
              <td
                data-testid={
                  `admin_manage__element-user-table-role-${index}`
                }
              >
                {item.role}
              </td>
              <td>
                <button
                  type="button"
                  // onClick={ () => removeUser(item.id) }
                  data-testid={
                    `admin_manage__element-user-table-remove-${index}`
                  }
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
