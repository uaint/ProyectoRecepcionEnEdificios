import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { formatDate } from '../Utils.js';

const AdminFrequentVisits = () => {

  // Configuraciones generales
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Se inician los visitantes
  const [visitors, setVisitors] = useState([]);

  // Conseguir datos de visitas con la API
  useEffect(() => {
    fetch('https://dduhalde.online/.netlify/functions/api/visitors')
      .then(response => response.json())
      .then(data => setVisitors(data))
      .catch(error => console.error('Error fetching visitors:', error));
  }, []);

  const handleDelete = (id) => {
    // Realizar la solicitud DELETE al servidor, para eliminar un visitante con su id
    fetch(`https://dduhalde.online/.netlify/functions/api/delete_visitor/${id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al eliminar el visitante');
      }
      console.log(`Visitante con ID ${id} eliminado correctamente`);
    })
    .catch(error => {
      console.error('Error al eliminar el visitante:', error);
    });
  };

  // Boton para redireccionar a agregar nueva visita
  const handleButtonClick = () => {
    navigate('/newvisitform');
  };

  return (
    <div id="change" class="container">
          <h1 class="text-center mb-4">{t('adminFrequentVisits.adminFrequentVisits')}</h1>  
          <hr class="mb-4"/> 
          <div class="table-responsive">
          <table class="table table-striped table-bordered text-center">
          <thead>
            <tr>
            <th scope="col">{t('adminFrequentVisits.name')}</th>
            <th scope="col">{t('adminFrequentVisits.rut')}</th>
            <th scope="col">{t('adminFrequentVisits.birthDate')}</th>
            <th scope="col">{t('adminFrequentVisits.apartment')}</th>
            <th scope="col">{t('adminFrequentVisits.visitType')}</th>
            <th scope="col">{t('adminFrequentVisits.lastVisit')}</th>
            <th scope="col">{t('adminFrequentVisits.delete')}</th>
          </tr>
        </thead>
        <tbody>
          {visitors.map((visitor) => (
            <tr key={visitor.visitor_id}>
              <td>{visitor.full_name}</td>
              <td>{visitor.run}</td>
              <td>{formatDate(visitor.birth_date)}</td>
              <td>{visitor.unit_apartment_visited}</td>
              <td>{visitor.visit_type}</td>
              <td>{formatDate(visitor.last_visit)}</td>
              <td>
                <button class="btn btn-danger btn-sm" onClick={() => handleDelete(visitor.visitor_id)}>{t('adminFrequentVisits.delete')}</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <div class="text-center mt-4 mb-5">
        <button class="btn btn-primary" onClick={handleButtonClick}>{t('adminFrequentVisits.addFrequentVisit')}</button>
      </div>
      </div>
  );
};

export default AdminFrequentVisits;
