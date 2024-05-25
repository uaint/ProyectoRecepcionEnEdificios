import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { formatDate, formatDateLarge } from '../Utils.js';

const AdminVisits = () => {

  // General configurations
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Initiate/Create the visitors
  const [visitors, setVisitors] = useState([]);

  // Fetch visitors data from the API
  useEffect(() => {
    fetch('https://dduhalde.online/.netlify/functions/api/visitors')
      .then(response => response.json())
      .then(data => setVisitors(data))
      .catch(error => console.error('An error occurred when trying to fetch visitors:', error));
  }, []);

  const handleDelete = (id) => {
    // Do the DELETE request to the server, thus deleting a visitor given his ID
    fetch(`https://dduhalde.online/.netlify/functions/api/delete_visitor/${id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('An error occurred when trying to delete the visitor.');
      }
      console.log(`Visitor with ID ${id} deleted successfully.`);
    })
    .catch(error => {
      console.error('An error occurred when trying to delete the visitor:', error);
    });
  };

  // Button to redirect to the new visit form
  const handleButtonClick = () => {
    navigate('/newvisitform');
  };

  return (
    <div id="change" class="container">
          <h1 class="text-center mb-4">{t('adminVisits.adminVisits')}</h1>  
          <hr class="mb-4"/> 
          <div class="table-responsive">
          <table class="table table-striped table-bordered text-center">
          <thead>
            <tr>
            <th scope="col">{t('adminVisits.name')}</th>
            <th scope="col">{t('adminVisits.rut')}</th>
            <th scope="col">{t('adminVisits.birthDate')}</th>
            <th scope="col">{t('adminVisits.apartment')}</th>
            <th scope="col">{t('adminVisits.visitType')}</th>
            <th scope="col">{t('adminVisits.lastVisit')}</th>
            <th scope="col">{t('adminVisits.delete')}</th>
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
              <td>{formatDateLarge(visitor.visit_date)}</td>
              <td>
                <button class="btn btn-danger btn-sm" onClick={() => handleDelete(visitor.visitor_id)}>{t('adminVisits.delete')}</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <div class="text-center mt-4 mb-5">
        <button class="btn btn-primary" onClick={handleButtonClick}>{t('adminVisits.addVisit')}</button>
      </div>
      </div>
  );
};

export default AdminVisits;
