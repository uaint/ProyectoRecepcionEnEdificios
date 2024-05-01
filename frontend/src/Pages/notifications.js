import React from 'react';
import { useTranslation } from 'react-i18next';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


// TODO
const Notifications = () => {

  // Receive translations
  const { t } = useTranslation();

  // Temporary notifications for testing purposes
  const notifications = [
    t('notifications.packageArrival', { type: "type", date: "date" }),
    t('notifications.personArrival', { person: "person", date: "date" }),
    t('notifications.parkingOccupied', { parking: "parking_spot", visitor_name: "visitor_name", remaining_time: "remaining_time" })
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
