import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminFrequentVisits = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Sample data for rows
  const frequentVisitsData = [
    { id: 1, name: 'John', lastName: 'Doe', rut: '12839849-1', dept: '7A', visitCount: 5 },
    { id: 2, name: 'Mary', lastName: 'Gonzalez', rut: '16833339-1', dept: '12C', visitCount: 3 },
    { id: 3, name: 'Peter', lastName: 'Lopez', rut: '938549-1', dept: '9B', visitCount: 7 },
  ];

  const handleDelete = (id) => {
    // Logic to delete the row with the specified ID
    console.log(`Delete row with ID: ${id}`);
  };

  // Redirect button for New Visit
  const handleButtonClick = () => {
    navigate('/newvisitform');
  };

  return (
    <div class="container">
          <h1 class="text-center mb-4">{t('adminFrequentVisits.adminFrequentVisits')}</h1>  
          <hr class="mb-4"/> 
          <div class="table-responsive">
          <table class="table table-striped">
          <thead>
            <tr>
            <th scope="col">{t('adminFrequentVisits.name')}</th>
            <th scope="col">{t('adminFrequentVisits.lastName')}</th>
            <th scope="col">{t('adminFrequentVisits.rut')}</th>
            <th scope="col">{t('adminFrequentVisits.apartment')}</th>
            <th scope="col">{t('adminFrequentVisits.visitCount')}</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {frequentVisitsData.map((visit) => (
            <tr key={visit.id}>
              <td>{visit.name}</td>
              <td>{visit.lastName}</td>
              <td>{visit.rut}</td>
              <td>{visit.dept}</td>
              <td>{visit.visitCount}</td>
              <td>
                <button class="btn btn-danger btn-sm" onClick={() => handleDelete(visit.id)}>{t('adminFrequentVisits.delete')}</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <div class="text-center mt-4">
        <button class="btn btn-primary" onClick={handleButtonClick}>{t('adminFrequentVisits.addFrequentVisit')}</button>
      </div>
      </div>
  );
};

export default AdminFrequentVisits;
