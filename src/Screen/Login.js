import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/styles.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const response = await fetch('https://plantify.jamadev.com/backend/login.php', {
        method: 'POST', // Post
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          correo: email,
          contraseña: password,
        }),
      });

      const data = await response.json();

      if (data.status === 'success') {
        // Guardar datos del usuario en localStorage para persistencia
        localStorage.setItem('authToken', 'loggedIn'); // Indicador simple de autenticación
        localStorage.setItem('user', JSON.stringify(data.user));
        setErrorMessage('');
        navigate('/inicio', { replace: true }); // Redirigir y reemplazar historial
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      setErrorMessage('Error en la conexión con el servidor.');
    }
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