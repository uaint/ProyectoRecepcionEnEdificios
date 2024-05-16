import React from 'react';
import { useTranslation } from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';

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
    {
      id: 3,
      name: 'Ignacio',
      lastName: 'Perez',
      rut: '22.136.789-K',
      building: 'Building B',
      apartment: '7B',
      contact: '944755869',
      message: t('adminMessages.message2'),
    },
  ];

  return (
    <div className="container mt-5">
      <h1 className="mt-5 mb-4">{t('adminMessages.adminMessages')}</h1>
      <div className="row">
        {messages.map((user) => (
          <div key={user.id} className="col-md-6 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{user.name} {user.lastName}</h5>
                <p className="card-text"><strong>{t('adminMessages.labelRut')}</strong> {user.rut}</p>
                <p className="card-text"><strong>{t('adminMessages.labelBuilding')}</strong> {user.building}</p>
                <p className="card-text"><strong>{t('adminMessages.labelApartment')}</strong> {user.apartment}</p>
                <p className="card-text"><strong>{t('adminMessages.labelContact')}</strong> {user.contact}</p>
                <hr />
                <p className="card-text">{user.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminMessages;
