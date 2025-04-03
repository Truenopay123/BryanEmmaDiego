import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import LogoutModal from './components/Logout';
import EditModal from './components/EditModal';
import AddModal from './components/AddModal';
import DeleteModal from './components/DeleteModal';
import { useNavigate } from 'react-router-dom';
import UTEQLogo from './css/assets/UTEQ.png';
import axios from 'axios';

function UserTable() {
  const [users, setUsers] = useState([]);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  const handleOpenAddModal = () => setShowAddModal(true);
  const handleCloseAddModal = () => setShowAddModal(false);

  const handleAddUser = (newUser) => {
    axios
      .post('https://plantify.jamadev.com/backend/AgregarUsuario.php', newUser)
      .then((response) => {
        if (response.data.status === 'success') {
          setUsers([...users, { ...newUser, id: response.data.id }]);
          setShowAddModal(false);
        } else {
          alert('Error: ' + response.data.message);
        }
      })
      .catch((error) => {
        alert('Error en la API: ' + error.message);
      });
  };

  const handleOpenEditModal = (user) => {
    setCurrentUser(user);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => setShowEditModal(false);

  const handleUpdateUser = (updatedUser) => {
    setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
    setShowEditModal(false);
  };

  const handleOpenDeleteModal = (user) => {
    setCurrentUser(user);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  const handleConfirmDelete = () => {
    axios
      .post('https://plantify.jamadev.com/backend/EliminarUsuario.php', {
        id: currentUser.id,
      })
      .then((response) => {
        if (response.data.status === 'success') {
          setUsers(users.filter((user) => user.id !== currentUser.id));
          setShowDeleteModal(false);
        } else {
          alert('Error: ' + response.data.message);
        }
      })
      .catch((error) => {
        alert('Error en la API: ' + error.message);
      });
  };

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      navigate('/login', { replace: true });
      return;
    }
  
    axios
      .get('https://plantify.jamadev.com/backend/MostrarUsuarios.php')
      .then((response) => {
        if (response.data.status === 'success') {
          const transformedUsers = response.data.data.map((usuario) => ({
            id: usuario.id,
            tipo: usuario.tipo,
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            correo: usuario.correo,
            contraseña: usuario.contraseña,
            direccion: usuario.direccion,
            telefono: usuario.telefono,
          }));
          setUsers(transformedUsers);
        } else {
          setError('Error al obtener usuarios: ' + response.data.message);
        }
      })
      .catch((error) => {
        setError('Error en la API: ' + error.message);
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  if (loading) {
    return <div>Cargando usuarios...</div>;
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
            <h1 className="h2">Gestión de Usuarios</h1>
            <img src={UTEQLogo} alt="UTEQ" style={{ height: '40px', marginRight: '10px' }} />
            <button className="btn btn-outline-danger btn-sm" onClick={handleOpenLogoutModal}>
              <i className="fas fa-sign-out-alt"></i>
            </button>
          </div>
          <button className="btn btn-success" onClick={handleOpenAddModal}>
            <i className="fas fa-add"></i>
          </button>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Tipo</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Correo</th>
                <th>Dirección</th>
                <th>Teléfono</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.tipo}</td>
                  <td>{user.nombre}</td>
                  <td>{user.apellido}</td>
                  <td>{user.correo}</td>
                  <td>{user.direccion}</td>
                  <td>{user.telefono}</td>
                  <td>
                    <div className="btn-group" role="group" aria-label="Basic example">
                      <button className="btn btn-primary" onClick={() => handleOpenEditModal(user)}>
                        <i className="fas fa-edit"></i>
                      </button>
                      <button className="btn btn-danger" onClick={() => handleOpenDeleteModal(user)}>
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>

      <LogoutModal show={showLogoutModal} onClose={handleCloseLogoutModal} onConfirm={handleConfirmLogout} />
      <AddModal show={showAddModal} onClose={handleCloseAddModal} onSave={handleAddUser} />
      <EditModal show={showEditModal} user={currentUser} onClose={handleCloseEditModal} onSave={handleUpdateUser} />
      <DeleteModal show={showDeleteModal} user={currentUser} onClose={handleCloseDeleteModal} onConfirm={handleConfirmDelete} />
    </div>
  );
}

export default UserTable;