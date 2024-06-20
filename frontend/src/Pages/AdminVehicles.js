import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';
import { timeAlerts } from '../Utils.js';

const AdminVehicles = () => {
  // General configurations
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Create vehicles
  const [vehicles, setVehicles] = useState([]);
  const [sortOption, setSortOption] = useState('');
  const [filterOption, setFilterOption] = useState('');
  const [sortDirection, setSortDirection] = useState('ascending');

  // Create alerts
  const [showVehicleAlert, setShowVehicleAlert] = useState(false);
  const [showVehiclesFailAlert, setShowVehiclesFailAlert] = useState(false);

  // Get user role from sessionStorage
  const user_role = sessionStorage.getItem('user_role');

  // Define the API call to the vehicles
  const fetchVehicles = () => {
    fetch('https://dduhalde.online/.netlify/functions/api/vehicles')
      .then(response => response.json())
      .then(data => setVehicles(data))
      .catch(error => {
        console.error('An error occurred while trying to fetch the vehicles:', error);
        setShowVehiclesFailAlert(true);
        timeAlerts(() => setShowVehiclesFailAlert(false));
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
        throw new Error('An error occurred when trying to delete the vehicle.');
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

  // Sorting and filtering functions
  const sortAndFilterVehicles = (vehicles, sortOption, filterOption) => {
    let sortedVehicles = [...vehicles];

    if (sortOption === 'visitor_id') {
      sortedVehicles.sort((a, b) => a.visitor_id - b.visitor_id);
    } else if (sortOption === 'full_name') {
      sortedVehicles.sort((a, b) => a.full_name.localeCompare(b.full_name));
    } else if (sortOption === 'license_plates') {
      sortedVehicles.sort((a, b) => a.license_plates.localeCompare(b.license_plates));
    }

    if (sortDirection === 'descending') {
      sortedVehicles.reverse();
    }

    if (filterOption) {
      sortedVehicles = sortedVehicles.filter(vehicle => vehicle.full_name.toLowerCase().includes(filterOption.toLowerCase()));
    }

    return sortedVehicles;
  };

  const sortedAndFilteredVehicles = sortAndFilterVehicles(vehicles, sortOption, filterOption);

  const handleSort = (key) => {
    if (sortOption === key) {
      setSortDirection(sortDirection === 'ascending' ? 'descending' : 'ascending');
    } else {
      setSortOption(key);
      setSortDirection('ascending');
    }
  };

  return (
    <div id="change" className="container">
      {user_role !== '3' && (
      <div>
        <h1 className="text-center mb-4">{t('adminVehicles.adminVehiclesTitle')}</h1>
        <hr className="mb-4" />
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder={t('adminVehicles.searchPlaceholder')}
            value={filterOption}
            onChange={(e) => setFilterOption(e.target.value)}
          />
        </div>
        <div>
          <div className="table-responsive">
            <table className="table table-striped table-bordered text-center">
              <thead>
                <tr>
                  <th 
                    scope="col" 
                    onClick={() => handleSort('visitor_id')}
                    style={{ fontWeight: sortOption === 'visitor_id' ? 'bold' : 'normal' }}
                  >
                    {t('adminVehicles.visitor_id')}
                    {sortOption === 'visitor_id' && (sortDirection === 'ascending' ? <span>&#9650;</span> : <span>&#9660;</span>)}
                  </th>
                  <th 
                    scope="col" 
                    onClick={() => handleSort('full_name')}
                    style={{ fontWeight: sortOption === 'full_name' ? 'bold' : 'normal' }}
                  >
                    {t('adminVehicles.full_name')}
                    {sortOption === 'full_name' && (sortDirection === 'ascending' ? <span>&#9650;</span> : <span>&#9660;</span>)}
                  </th>
                  <th 
                    scope="col" 
                    onClick={() => handleSort('license_plates')}
                    style={{ fontWeight: sortOption === 'license_plates' ? 'bold' : 'normal' }}
                  >
                    {t('adminVehicles.license_plate')}
                    {sortOption === 'license_plates' && (sortDirection === 'ascending' ? <span>&#9650;</span> : <span>&#9660;</span>)}
                  </th>
                  <th scope="col">{t('adminVehicles.deleteButton')}</th>
                </tr>
              </thead>
              <tbody>
                {sortedAndFilteredVehicles.map((vehicle, index) => {
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
              <div className="alert
              alert-success text-center position-fixed top-0 end-0 m-3" role="alert" style={{ zIndex: "9999" }}>
              &#10004; {t('adminVehicles.SuccessAlert')}
            </div>
          )}
          {showVehiclesFailAlert && (
            <div className="alert alert-danger text-center position-fixed top-0 end-0 m-3" role="alert" style={{ zIndex: "9999" }}>
              &#9888; {t('adminVehicles.FailAlert')}
            </div>
          )}
        </div>
      </div>
    </div>
    )}
  </div>
);
};

export default AdminVehicles;
