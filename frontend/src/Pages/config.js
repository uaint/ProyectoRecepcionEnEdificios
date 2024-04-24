import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


/* to be developed */
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
    <div class="container">
      <div class="row m-0">
        <div class="col-md-12">
          <h1 class="text-center mb-4">{t('config.configuration')}</h1> 
          <hr class="mb-4" />   
          <div class="d-grid gap-2 d-md-block">
            <button class="btn btn-primary mx-2" type="button" onClick={handleTogglePersonalInfo}>{t('config.personalInfo')}</button>
            <button class="btn btn-primary mx-2" type="button" onClick={handleToggleChangePassword}>{t('config.changePassword')}</button>
            <button class="btn btn-primary mx-2" type="button" onClick={handleToggleNotifications}>{t('config.notifications')}</button>
          </div>
      {/* Mostrar cuadro de Información Personal */}
      {showPersonalInfo && (
        <div class="card mt-3">
        <div class="card-header">
          {t('config.personalInfoTitle')}
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            <label>{t('config.name')}</label>
            <span> John</span>
            <button type="button" class="btn btn-primary float-end">{t('config.edit')}</button>
          </li>
          <li class="list-group-item">
            <label>{t('config.lastName')}</label>
            <span> Doe</span>
            <button type="button" class="btn btn-primary float-end">{t('config.edit')}</button>
          </li>
          <li class="list-group-item">
            <label>{t('config.rut')}</label>
            <span> 20903849-1</span>
            <button type="button" class="btn btn-primary float-end">{t('config.edit')}</button>
          </li>
          <li class="list-group-item">
            <label>{t('config.apartment')}</label>
            <span> 7A</span>
            <button type="button" class="btn btn-primary float-end">{t('config.edit')}</button>
          </li>
          <li class="list-group-item">
            <label>{t('config.building')}</label>
            <span> A</span>
            <button type="button" class="btn btn-primary float-end">{t('config.edit')}</button>
          </li>
        </ul>
      </div>
    )}

      {/* Mostrar cuadro de Cambiar Contraseña */}
      {showChangePassword && (
        <div class="card mt-3">
        <div class="card-header">
          {t('config.changePasswordTitle')}
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            <label>{t('config.oldPassword')}</label>
            <input type="password" id="inputPassword5" class="form-control" aria-describedby="passwordHelpBlock"/>
          </li>
          <li class="list-group-item">
            <label>{t('config.newPassword')}</label>
            <input type="password" id="inputPassword5" class="form-control" aria-describedby="passwordHelpBlock"/>
          </li>
          <li class="list-group-item">
            <label>{t('config.confirmPassword')}</label>
            <input type="password" id="inputPassword5" class="form-control" aria-describedby="passwordHelpBlock"/>
          </li>
          </ul>
          <button type="button" class="btn btn-primary">{t('config.updateInfo')}</button>
        </div>
      )}
      {/* Mostrar cuadro de Notificaciones */}
      {showNotifications && (
        <div class="card mt-3">
        <div class="card-header">
          {t('config.notificationsTitle')}
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            <label>{t('config.receiveEmail')}</label>
            <button type="button" class="btn btn-primary float-end">{t('config.unsubscribe')}</button>
          </li>
          <li class="list-group-item">
            <label>{t('config.receiveSMS')}</label>
            <button type="button" class="btn btn-primary float-end ">{t('config.unsubscribe')}</button>
          </li>
        </ul>
        </div>
      )}
    </div>
    </div>
    </div>
  );
};

export default Config;
