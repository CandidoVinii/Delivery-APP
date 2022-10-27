import React from 'react';

export default function Register() {
  // const [errorMessage, setErrorMessage] = useState(false);

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
          />
        </label>
        <label htmlFor="email">
          Email:
          {' '}
          <input
            id="email"
            data-testid="common_register__input-email"
            type="text"
          />
        </label>
        <label htmlFor="password">
          Senha:
          {' '}
          <input
            id="password"
            data-testid="common_register__input-password"
            type="password"
          />
        </label>
        <button
          data-testid="common_register__button-register"
          type="button"
        >
          CADASTRAR
        </button>
      </div>
      <div data-testid="common_register__element-invalid_register">
        [Elemento oculto (Mensagens de erro)]
      </div>
      <div />
      {/* <object className="rocksGlass" type="image/svg+xml" data={ rockGlass }>Glass</object> */}
    </div>
  );
}
