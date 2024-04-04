import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const AdminCorrespondence = () => {
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

  // Redireccion boton Nuevo Paquete
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate('/newcorrespondenceform');
  };

  return (
    <div className="admin-correspondence">
      <h1 className="centeredHeading">Admin Correspondence</h1>
      <table>
        <thead>
          <tr className="trTopPart">
            <th>Id</th>
            <th>Building</th>
            <th>Apartment</th>
            <th>Type</th>
            <th>Notified</th>
            <th>Contact</th>
            <th></th> {/* Empty space for the "Delete" button */}
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
                <button onClick={() => handleDelete(pkg.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button className="addNewCorrespondenceButton" onClick={handleButtonClick}>Add New Correspondence</button>
      </div>
    </div>
  );
};

export default AdminCorrespondence;
