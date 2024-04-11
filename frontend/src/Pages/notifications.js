import React from 'react';
import { useTranslation } from 'react-i18next';
import '../App.css';

const Notifications = () => {
  const { t } = useTranslation();

  const notifications = [
    t('notifications.packageArrival', { type: "tipo", date: "fecha" }),
    t('notifications.personArrival', { person: "persona", date: "fecha" }),
    t('notifications.parkingOccupied', { parking: "estacionamiento", visitor_name: "nombre_visita", remaining_time: "remaining_time" })
  ];

  return (
    <div className="notifications-container">
      <h1 className="centeredHeading">{t('notifications.title')}</h1>
      <hr className="divider" />
      <ul className="notifications-list">
        {notifications.map((notification, index) => (
          <li key={index}>
            {notification}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
