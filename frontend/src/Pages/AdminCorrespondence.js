import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../App.css';
import axios from 'axios';

const AdminCorrespondence = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Example data for the rows
  const packagesData = [
    { id: 1, building: 'A', apt: '7A', type: 'letter', notified: 'Yes', contact: 973647522 },
    { id: 2, building: 'B', apt: '2B', type: 'package', notified: 'Yes', contact: 988394895 },
    { id: 3, building: 'D', apt: '19D', type: 'box', notified: 'No', contact: 988322172 },
  ];

  const handleDelete = (id) => {
    // Logic to delete the row with the specified ID
    console.log(`Delete row with ID: ${id}`);
  };

  // Redirect button for New Correspondence
  const handleButtonClick = () => {
    navigate('/newcorrespondenceform');
  };

  return (
      <div class="container">
      <h1 class="text-center mb-4">{t('adminCorrespondence.adminCorrespondence')}</h1>  
      <hr class="mb-4"/> 
      <div class="table-responsive">
      <table class="table table-striped">
      <thead>
        <tr>
        <th scope="col">{t('adminCorrespondence.id')}</th>
        <th scope="col">{t('adminCorrespondence.building')}</th>
        <th scope="col">{t('adminCorrespondence.apartment')}</th>
        <th scope="col">{t('adminCorrespondence.type')}</th>
        <th scope="col">{t('adminCorrespondence.notified')}</th>
        <th scope="col">{t('adminCorrespondence.contact')}</th>
        <th scope="col">Delete</th>
      </tr>
    </thead>
    <tbody>
      {packagesData.map((pkg) => (
        <tr key={pkg.id}>
          <td>{pkg.id}</td>
          <td>{pkg.building}</td>
          <td>{pkg.apt}</td>
          <td>{pkg.type}</td>
          <td>{pkg.notified}</td>
          <td>{pkg.contact}</td>
          <td>
            <button class="btn btn-danger btn-sm" onClick={() => handleDelete(pkg.id)}>{t('adminCorrespondence.delete')}</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  </div>
  <div class="text-center mt-4">
    <button class="btn btn-primary" onClick={handleButtonClick}>{t('adminCorrespondence.addNewCorrespondence')}</button>
  </div>
  </div>
  );
};

export default AdminCorrespondence;
