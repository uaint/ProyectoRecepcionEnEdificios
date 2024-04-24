import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

// Funcion para formatear la fecha
function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { 
    year: 'numeric', 
    month: 'numeric', 
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  };
  // Se ajusta para que se vea más estetica
  return date.toLocaleDateString('es-ES', options);
}

const AdminCorrespondence = () => {

  // Configuraciones generales
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Creamos la correspondencia
  const [correspondence, setCorrespondence] = useState([]);

  // Conseguir datos de correspondencia no reclamada con la API
  useEffect(() => {
    fetch('https://dduhalde.online/.netlify/functions/api/unclaimed_correspondence')
      .then(response => response.json())
      .then(data => setCorrespondence(data))
      .catch(error => console.error('Error fetching correspondence:', error));
  }, []);

  const handleDelete = (id) => {
    // Realizar la solicitud UPDATE al servidor, para cambiar de "no reclamada" a "reclamada"
    fetch(`https://dduhalde.online/.netlify/functions/api/is_claimed/${id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al actualizar estado');
      }
      console.log(`Estado de ID ${id} actualizado`);
    })
    .catch(error => {
      console.error('Error al actualizar estado:', error);
    });
  };

  // Boton para redireccion a agregar nueva correspondencia
  const handleButtonClick = () => {
    navigate('/newcorrespondenceform');
  };

  return (
    <div id="change" className="container">
      <h1 className="text-center mb-4">{t('adminCorrespondence.adminCorrespondence')}</h1>
      <hr className="mb-4"/>
      <div>
        <div className="table-responsive">
          <table className="table table-striped table-bordered text-center">
            <thead>
              <tr>
                <th scope="col">{t('adminCorrespondence.id')}</th>
                <th scope="col">{t('adminCorrespondence.apartment')}</th>
                <th scope="col">{t('adminCorrespondence.type')}</th>
                <th scope="col">{t('adminCorrespondence.date')}</th>
                <th scope="col">{t('adminCorrespondence.notified')}</th>
                <th scope="col">{t('adminCorrespondence.claimed')}</th>
              </tr>
            </thead>
            <tbody>
              {correspondence.map((pkg, index) => (
              <tr key={index + 1}>
                <td>{pkg.id}</td>
                <td>{pkg.housing_unit_apartment}</td>
                <td>{pkg.mail_type}</td>
                <td >{formatDate(pkg.arrival_time)}</td>
                <td>{pkg.is_notified === 1 ? <span>&#10004;</span> : <span>&#10060;</span>}</td>
                <td>
                  <button className="btn btn-success btn-sm" onClick={() => handleDelete(pkg.id)}>{t('adminCorrespondence.claimed')}</button>
                </td>
              </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="text-center mt-4 mb-5">
        <button className="btn btn-primary" onClick={handleButtonClick}>{t('adminCorrespondence.addNewCorrespondence')}</button>
      </div>
    </div>
  );
};

export default AdminCorrespondence;
