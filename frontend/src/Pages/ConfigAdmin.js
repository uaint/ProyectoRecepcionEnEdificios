import React, { useState } from 'react';
import '../App.css';

const ConfigAdmin = () => {
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
    <div className="config-container">
      <h1>Configuration</h1>
      <div className="buttons-container">
        <button className="config-button" onClick={handleToggleAdminUsersRoles}>Admin Users & Roles</button>
        <button className="config-button" onClick={handleCreateNewUser}>New User</button>
        <button className="config-button" onClick={handleToggleNotifications}>Notifications</button>
      </div>

      {/* Mostrar cuadro de crear nuevo usuario */}
      {showCreateNewUser && (
        <div className="config-box">
          <h2>Create New User</h2>
          {/* Campos de info nuevo usuario , tbd */}
        </div>
      )}

      {/* Mostrar cuadro de Notifications */}
      {showNotifications && (
        <div className="config-box">
          <h2>Notifications</h2>
          {/* Campos de notificaciones, tbd */}
        </div>
      )}

      {/* Mostrar cuadro de Admin Users & Roles */}
      {showAdminUsersRoles && (
        <div className="config-box">
          <h2>Admin Users & Roles</h2>
          {/* Campos de administración de usuarios y roles aquí, tbd */}
        </div>
      )}
    </div>
  );
};

export default ConfigAdmin;
