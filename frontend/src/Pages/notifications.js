import React from 'react';
import { useTranslation } from 'react-i18next';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Notifications = () => {
  const { t } = useTranslation();

  const notifications = [
    t('notifications.packageArrival', { type: "tipo", date: "fecha" }),
    t('notifications.personArrival', { person: "persona", date: "fecha" }),
    t('notifications.parkingOccupied', { parking: "estacionamiento", visitor_name: "nombre_visita", remaining_time: "remaining_time" })
  ];

  return (
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <h1 class="text-center mb-4">{t('notifications.title')}</h1>  
          <hr class="mb-4" />  
          <ul class="list-group notifications-list">
            { notifications.map((notification, index) => (
              <li key={index} class="list-group-item">
                {notification}
              </li>
            )) }
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
