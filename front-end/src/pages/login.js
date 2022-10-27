import React from 'react';
import { useHistory } from 'react-router-dom';
// import '../App.css';
// import rockGlass from '../images/rockGlass.svg';

export default function Login() {
  const history = useHistory();
  // const [errorMessage, setErrorMessage] = useState(false);

  return (
    <div className="Login">
      <div>
        <label htmlFor="login">
          Login:
          {' '}
          <input
            id="login"
            data-testid="common_login__input-email"
            type="text"
          />
        </label>
        <label htmlFor="password">
          Senha:
          {' '}
          <input
            id="password"
            data-testid="common_login__input-password"
            type="password"
          />
        </label>
        <button
          data-testid="common_login__button-login"
          type="button"
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
        [Elemento oculto (Mensagens de erro)]
      </div>
      <div />
      {/* <object className="rocksGlass" type="image/svg+xml" data={ rockGlass }>Glass</object> */}
    </div>
  );
}
