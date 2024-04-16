import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const Config = () => {
  const { t } = useTranslation();
  const [showPersonalInfo, setShowPersonalInfo] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleTogglePersonalInfo = () => {
    setShowPersonalInfo(!showPersonalInfo);
    setShowChangePassword(false);
    setShowNotifications(false);
  };

  const handleToggleChangePassword = () => {
    setShowChangePassword(!showChangePassword);
    setShowPersonalInfo(false);
    setShowNotifications(false);
  };

  const handleToggleNotifications = () => {
    setShowNotifications(!showNotifications);
    setShowPersonalInfo(false);
    setShowChangePassword(false);
  };

  return (
    <div className="config-container">
      <h1>{t('config.configuration')}</h1>
      <div className="buttons-container">
        <button className="config-button" onClick={handleTogglePersonalInfo}>{t('config.personalInfo')}</button>
        <button className="config-button" onClick={handleToggleChangePassword}>{t('config.changePassword')}</button>
        <button className="config-button" onClick={handleToggleNotifications}>{t('config.notifications')}</button>
      </div>

      {/* Mostrar cuadro de Información Personal */}
      {showPersonalInfo && (
        <div className="config-box">
          <h2>{t('config.personalInfoTitle')}</h2>
          <div className="info-item">
            <label>{t('config.name')}</label>
            <span>John</span>
            <button>{t('config.edit')}</button>
          </div>
          <div className="info-item">
            <label>{t('config.lastName')}</label>
            <span>Doe</span>
            <button>{t('config.edit')}</button>
          </div>
          <div className="info-item">
            <label>{t('config.rut')}</label>
            <span>20903849-1</span>
            <button>{t('config.edit')}</button>
          </div>
          <div className="info-item">
            <label>{t('config.apartment')}</label>
            <span>7A</span>
            <button>{t('config.edit')}</button>
          </div>
          <div className="info-item">
            <label>{t('config.building')}</label>
            <span>A</span>
            <button>{t('config.edit')}</button>
          </div>
          {/* Agregar más campos de información aquí */}
        </div>
      )}

      {/* Mostrar cuadro de Cambiar Contraseña */}
      {showChangePassword && (
        <div className="config-box">
          <h2>{t('config.changePasswordTitle')}</h2>
          <div className="password-item">
            <label>{t('config.oldPassword')}</label>
            <input type="password" />
          </div>
          <div className="password-item">
            <label>{t('config.newPassword')}</label>
            <input type="password" />
          </div>
          <div className="password-item">
            <label>{t('config.confirmPassword')}</label>
            <input type="password" />
          </div>
          <button className="update-info-button">{t('config.updateInfo')}</button>
        </div>
      )}

      {/* Mostrar cuadro de Notificaciones */}
      {showNotifications && (
        <div className="config-box">
          <h2>{t('config.notificationsTitle')}</h2>
          <div className="notification-item">
            <label>{t('config.receiveEmail')}</label>
            <button>{t('config.unsubscribe')}</button>
          </div>
          <div className="notification-item">
            <label>{t('config.receiveSMS')}</label>
            <button>{t('config.unsubscribe')}</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Config;
