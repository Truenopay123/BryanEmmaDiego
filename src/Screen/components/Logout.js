import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function LogoutModal({ show, onClose, onConfirm }) {
  if (!show) {
    return null;
  }

  return (
    <div className="modal show d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Cerrar Sesión</h5>
          </div>
          <div className="modal-body">
            <p>¿Estás seguro de que deseas cerrar sesión?</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button type="button" className="btn btn-danger" onClick={onConfirm}>
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogoutModal;