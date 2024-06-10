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
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [searchTerm, setSearchTerm] = useState('');

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

  // Sorting functions
  const sortVisitors = (visitors, config) => {
    const sorted = [...visitors];
    if (config.key) {
      sorted.sort((a, b) => {
        let aValue = a[config.key];
        let bValue = b[config.key];

        if (config.key === 'birth_date' || config.key === 'visit_date') {
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

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedVisitors = sortVisitors(visitors, sortConfig).filter((visitor) =>
    visitor.full_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSortIndicator = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'ascending' ? ' ▲' : ' ▼';
    }
    return '';
  };

  return (
    <div id="change" className="container">
      <h1 className="text-center mb-4">{t('adminVisits.adminVisits')}</h1>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder={t('adminVisits.searchPlaceholder')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <hr className="mb-4" />
      <div className="table-responsive">
        <table className="table table-striped table-bordered text-center">
          <thead>
            <tr>
              <th 
                scope="col" 
                onClick={() => handleSort('full_name')}
                style={{ fontWeight: sortConfig.key === 'full_name' ? 'bold' : 'normal' }}
              >
                {t('adminVisits.name')}{getSortIndicator('full_name')}
              </th>
              <th 
                scope="col" 
                onClick={() => handleSort('run')}
                style={{ fontWeight: sortConfig.key === 'run' ? 'bold' : 'normal' }}
              >
                {t('adminVisits.rut')}{getSortIndicator('run')}
              </th>
              <th 
                scope="col" 
                onClick={() => handleSort('birth_date')}
                style={{ fontWeight: sortConfig.key === 'birth_date' ? 'bold' : 'normal' }}
              >
                {t('adminVisits.birthDate')}{getSortIndicator('birth_date')}
              </th>
              <th 
                scope="col" 
                onClick={() => handleSort('apartment')}
                style={{ fontWeight: sortConfig.key === 'apartment' ? 'bold' : 'normal' }}
              >
                {t('adminVisits.apartment')}{getSortIndicator('apartment')}
              </th>
              <th 
                scope="col" 
                onClick={() => handleSort('visit_motive')}
                style={{ fontWeight: sortConfig.key === 'visit_motive' ? 'bold' : 'normal' }}
              >
                {t('adminVisits.visitType')}{getSortIndicator('visit_motive')}
              </th>
              <th 
                scope="col" 
                onClick={() => handleSort('visit_date')}
                style={{ fontWeight: sortConfig.key === 'visit_date' ? 'bold' : 'normal' }}
              >
                {t('adminVisits.lastVisit')}{getSortIndicator('visit_date')}
              </th>
              {user_role !== '3' && (
                <th scope="col">{t('adminVisits.delete')}</th>
              )}
            </tr>
          </thead>
          <tbody>
            {sortedVisitors.map((visitor) => (
              <tr key={visitor.log_id}>
                <td>{visitor.full_name}</td>
                <td>{visitor.run}</td>
                <td>{formatDate(visitor.birth_date)}</td>
                <td>{visitor.apartment_identifier}-{visitor.tower}</td>
               
                <td>{visitor.visit_motive}</td>
              <td>{formatDateLarge(visitor.visit_date)}</td>
              {user_role !== '3' && (
                <td>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(visitor.log_id)}>{t('adminVisits.delete')}</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {user_role !== '3' && (
      <div className="text-center mt-4 mb-5">
        <button className="btn btn-primary" onClick={handleButtonClick}>{t('adminVisits.addVisit')}</button>
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
