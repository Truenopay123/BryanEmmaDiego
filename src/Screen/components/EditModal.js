import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import axios from 'axios';

function EditModal({ show, user, onClose, onSave }) {
  const [formData, setFormData] = useState({
    id: '',
    tipo: '',
    nombre: '',
    apellido: '',
    correo: '',
    contraseña: '',
    direccion: '',
    telefono: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) setFormData(user);
  }, [user]);

  const validate = () => {
    let newErrors = {};

    if (!formData.tipo.trim()) {
      newErrors.tipo = 'El tipo es obligatorio';
    }
    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es obligatorio';
    }
    if (!formData.apellido.trim()) {
      newErrors.apellido = 'El apellido es obligatorio';
    }
    if (!formData.correo.trim() || !formData.correo.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
      newErrors.correo = 'Correo inválido';
    }
    if (!formData.contraseña.trim() || formData.contraseña.length < 6) {
      newErrors.contraseña = 'La contraseña debe tener al menos 6 caracteres';
    }
    if (!formData.direccion.trim()) {
      newErrors.direccion = 'La dirección es obligatoria';
    }
    if (!formData.telefono.trim() || !formData.telefono.match(/^\d{10}$/)) {
      newErrors.telefono = 'El teléfono debe tener 10 dígitos';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!validate()) return;
    axios
      .post('https://plantify.jamadev.com/backend/EditarUsuario.php', formData)
      .then((response) => {
        if (response.data.status === 'success') {
          onSave(formData); // Actualiza el usuario en la lista
        } else {
          alert('Error: ' + response.data.message);
        }
      })
      .catch((error) => {
        alert('Error en la solicitud: ' + error.message);
      });
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {Object.keys(formData).map((field) => (
            <Form.Group controlId={`form${field}`} className="mt-3" key={field}>
              <Form.Label>{field.charAt(0).toUpperCase() + field.slice(1)}</Form.Label>
              <Form.Control
                type={field === 'contraseña' ? 'password' : 'text'}
                name={field}
                value={formData[field]}
                onChange={handleChange}
              />
              {errors[field] && <Alert variant="danger">{errors[field]}</Alert>}
            </Form.Group>
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditModal;
