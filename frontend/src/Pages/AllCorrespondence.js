import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { useTranslation } from 'react-i18next';
import { formatDateLarge } from '../Utils.js';

const AllCorrespondence = () => {

  // General configurations
  const { t } = useTranslation();

  // Create correspondence
  const [correspondence, setCorrespondence] = useState([]);

  // Define the API call to the unclaimed_correspondence
  const fetchCorrespondenceData = () => {
    fetch('https://dduhalde.online/.netlify/functions/api/correspondence')
      .then(response => response.json())
      .then(data => setCorrespondence(data))
      .catch(error => {
        console.error('An error occurred when fetching the correspondence:', error);
      });
  };

  // Fetch unclaimed correspondence data through the API
  useEffect(() => {
    fetchCorrespondenceData();
  }, []);

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
                <td>{pkg.is_claimed === 1 ? <span>&#10004;</span> : <span>&#10060;</span>}</td>
              </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    
  );
};

export default AllCorrespondence;