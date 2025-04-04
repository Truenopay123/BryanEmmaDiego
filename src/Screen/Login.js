import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/styles.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMessage('');

    axios
      .post('https://plantify.jamadev.com/backend/login.php', {
        correo: email,
        contrasena: password,
      })
      .then((response) => {
        if (response.data.status === 'success') {
          // Guardar datos del usuario en localStorage para persistencia
          localStorage.setItem('authToken', 'loggedIn');
          localStorage.setItem('user', JSON.stringify(response.data.user));

          // Limpiar mensaje de error y redirigir
          setErrorMessage('');
          navigate('/inicio', { replace: true });
        } else {
          // Validar específicamente si el error es por contraseña incorrecta
          if (response.data.message === 'Contraseña incorrecta') {
            setErrorMessage('La contraseña ingresada es incorrecta. Por favor, intenta de nuevo.');
          } else {
            setErrorMessage(response.data.message); // Otro mensaje de error del backend
          }
        }
      })
      .catch((error) => {
        console.error('Error en la solicitud');
        setErrorMessage('Error en la contraseña');
      });
  };

  return (
    <div className="login-container">
      <div className="login-box shadow p-4 rounded">
        <h2 className="text-center mb-4">Bienvenidos!</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Correo Electrónico</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
        <div className="text-center mt-4">
          <div className="d-flex justify-content-center gap-3"></div>
        </div>
      </div>
    </div>
  );
}

export default Login;