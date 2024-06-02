import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const FormParking = ({ parkingId, onAddParking }) => {
    // General configurations
    const { t } = useTranslation();

    const [licensePlate, setLicensePlate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddParking(licensePlate, parkingId);
        setLicensePlate(''); // Limpiar el campo de la placa después de agregar el estacionamiento
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title mb-2">{t('adminParking.parkedNumber')}{parkingId}</h2>
                            <h5 className="card-title">{t('adminParking.addParked')}</h5>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="license_plate" className="form-label">{t('adminParking.licensePlate')}</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="license_plate"
                                        name="license_plate"
                                        value={licensePlate}
                                        onChange={(e) => setLicensePlate(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="d-grid gap-1">
                                    <button type="submit" className="btn btn-primary">{t('adminParking.addParked')}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormParking;
