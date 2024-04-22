import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Funcion para formatear la fecha
function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  return date.toLocaleDateString('es-ES', options);
}

const AdminParking = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [parking, setParking] = useState([]);

  // Conseguir datos de visitas con la API
  useEffect(() => {
    fetch('https://dduhalde.online/.netlify/functions/api/parked')
      .then(response => response.json())
      .then(data => setParking(data))
      .catch(error => console.error('Error fetching visitors:', error));
  }, []);

  const handleDelete = (id) => {
    // Realizar la solicitud DELETE al servidor
    fetch(``)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al eliminar el auto');
      }
      console.log(`Visitante con ID ${id} eliminado correctamente`);
    })
    .catch(error => {
      console.error('Error al eliminar el visitante:', error);
    });
  };

    // Redirect button for newVehicleForm
  const handleButtonClick = () => {
      navigate('/newVehicleForm');
  };

  return (
    <div id="change" class="container">
          <h1 class="text-center mb-4">{t('adminParking.adminParking')}</h1>  
          <hr class="mb-4"/> 
          <div class="table-responsive">
          <table class="table table-striped table-bordered text-center">
          <thead>
            <tr>
            <th scope="col">{t('adminParking.visitorId')}</th>
            <th scope="col">{t('adminParking.full_name')}</th>
            <th scope="col">{t('adminParking.licensePlate')}</th>
            <th scope="col">{t('adminParking.parket_at')}</th>
            <th scope="col">{t('adminParking.arrivingTime')}</th>
            <th scope="col">{t('adminParking.delete')}</th>
          </tr>
        </thead>
        <tbody>
          {parking.map((park) => (
            <tr key={park.visitor_id}>
              <td>{park.visitor_id}</td>
              <td>{park.full_name}</td>
              <td>{park.license_plate}</td>
              <td>{park.parked_at}</td>
              <td>{formatDate(park.parked_since)}</td>
              <td>
                <button class="btn btn-danger btn-sm" onClick={() => handleDelete(park.visitor_id)}>{t('adminFrequentVisits.delete')}</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <div class="text-center mt-4 mb-5">
        <button class="btn btn-primary" onClick={handleButtonClick}>{t('adminParking.addParked')}</button>
      </div>
      </div>
  );
};

export default AdminParking;
