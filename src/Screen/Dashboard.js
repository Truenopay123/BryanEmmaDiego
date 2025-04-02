import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar'; // Asegúrate de tener este componente
import LogoutModal from './components/Logout'; // Asegúrate de tener este componente
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [adminInfo, setAdminInfo] = useState(null); // Estado para almacenar la info del administrador
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de error
  const navigate = useNavigate();

  const handleOpenLogoutModal = () => setShowLogoutModal(true);
  const handleCloseLogoutModal = () => setShowLogoutModal(false);

  const handleConfirmLogout = () => {
    // Simulate a logout API call (if applicable)
    axios
      .post('https://plantify.jamadev.com/backend/Logout.php') // Replace with your actual logout endpoint
      .then((response) => {
        if (response.data.status === 'success') {
          // Clear any client-side session data (e.g., localStorage, tokens)
          localStorage.clear(); // Adjust based on how you store session data
          sessionStorage.clear();

          // Close the modal
          setShowLogoutModal(false);

          // Redirect to login and replace history to prevent back navigation
          navigate('/login', { replace: true });

          // Optional: Force a full page reload to ensure no state persists
          window.location.reload();
        } else {
          alert('Error al cerrar sesión: ' + response.data.message);
        }
      })
      .catch((error) => {
        alert('Error en la API: ' + error.message);
      });
  };


  useEffect(() => {
    // Llamada a la API para obtener la información del administrador
    axios
      .get('https://plantify.jamadev.com/backend/ObtenerAdminInfo.php') // Cambia esta URL según tu configuración
      .then((response) => {
        if (response.data.status === 'success') {
          setAdminInfo(response.data.data); // Guardar la información del administrador en el estado
        } else {
          setError('Error al obtener los datos del administrador');
        }
      })
      .catch((error) => {
        setError('Error en la API: ' + error.message);
      })
      .finally(() => setLoading(false)); // Finalizar la carga
  }, []);

  if (loading) {
    return <div>Cargando información del administrador...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <Sidebar />
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">Panel de Administración</h1>
            {/* Icono de cerrar sesión en la parte superior derecha */}
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={handleOpenLogoutModal}
              title="Cerrar sesión"
            >
              <i className="fas fa-sign-out-alt"></i>
            </button>
          </div>
          {/* Contenido principal */}
          <div className="row">
            <div className="col-md-4">
              <div className="card shadow-lg">
                <div className="card-body">
                  <h5 className="card-title">
                    <i className="fas fa-user"></i> Información del Administrador
                  </h5>
                  <p className="card-text"><strong>Nombre:</strong> {adminInfo.Nombre}</p>
                  <p className="card-text"><strong>Apellido:</strong> {adminInfo.Apellido}</p>
                  <p className="card-text"><strong>Correo:</strong> {adminInfo.Correo}</p>
                  <p className="card-text"><strong>Dirección:</strong> {adminInfo.Direccion}</p>
                  <p className="card-text"><strong>Teléfono:</strong> {adminInfo.Telefono}</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <LogoutModal show={showLogoutModal} onClose={handleCloseLogoutModal} onConfirm={handleConfirmLogout} />
    </div>
  );
}

export default Dashboard;
