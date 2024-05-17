import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Collapse } from 'react-bootstrap';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// TODO
const ConfigAdmin = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(null);

  const handleToggleTab = (tabName) => {
    setActiveTab(activeTab === tabName ? null : tabName);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <h1>{t('configAdmin.configuration')}</h1>
        <button className="btn btn-primary config-button ms-3" onClick={() => handleToggleTab('adminUsersRoles')}>
          {t('configAdmin.adminUsersRoles')}
        </button>
        <button className="btn btn-primary config-button ms-3" onClick={() => handleToggleTab('createNewUser')}>
          {t('configAdmin.newUser')}
        </button>
        <button className="btn btn-primary config-button ms-3" onClick={() => handleToggleTab('notifications')}>
          {t('configAdmin.notifications')}
        </button>

        <div className="mt-3">
          <Collapse in={activeTab === 'adminUsersRoles'}>
            <div className="card">
              <h2>{t('configAdmin.adminUsersRolesTitle')}</h2>
              {/* administración de usuarios y roles aquí, tbd */}
            </div>
          </Collapse>

          <Collapse in={activeTab === 'createNewUser'}>
            <div className="card">
              <h2>{t('configAdmin.createNewUserTitle')}</h2>
              {/* info nuevo usuario, tbd */}
            </div>
          </Collapse>

          <Collapse in={activeTab === 'notifications'}>
            <div className="card">
              <h2>{t('configAdmin.notificationsTitle')}</h2>
              {/* notificaciones, tbd */}
            </div>
          </Collapse>
        </div>
      </div>
    </div>
  );
};

export default ConfigAdmin;
