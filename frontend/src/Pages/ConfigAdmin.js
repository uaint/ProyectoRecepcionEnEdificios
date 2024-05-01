import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// TODO
const ConfigAdmin = () => {
  const { t } = useTranslation();

  // Create panels
  const [showCreateNewUser, setShowCreateNewUser] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAdminUsersRoles, setShowAdminUsersRoles] = useState(false);

  // Create the handle for each pannel
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

      {/* Show create new user panel */}
      {showCreateNewUser && (
        <div class="card mt-3">
          <h2>{t('configAdmin.createNewUserTitle')}</h2>
          {/* TODO new user fields */}
        </div>
      )}

      {/* Show notifications panel */}
      {showNotifications && (
        <div class="card mt-3">
          <h2>{t('configAdmin.notificationsTitle')}</h2>
          {/* TODO notifications field */}
        </div>
      )}

      {/* Show panel for managing users & roles */}
      {showAdminUsersRoles && (
        <div class="card mt-3">
          <h2>{t('configAdmin.adminUsersRolesTitle')}</h2>
          {/* TODO managing fields */}
        </div>
      )}
    </div>
  );
};

export default ConfigAdmin;
