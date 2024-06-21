import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';
import { timeAlerts, formatDateLarge } from '../Utils.js';

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
  const user_role = localStorage.getItem('user_role');

  const storedTowerId = localStorage.getItem('tower_id_associated');

  // Define the API call to the vehicles
  const fetchVehicles = () => {
    fetch('https://dduhalde.online/.netlify/functions/api/parking_log')
      .then(response => response.json())
      .then(data => {
        let filteredData = data;
        if (user_role !== '1') {
          filteredData = data.filter(vehicle => vehicle.tower_parked_at == storedTowerId);
        }
        setVehicles(filteredData);
      })
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

  const handleDelete = (id) => {
    // Do the UPDATE request to the server
    fetch(`https://dduhalde.online/.netlify/functions/api/delete_vehicle_log/${id}`)
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
    navigate('/adminparking');
  };

  // Sorting and filtering functions
  const sortAndFilterVehicles = (vehicles, sortOption, filterOption) => {
    let sortedVehicles = [...vehicles];

    if (sortOption === 'log_id') {
      sortedVehicles.sort((a, b) => a.log_id - b.log_id);
    } else if (sortOption === 'full_name') {
      sortedVehicles.sort((a, b) => a.full_name.localeCompare(b.full_name));
    } else if (sortOption === 'license_plate') {
      sortedVehicles.sort((a, b) => a.license_plate.localeCompare(b.license_plate));
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
                    onClick={() => handleSort('log_id')}
                    style={{ fontWeight: sortOption === 'log_id' ? 'bold' : 'normal' }}
                  >
                    {t('adminVehicles.log_id')}
                    {sortOption === 'log_id' && (sortDirection === 'ascending' ? <span>&#9650;</span> : <span>&#9660;</span>)}
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
                    onClick={() => handleSort('license_plate')}
                    style={{ fontWeight: sortOption === 'license_plate' ? 'bold' : 'normal' }}
                  >
                    {t('adminVehicles.license_plate')}
                    {sortOption === 'license_plate' && (sortDirection === 'ascending' ? <span>&#9650;</span> : <span>&#9660;</span>)}
                  </th>
                  <th scope="col">{t('adminVehicles.parked_at')}</th>
                  <th scope="col">{t('adminVehicles.startTime')}</th>
                  <th scope="col">{t('adminVehicles.endTime')}</th>
                  {user_role === '1' && (
                    <th scope="col">{t('adminVehicles.tower')}</th>
                  )}
                  <th scope="col">{t('adminVehicles.deleteButton')}</th>
                </tr>
              </thead>
              <tbody>
                {sortedAndFilteredVehicles.map((log, index) => {
                  const parkingTimes = log.parking_time.split(" | ");
                  const startTime = parkingTimes[0];
                  const endTime = parkingTimes[1];
                  return (
                    <tr key={`${index}`}>
                      <td>{log.log_id}</td>
                      <td>{log.full_name}</td>
                      <td>{log.license_plate}</td>
                      <td>{log.parked_at}</td>
                      <td>{formatDateLarge(startTime)}</td>
                      <td>{formatDateLarge(endTime)}</td>
                      {user_role === '1' && (
                      <td>{log.tower_parked_at}</td>
                      )}
                      <td>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(log.log_id)}>
                          {t('adminVehicles.deleteVehicle')}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        {user_role == '2' && (
        <div className="text-center mt-4 mb-5">
          <button className="btn btn-primary" onClick={handleButtonClick}>{t('adminVehicles.addNewVehicles')}</button>
        </div>
        )}
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
