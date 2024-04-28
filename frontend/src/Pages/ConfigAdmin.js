import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

/* to be developed */
const ConfigAdmin = () => {
  const { t } = useTranslation();
  const [showCreateNewUser, setShowCreateNewUser] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAdminUsersRoles, setShowAdminUsersRoles] = useState(false);

  const handleCreateNewUser = () => {
    setShowCreateNewUser(!showCreateNewUser);
    setShowNotifications(false);
    setShowAdminUsersRoles(false);
  };

  const handleToggleNotifications = () => {
    setShowNotifications(!showNotifications);
    setShowCreateNewUser(false);
    setShowAdminUsersRoles(false);
  };

  const handleToggleAdminUsersRoles = () => {
    setShowAdminUsersRoles(!showAdminUsersRoles);
    setShowCreateNewUser(false);
    setShowNotifications(false);
  };

  return (
    <div class="container">
      <h1 class="text-center">{t('configAdmin.configuration')}</h1>
      <div class="d-grid gap-2 d-md-block">
        <button class="btn btn-primary config-button" onClick={handleToggleAdminUsersRoles}>{t('configAdmin.adminUsersRoles')}</button>
        <button class="btn btn-primary config-button" onClick={handleCreateNewUser}>{t('configAdmin.newUser')}</button>
        <button class="btn btn-primary config-button" onClick={handleToggleNotifications}>{t('configAdmin.notifications')}</button>
      </div>

      {/* Mostrar cuadro de crear nuevo usuario */}
      {showCreateNewUser && (
        <div class="card mt-3">
          <h2>{t('configAdmin.createNewUserTitle')}</h2>
          {/* Campos de info nuevo usuario , tbd */}
        </div>
      )}

      {/* Mostrar cuadro de Notifications */}
      {showNotifications && (
        <div class="card mt-3">
          <h2>{t('configAdmin.notificationsTitle')}</h2>
          {/* Campos de notificaciones, tbd */}
        </div>
      )}

      {/* Mostrar cuadro de Admin Users & Roles */}
      {showAdminUsersRoles && (
        <div class="card mt-3">
          <h2>{t('configAdmin.adminUsersRolesTitle')}</h2>
          {/* Campos de administración de usuarios y roles aquí, tbd */}
        </div>
      )}
    </div>
  );
};

export default ConfigAdmin;
