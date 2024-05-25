import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { formatDate } from '../Utils.js';

const AdminParkingOld = () => {

  // General configurations
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Initiate/Create parked vehicles
  const [parking, setParking] = useState([]);

  // Fetch visitors data through the API
  useEffect(() => {
    fetch('https://dduhalde.online/.netlify/functions/api/parked')
      .then(response => response.json())
      .then(data => setParking(data))
      .catch(error => console.error('An error occurred trying to fetch visitors:', error));
  }, []);

  const handleDelete = (plate) => {
    // Do the DELETE request to the server, thus deleting the vehicle according to the license plate
    fetch(`https://dduhalde.online/.netlify/functions/api/delete_vehicle/${plate}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('An error occurred trying to delete the vehicle.');
      }
      console.log(`Vehicle under the license plate ${plate} deleted successfully.`);
    })
    .catch(error => {
      console.error('An error occurred trying to delete the vehicle:', error);
    });
  };

  // Button to redirect to the new vehicle form
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
                  <button class="btn btn-danger btn-sm" onClick={() => handleDelete(park.license_plate)}>{t('adminVisits.delete')}</button>
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

export default AdminParkingOld;
