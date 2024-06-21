import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { formatDateLarge, timeAlerts, logToDatabase } from '../Utils.js';

// Sorting functions
const sortCorrespondence = (correspondence, config) => {
  const sorted = [...correspondence];
  if (config.key) {
    sorted.sort((a, b) => {
      let aValue = a[config.key];
      let bValue = b[config.key];

      if (config.key === 'arrival_time') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      } else if (config.key === 'apartment') {
        aValue = `${a.apartment_identifier}-${a.tower}`;
        bValue = `${b.apartment_identifier}-${b.tower}`;
      }

      if (aValue < bValue) {
        return config.direction === 'ascending' ? -1 : 1;
      }
      if (aValue > bValue) {
        return config.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  }
  return sorted;
};

export {sortCorrespondence};

const AdminCorrespondence = () => {

  // General configurations
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Create correspondence
  const [correspondence, setCorrespondence] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });

  // Read variables from sessionStorage
  const storedTowerId = localStorage.getItem('tower_id_associated');
  const storedApartmentId = localStorage.getItem('apartment_id_associated');
  const user_role = localStorage.getItem('user_role');

  // Create alerts
  const [showClaimedAlert, setShowClaimedAlert] = useState(false);
  const [showClaimedFailAlert, setShowClaimedFailAlert] = useState(false);
  const [showCorrespondenceAlert, setShowCorrespondenceAlert] = useState(false);

  // Define the API call to the unclaimed_correspondence
  const fetchCorrespondenceData = () => {
    logToDatabase('DEBUG','Fetching correspondence data','fetchCorrespondenceData');
    fetch(`https://dduhalde.online/.netlify/functions/api/unclaimed_correspondence/${storedTowerId}/${storedApartmentId}`)
      .then(response => {
        logToDatabase('INFO','API response','fetchCorrespondenceData');
        return response.json();
      })
      .then(data => {
        logToDatabase('INFO','Correspondence data received','fetchCorrespondenceData');
        setCorrespondence(data[0]);
      })
      .catch(error => {
        logToDatabase('ERROR','An error occurred when fetching the correspondence','fetchCorrespondenceData');
        setShowCorrespondenceAlert(true);
        timeAlerts(() => setShowCorrespondenceAlert(false));
      });
  };

  // Fetch unclaimed correspondence data through the API
  useEffect(() => {
    fetchCorrespondenceData();
  }, []);

  const handleMarkClaimed = (id) => {
    logToDatabase('DEBUG',`Attempting to update correspondence status for ID: ${id}`,'handleMarkClaimed');
    // Do the UPDATE request to the server (channge from "unclaimed/not claimed" to "claimed")
    fetch(`https://dduhalde.online/.netlify/functions/api/is_claimed/${id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('An error occurred when trying to update the correspondence status.');
      }
      logToDatabase('INFO',`Correspondence status updated successfully for ID: ${id}`,'handleMarkClaimed');
      setShowClaimedAlert(true);
      timeAlerts(() => setShowClaimedAlert(false));
      fetchCorrespondenceData();
    })
    .catch(error => {
      logToDatabase('ERROR',`An error occurred when updating the correspondence status`,'handleMarkClaimed');
      setShowClaimedFailAlert(true);
      timeAlerts(() => setShowClaimedFailAlert(false));
    });
  };

  // Button to redirect to the add new correspondence form
  const handleButtonClick = () => {
    navigate('/newcorrespondenceform');
  };

  // Button to redirect to all correspondence
  const ButtonClick = () => {
    navigate('/allcorrespondence');
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedCorrespondence = sortCorrespondence(correspondence, sortConfig);

  const getSortIndicator = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'ascending' ? ' ▲' : ' ▼';
    }
    return '';
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
                <th 
                  scope="col" 
                  onClick={() => handleSort('id')}
                  style={{ fontWeight: sortConfig.key === 'id' ? 'bold' : 'normal' }}
                >
                  {t('adminCorrespondence.id')}{getSortIndicator('id')}
                </th>
                <th 
                  scope="col" 
                  onClick={() => handleSort('apartment')}
                  style={{ fontWeight: sortConfig.key === 'apartment' ? 'bold' : 'normal' }}
                >
                  {t('adminCorrespondence.apartment')}{getSortIndicator('apartment')}
                </th>
                <th 
                  scope="col" 
                  onClick={() => handleSort('mail_type')}
                  style={{ fontWeight: sortConfig.key === 'mail_type' ? 'bold' : 'normal' }}
                >
                  {t('adminCorrespondence.type')}{getSortIndicator('mail_type')}
                </th>
                <th 
                  scope="col" 
                  onClick={() => handleSort('arrival_time')}
                  style={{ fontWeight: sortConfig.key === 'arrival_time' ? 'bold' : 'normal' }}
                >
                  {t('adminCorrespondence.date')}{getSortIndicator('arrival_time')}
                </th>
                <th 
                  scope="col" 
                  onClick={() => handleSort('is_notified')}
                  style={{ fontWeight: sortConfig.key === 'is_notified' ? 'bold' : 'normal' }}
                >
                  {t('adminCorrespondence.notified')}{getSortIndicator('is_notified')}
                </th>
                {user_role !== '3' && (
                <th scope="col">{t('adminCorrespondence.claimed')}</th>
                )}
              </tr>
            </thead>
            <tbody>
              {sortedCorrespondence.map((pkg, index) => (
              <tr key={index + 1}>
                <td>{pkg.id}</td>
                <td>{pkg.apartment_identifier}-{pkg.tower}</td>
                <td>{pkg.mail_type}</td>
                <td >{formatDateLarge(pkg.arrival_time)}</td>
                <td>{pkg.is_notified === 1 ? <span>&#10004;</span> : <span>&#10060;</span>}</td>
                {user_role !== '3' && (
                <td>
                  <button className="btn btn-success btn-sm" onClick={() => handleMarkClaimed(pkg.id)}>{t('adminCorrespondence.claimed')}</button>
                </td>
                )}
              </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="text-center mt-0 pt-0">
        <a className="link-secondary link-underline-opacity-25 link-underline-opacity-100-hover" style = {{cursor: 'pointer'}} onClick={ButtonClick}>{t('adminCorrespondence.allCorrespondence')}</a>
      </div>
      {user_role !== '3' && (
      <div className="text-center mt-4 mb-5">
        <button className="btn btn-primary" onClick={handleButtonClick}>{t('adminCorrespondence.addNewCorrespondence')}</button>
      </div>
      )}
      <div className='row'>
        <div className='col-md-3 order-md-3 rounded-5'>
          {showClaimedAlert && (
          <div className="alert alert-success text-center position-fixed top-0 end-0 m-3" role="alert" style={{ zIndex: "9999" }}>
            &#10004; {t('adminCorrespondence.claimedSuccessAlert')}
          </div>
          )}
          {showClaimedFailAlert && (
          <div className="alert alert-danger text-center position-fixed top-0 end-0 m-3" role="alert" style={{ zIndex: "9999" }}>
            &#10060; {t('adminCorrespondence.claimedFailAlert')}
          </div>
          )}
          {showCorrespondenceAlert && (
          <div className="alert alert-danger text-center position-fixed top-0 end-0 m-3" role="alert" style={{ zIndex: "9999" }}>
            &#10060; {t('adminCorrespondence.generalFailAlert')}
          </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminCorrespondence;
