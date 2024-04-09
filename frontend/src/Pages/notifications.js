import React from 'react';
import '../App.css';

const Notifications = () => {
  const notifications = [
    'El paquete "tipo" está en conserjería desde "fecha".',
    'La persona "persona" llegó a las "fecha".',
    'El estacionamiento "estacionamiento" está ocupado por "nombre_visita". Debe ser desocupado en "remaining_time".',
  ];

  return (
    <div className="notifications-container">
      <h1 className="centeredHeading">Notifications</h1>
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
