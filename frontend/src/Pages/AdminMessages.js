import React, { useState } from 'react';
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
      message: t('adminMessages.message1'),
      date: '01/06/2024'
    },
    {
      id: 2,
      name: 'Maria',
      lastName: 'Garcia',
      rut: '23.456.789-0',
      building: 'Building D',
      apartment: '12B',
      message: t('adminMessages.message2'),
      date: '01/06/2024'
    },
    {
      id: 3,
      name: 'Ignacio',
      lastName: 'Perez',
      rut: '22.136.789-K',
      building: 'Building B',
      apartment: '7B',
      message: t('adminMessages.message2'),
      date: '01/06/2024'
    },
  ];

  return (
    <div id="change" className="container">
      <div className="row justify-content-center">
          <div className="col-md-6">
          <h1 className="text-center mb-4">{t('adminMessages.adminCorrespondence')}</h1>
      <hr className="mb-4"/>
      <div>
        {messages.map((user) => (
          <div key={user.id} className="card mb-2">
            <div className="card-body">
                <div className="row">
                <div className="col-md-4 text-center">
                  <h4 className="card-title mb-2">{user.name} {user.lastName}</h4>
                  <p className="card-text mb-0"><strong>{t('adminMessages.labelRut')}</strong> {user.rut}</p>
                  <p className="card-text mb-0"><strong>{t('adminMessages.labelBuilding')}</strong> {user.building}</p>
                  <p className="card-text mb-0"><strong>{t('adminMessages.labelApartment')}</strong> {user.apartment}</p>
                </div>
                <div className="col-md-8">
                  <p className="card-text">{user.message}</p>
                </div>
              <p className="card-date text-end">{user.date}</p>
              </div>
              <div class="d-grid gap-2 m-0 p-0">
                <button class="btn btn-sm btn-danger" type="button">{t('adminMessages.delete')}</button>
            </div>
          </div>
        </div>       
        ))}
    </div>
    </div>
    </div>
    </div>
  );
};

export default AdminMessages;
