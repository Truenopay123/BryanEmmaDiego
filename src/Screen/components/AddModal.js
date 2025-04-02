import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';

function AddModal({ show, onClose, onSave }) {
  const [formData, setFormData] = useState({
    tipo: '',
    nombre: '',
    apellido: '',
    correo: '',
    contraseña: '',
    direccion: '',
    telefono: '',
  });

  const [errors, setErrors] = useState({});

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
    onSave(formData);
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Usuario</Modal.Title>
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
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddModal;
