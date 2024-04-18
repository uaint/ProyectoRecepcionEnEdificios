import React from 'react';
import { useTranslation } from 'react-i18next';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const AdminParking = () => {
  const { t } = useTranslation();

  // Datos de ejemplo para las filas de la tabla
  const parkingData = [
    { id: 1, parking: 'A1', status: t('adminParking.occupied'), licensePlate: 'ABC123', apartment: '7A', arrivingTime: '10:00 AM' },
    { id: 2, parking: 'B2', status: t('adminParking.available'), licensePlate: '-', apartment: '-', arrivingTime: '-' },
    { id: 3, parking: 'C3', status: t('adminParking.occupied'), licensePlate: 'DEF456', apartment: '12C', arrivingTime: '11:30 AM' },
  ];

  const handleModifyParkingSpot = () => {
    // Lógica para modificar el lugar de estacionamiento
    console.log('Modify Parking Spot clicked');
  };

  return (
    <div className="admin-parking">
      <h1>{t('adminParking.adminParking')}</h1>
      <table>
        <thead>
          <tr className="trTopPart">
            <th>{t('adminParking.parking')}</th>
            <th>{t('adminParking.status')}</th>
            <th>{t('adminParking.licensePlate')}</th>
            <th>{t('adminParking.apartment')}</th>
            <th>{t('adminParking.arrivingTime')}</th>
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
        <button className="modifyParkingButton" onClick={handleModifyParkingSpot}>{t('adminParking.modifyParkingSpot')}</button>
      </div>
    </div>
  );
};

export default AdminParking;
