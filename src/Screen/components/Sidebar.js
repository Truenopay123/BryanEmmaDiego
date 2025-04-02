import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from 'react-router-dom';

function Sidebar() {

  return (
    <>
      {/* Sidebar */}
      <nav className="col-md-2 d-none d-md-block sidebar vh-100" style={{ backgroundColor: '#2D3E56 ' }}>
        <div className="position-sticky">
          <h4 className="text-light text-center py-3">Dashboard</h4>
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link to="/inicio" className="nav-link active text-light">
                <i className="fas fa-home"></i> Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/usuarios" className="nav-link text-light">
                <i className="fas fa-users"></i> Usuarios
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Sidebar;
