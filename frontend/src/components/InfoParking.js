import React from 'react';
import { formatDateLarge } from '../Utils.js';
import { useTranslation } from 'react-i18next';

const InfoParking = ({ data, onFreeParking }) => {
  const { t } = useTranslation();

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title mb-2">{t('adminParking.parkedNumber')}{data.parked_at}</h2>
              <h5 className="card-title">{data.full_name}</h5>
              <p className="card-text mb-2">{t('adminParking.licensePlate')}: {data.license_plate}</p>
              <p className="card-text">{t('adminParking.arrivingTime')}: {formatDateLarge(data.parked_since)}</p>
              <div className="d-grid gap-1">
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={() => onFreeParking(data.license_plate, data.parked_at)}
                >
                  {t('adminParking.freeParking')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoParking;
