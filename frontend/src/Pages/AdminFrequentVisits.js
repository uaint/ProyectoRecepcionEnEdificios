import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const AdminFrequentVisits = () => {
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
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate('/newvisitform');
  };

  return (
    <div className="admin-frequent-visits">
      <h1 className="centeredHeading">Admin Frequent Visits</h1>
      <table>
        <thead>
          <tr className="trTopPart">
            <th>Name</th>
            <th>Last Name</th>
            <th>RUT</th>
            <th>Apartment</th>
            <th>Visit Count</th>
            <th></th> {/* Empty space for the "Delete" button */}
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
                <button onClick={() => handleDelete(visit.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button className="addFrequentVisitButton" onClick={handleButtonClick}>Add Frequent Visit</button>
      </div>
    </div>
  );
};

export default AdminFrequentVisits;
