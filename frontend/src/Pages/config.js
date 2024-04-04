import React, { useState } from 'react';
import '../App.css';

const Config = () => {
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
      <h1>Configuration</h1>
      <div className="buttons-container">
        <button className="config-button" onClick={handleTogglePersonalInfo}>Personal Information</button>
        <button className="config-button" onClick={handleToggleChangePassword}>Change Password</button>
        <button className="config-button" onClick={handleToggleNotifications}>Notifications</button>
      </div>

      {/* Mostrar cuadro de Personal Information */}
      {showPersonalInfo && (
        <div className="config-box">
          <h2>Personal Information</h2>
          <div className="info-item">
            <label>Name:</label>
            <span>John</span>
            <button>Edit</button>
          </div>
          <div className="info-item">
            <label>Last Name:</label>
            <span>Doe</span>
            <button>Edit</button>
          </div>
          <div className="info-item">
            <label>RUT:</label>
            <span>20903849-1</span>
            <button>Edit</button>
          </div>
          <div className="info-item">
            <label>Apartment:</label>
            <span>7A</span>
            <button>Edit</button>
          </div>
          <div className="info-item">
            <label>Building:</label>
            <span>A</span>
            <button>Edit</button>
          </div>
          {/* Agregar más campos de información aquí */}
        </div>
      )}

      {/* Mostrar cuadro de Change Password */}
      {showChangePassword && (
        <div className="config-box">
          <h2>Change Password</h2>
          <div className="password-item">
            <label>Old Password: </label>
            <input type="password" />
          </div>
          <div className="password-item">
            <label>New Password: </label>
            <input type="password" />
          </div>
          <div className="password-item">
            <label>Confirm Password: </label>
            <input type="password" />
          </div>
          <button className="update-info-button">Update Information</button>
        </div>
      )}

      {/* Mostrar cuadro de Notifications */}
      {showNotifications && (
        <div className="config-box">
          <h2>Notifications</h2>
          <div className="notification-item">
            <label>Receive notifications through email:</label>
            <button>Unsubscribe</button>
          </div>
          <div className="notification-item">
            <label>Receive notifications through SMS:</label>
            <button>Unsubscribe</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Config;
