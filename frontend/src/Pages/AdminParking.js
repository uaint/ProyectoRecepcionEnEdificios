import React from 'react';
import '../App.css';

const AdminParking = () => {
  // Datos de ejemplo para las filas de la tabla
  const parkingData = [
    { id: 1, parking: 'A1', status: 'Occupied', licensePlate: 'ABC123', apartment: '7A', arrivingTime: '10:00 AM' },
    { id: 2, parking: 'B2', status: 'Available', licensePlate: '-', apartment: '-', arrivingTime: '-' },
    { id: 3, parking: 'C3', status: 'Occupied', licensePlate: 'DEF456', apartment: '12C', arrivingTime: '11:30 AM' },
  ];

  const handleModifyParkingSpot = () => {
    // Lógica para modificar el lugar de estacionamiento
    console.log('Modify Parking Spot clicked');
  };

  return (
    <div className="admin-parking">
      <h1>Admin Parking</h1>
      <table>
        <thead>
          <tr className="trTopPart">
            <th>Parking</th>
            <th>Status</th>
            <th>License Plate</th>
            <th>Apartment</th>
            <th>Arriving Time</th>
          </tr>
        </thead>
        <tbody>
          {parkingData.map((parking) => (
            <tr key={parking.id}>
              <td>{parking.parking}</td>
              <td>{parking.status}</td>
              <td>{parking.licensePlate}</td>
              <td>{parking.apartment}</td>
              <td>{parking.arrivingTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button className="modifyParkingButton" onClick={handleModifyParkingSpot}>Modify Parking Spot</button>
      </div>
    </div>
  );
};

export default AdminParking;
