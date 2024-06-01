import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { formatDateLarge, timeAlerts, logToDatabase } from '../Utils.js';

const AdminCorrespondence = () => {

  // General configurations
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Create correspondence
  const [correspondence, setCorrespondence] = useState([]);

  // Create alerts
  const [showClaimedAlert, setShowClaimedAlert] = useState(false);
  const [showClaimedFailAlert, setShowClaimedFailAlert] = useState(false);
  const [showCorrespondenceAlert, setShowCorrespondenceAlert] = useState(false);

  // Define the API call to the unclaimed_correspondence
  const fetchCorrespondenceData = () => {
    logToDatabase('DEBUG','Fetching correspondence data','fetchCorrespondenceData');
    fetch('https://dduhalde.online/.netlify/functions/api/unclaimed_correspondence')
      .then(response => {
        logToDatabase('INFO','API response','fetchCorrespondenceData');
        return response.json();
      })
      .then(data => {
        logToDatabase('INFO','Correspondence data received','fetchCorrespondenceData');
        setCorrespondence(data);
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
                <td>{pkg.recipient}</td>
                <td>{pkg.mail_type}</td>
                <td >{formatDateLarge(pkg.arrival_time)}</td>
                <td>{pkg.is_notified === 1 ? <span>&#10004;</span> : <span>&#10060;</span>}</td>
                <td>
                  <button className="btn btn-success btn-sm" onClick={() => handleMarkClaimed(pkg.id)}>{t('adminCorrespondence.claimed')}</button>
                </td>
              </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="text-center mt-0 pt-0">
        <a className="link-secondary link-underline-opacity-25 link-underline-opacity-100-hover" style = {{cursor: 'pointer'}} onClick={ButtonClick}>{t('adminCorrespondence.allCorrespondence')}</a>
      </div>
      <div className="text-center mt-4 mb-5">
        <button className="btn btn-primary" onClick={handleButtonClick}>{t('adminCorrespondence.addNewCorrespondence')}</button>
      </div>
      <div className='row'>
        <div className='col-md-3 order-md-3 rounded-5'>
          {showClaimedAlert && (
          <div className="alert alert-success text-center position-fixed top-0 end-0 m-3" role="alert" style={{ zIndex: "9999" }}>
            &#10004; {t('adminCorrespondence.calimedSuccessAlert')}
          </div>
          )}
          {showClaimedFailAlert && (
          <div className="alert alert-danger text-center position-fixed top-0 end-0 m-3" role="alert" style={{ zIndex: "9999" }}>
            &#9888; {t('adminCorrespondence.calimedFailAlert')}
          </div>
          )}
          {showCorrespondenceAlert && (
          <div className="alert alert-danger text-center position-fixed top-0 end-0 m-3" role="alert" style={{ zIndex: "9999" }}>
            &#9888; {t('adminCorrespondence.correspondenceAlert')}
          </div>
          )}
        </div>
      </div>
    </div>
    
  );
};

export default AdminCorrespondence;