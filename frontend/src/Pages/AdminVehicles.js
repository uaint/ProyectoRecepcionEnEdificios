import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';
import { formatDateLarge, timeAlerts } from '../Utils.js';

const AdminVehicles = () => {

  // General configurations
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Create vehicles
  const [vehicles, setVehicles] = useState([]);

  // Create alerts
  const [showVehicleAlert, setShowVehicleAlert] = useState(false);
  const [showVehiclesFailAlert, setShowVehiclesFailAlert] = useState(false);
  const [setVehiclesAlert, setShowVehicles] = useState(false);

  // Define the API call to the vehicles
  const fetchVehicles = () => {
    fetch('https://dduhalde.online/.netlify/functions/api/vehicles')
      .then(response => response.json())
      .then(data =>setVehicles(data))
      .catch(error => {
        console.error('An error occurred when fetching the vehicles:', error);
        setShowVehicles(true);
        timeAlerts(() => setShowVehicles(false));
      });
  };

  // Fetch all vehicles data through the API
  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleDelete = (plate) => {
    // Do the UPDATE request to the server
    fetch(`https://dduhalde.online/.netlify/functions/api/delete_vehicle/${plate}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('An error occurred when trying to update the vehicles');
      }
      setShowVehicleAlert(true);
      timeAlerts(() => setShowVehicleAlert(false));
      fetchVehicles();
    })
    .catch(error => {
      setShowVehiclesFailAlert(true);
      timeAlerts(() => setShowVehiclesFailAlert(false));
    });
  };

  // Button to redirect to the add new correspondence form
  const handleButtonClick = () => {
    navigate('/newvehicleform');
  };

  // Button to redirect to all vehicles
  const ButtonClick = () => {
    navigate('/adminvehicles');
  };

  return (
    <div id="change" className="container">
      <h1 className="text-center mb-4">{t('adminVehicles.adminVehiclesTitle')}</h1>
      <hr className="mb-4"/>
      <div>
        <div className="table-responsive">
        <table className="table table-striped table-bordered text-center">
            <thead>
                <tr>
                <th scope="col">{t('adminVehicles.visitor_id')}</th>
                <th scope="col">{t('adminVehicles.full_name')}</th>
                <th scope="col">{t('adminVehicles.license_plate')}</th>
                <th scope="col">{t('adminVehicles.deleteButton')}</th>
                </tr>
            </thead>
            <tbody>
                {vehicles.map((vehicle, index) => {
                const { visitor_id, full_name, license_plates } = vehicle;
                const platesArray = license_plates.split(',').map(plate => plate.trim());

                return platesArray.map((plate, plateIndex) => (
                    <tr key={`${index}-${plateIndex}`}>
                    <td>{visitor_id}</td>
                    <td>{full_name}</td>
                    <td>{plate}</td>
                    <td>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(plate)}>
                        {t('adminVehicles.deleteVehicle')}
                        </button>
                    </td>
                    </tr>
                ));
                })}
            </tbody>
            </table>

        </div>
      </div>
      <div className="text-center mt-4 mb-5">
        <button className="btn btn-primary" onClick={handleButtonClick}>{t('adminVehicles.addNewVehicles')}</button>
      </div>
      <div className='row'>
        <div className='col-md-3 order-md-3 rounded-5'>
          {showVehicleAlert && (
          <div className="alert alert-success text-center position-fixed top-0 end-0 m-3" role="alert" style={{ zIndex: "9999" }}>
            &#10004; {t('adminVehicles.SuccessAlert')}
          </div>
          )}
          {showVehiclesFailAlert && (
          <div className="alert alert-danger text-center position-fixed top-0 end-0 m-3" role="alert" style={{ zIndex: "9999" }}>
            &#9888; {t('adminVehicles.FailAlert')}
          </div>
          )}
          {setVehiclesAlert && (
          <div className="alert alert-danger text-center position-fixed top-0 end-0 m-3" role="alert" style={{ zIndex: "9999" }}>
            &#9888; {t('adminVehicles.vehiclesAlert')}
          </div>
          )}
        </div>
      </div>
    </div>
    
  );
};

export default AdminVehicles;