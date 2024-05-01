import React from 'react';
import { useTranslation } from 'react-i18next';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// TODO
const AdminMessages = () => {
  const { t } = useTranslation();

  const messages = [
    {
      id: 1,
      name: 'Felipe',
      lastName: 'Rojas',
      rut: '12.345.678-9',
      building: 'Building C',
      apartment: '8A',
      contact: '983746555',
      message: t('adminMessages.message1'),
    },
    {
      id: 2,
      name: 'Maria',
      lastName: 'Garcia',
      rut: '23.456.789-0',
      building: 'Building D',
      apartment: '12B',
      contact: '987654321',
      message: t('adminMessages.message2'),
    },
  ];

  return (
    <div className="admin-messages-container">
      <h1>{t('adminMessages.adminMessages')}</h1>
      {messages.map((user) => (
        <div key={user.id} className="user-container">
          <div className="user-info">
            <p><span className="label">{t('adminMessages.labelName')}</span> {user.name}</p>
            <p><span className="label">{t('adminMessages.labelLastName')}</span> {user.lastName}</p>
            <p><span className="label">{t('adminMessages.labelRut')}</span> {user.rut}</p>
            <p><span className="label">{t('adminMessages.labelBuilding')}</span> {user.building}</p>
            <p><span className="label">{t('adminMessages.labelApartment')}</span> {user.apartment}</p>
            <p><span className="label">{t('adminMessages.labelContact')}</span> {user.contact}</p>
          </div>
          <div className="user-message">{user.message}</div>
        </div>
      ))}
    </div>
  );
};

export default AdminMessages;
