import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import LogoutModal from './components/Logout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function EducacionView() {
  const [opiniones, setOpiniones] = useState([]);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleOpenLogoutModal = () => {
    setShowLogoutModal(true);
  };

  const handleCloseLogoutModal = () => {
    setShowLogoutModal(false);
  };

  const handleConfirmLogout = () => {
    console.log('Sesión cerrada');
    setShowLogoutModal(false);
    navigate('/login');
  };

  useEffect(() => {
    // Llamada a la API para obtener las opiniones del sector "Educación"
    axios
      .get('http://localhost:8080/estadia/estadia/backend/ObtenerComentariosEducacion.php')
      .then((response) => {
        if (response.data.status === 'success') {
          // Asignar directamente los datos recibidos
          setOpiniones(response.data.data);
        } else {
          setError(response.data.message || 'Error desconocido');
        }
      })
      .catch((err) => {
        setError('Error en la API: ' + err.message);
      });
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <Sidebar />
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">Opiniones sobre Educación</h1>
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={handleOpenLogoutModal}
            >
              <i className="fas fa-sign-out-alt"></i>
            </button>
          </div>
          {error ? (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          ) : (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nombre del Ciudadano</th>
                  <th>Opinión</th>
                </tr>
              </thead>
              <tbody>
                {opiniones.map((opinion) => (
                  <tr key={opinion.id_servicios}>
                    <td>{opinion.id_usuario}</td>
                    <td>{opinion.nombre_usuario}</td>
                    <td>{opinion.comentario}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </main>
      </div>

      <LogoutModal
        show={showLogoutModal}
        onClose={handleCloseLogoutModal}
        onConfirm={handleConfirmLogout}
      />
    </div>
  );
}

export default EducacionView;
