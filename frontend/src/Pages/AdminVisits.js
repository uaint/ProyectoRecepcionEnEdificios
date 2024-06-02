import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { formatDate, formatDateLarge, timeAlerts } from '../Utils.js';

const AdminVisits = () => {

  // General configurations
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Initiate/Create the visitors
  const [visitors, setVisitors] = useState([]);

  // Read variables from sessionStorage
  const storedTowerId = sessionStorage.getItem('tower_id_associated');
  const storedApartmentId = sessionStorage.getItem('apartment_id_associated');
  const user_role = sessionStorage.getItem('user_role');

  // Fetch unclaimed correspondence data through the API
  useEffect(() => {
    fetchVisitData();
  }, []);

  // Fetch visitors data from the API
  const fetchVisitData = () => {
    fetch(`https://dduhalde.online/.netlify/functions/api/visitors/${storedTowerId}/${storedApartmentId}`)
      .then(response => response.json())
      .then(data => setVisitors(data[0]))
      .catch(error => {
        console.error('An error occurred when trying to fetch visitors:', error);
        setShowVisitAlert(true);
        timeAlerts(() => setShowVisitAlert(false));
      });
  }

  // Create alerts
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showDeleteFailAlert, setShowDeleteFailAlert] = useState(false);
  const [showVisitAlert, setShowVisitAlert] = useState(false);

  const handleDelete = (id) => {
    // Do the DELETE request to the server, thus deleting a visitor given his ID
    fetch(`https://dduhalde.online/.netlify/functions/api/delete_visit/${id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('An error occurred when trying to delete the visitor.');
      }
      setShowDeleteAlert(true);
      timeAlerts(() => setShowDeleteAlert(false));
      fetchVisitData();
    })
    .catch(error => {
      setShowDeleteFailAlert(true);
      timeAlerts(() => setShowDeleteFailAlert(false));
    });
  };

  // Button to redirect to the new visit form
  const handleButtonClick = () => {
    navigate('/scanid');
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
            {user_role !== '3' && (
            <th scope="col">{t('adminVisits.delete')}</th>
            )}
          </tr>
        </thead>
        <tbody>
          {visitors.map((visitor) => (
            <tr key={visitor.log_id}>
              <td>{visitor.full_name}</td>
              <td>{visitor.run}</td>
              <td>{formatDate(visitor.birth_date)}</td>
              <td>{visitor.apartment_identifier}-{visitor.tower}</td>
              <td>{visitor.visit_motive}</td>
              <td>{formatDateLarge(visitor.visit_date)}</td>
              {user_role !== '3' && (
              <td>
                <button class="btn btn-danger btn-sm" onClick={() => handleDelete(visitor.log_id)}>{t('adminVisits.delete')}</button>
              </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      {user_role !== '3' && (
      <div class="text-center mt-4 mb-5">
        <button class="btn btn-primary" onClick={handleButtonClick}>{t('adminVisits.addVisit')}</button>
      </div>
      )}
      <div className='row'>
        <div className='col-md-3 order-md-3 rounded-5'>
          {showDeleteAlert && (
          <div className="alert alert-success text-center position-fixed top-0 end-0 m-3" role="alert" style={{ zIndex: "9999" }}>
            &#10004; {t('adminVisits.deleteSuccessAlert')}
          </div>
          )}
          {showDeleteFailAlert && (
          <div className="alert alert-danger text-center position-fixed top-0 end-0 m-3" role="alert" style={{ zIndex: "9999" }}>
            &#9888; {t('adminVisits.deleteFailAlert')}
          </div>
          )}
          {showVisitAlert && (
          <div className="alert alert-danger text-center position-fixed top-0 end-0 m-3" role="alert" style={{ zIndex: "9999" }}>
            &#9888; {t('adminVisits.visitAlert')}
          </div>
          )}
        </div>
      </div>
      </div>
  );
};

export default AdminVisits;
