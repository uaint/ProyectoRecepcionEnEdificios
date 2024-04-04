import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const AdminFrequentVisits = () => {
  // Datos de ejemplo para las filas
  const frequentVisitsData = [
    { id: 1, nombre: 'Juan', apellido: 'Pérez', rut: '12839849-1', depto: '7A', cantidadVisitas: 5 },
    { id: 2, nombre: 'María', apellido: 'González', rut: '16833339-1', depto: '12C', cantidadVisitas: 3 },
    { id: 3, nombre: 'Pedro', apellido: 'López', rut: '938549-1', depto: '9B', cantidadVisitas: 7 },
  ];

  const handleDelete = (id) => {
    // Lógica para eliminar la fila con el ID especificado
    console.log(`Eliminar fila con ID: ${id}`);
  };

  // Redireccion boton Nueva Visita
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate('/newvisitform');
  };


  return (
    <div className="admin-frequent-visits">
      <table>
        <thead>
          <tr className="trTopPart">
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Rut</th>
            <th>Depto</th>
            <th>Cantidad de visitas</th>
            <th></th> {/* Espacio vacío para el botón "Eliminar" */}
          </tr>
        </thead>
        <tbody>
          {frequentVisitsData.map((visit) => (
            <tr key={visit.id}>
              <td>{visit.nombre}</td>
              <td>{visit.apellido}</td>
              <td>{visit.rut}</td>
              <td>{visit.depto}</td>
              <td>{visit.cantidadVisitas}</td>
              <td>
                <button onClick={() => handleDelete(visit.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button className="addFrequentVisitButton" onClick={handleButtonClick}>Add Frequent Visit</button>
      </div>
    </div>
  );
};

export default AdminFrequentVisits;
