import React from 'react';
import '../App.css';
import rockGlass from '../images/rockGlass.svg';

export default function Login() {
  return (
    <div className="Login">
      <span className="logo">TRYBE</span>
      <object className="rocksGlass" type="image/svg+xml" data={ rockGlass }>
        Glass
      </object>
    </div>
  );
}
