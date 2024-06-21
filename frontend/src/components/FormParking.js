import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const FormParking = ({ parkingId, onAddParking }) => {
    
    // General configurations
    const { t } = useTranslation();

    const handleSubmit = (e) => {
        e.preventDefault();
        const storedTowerId = sessionStorage.getItem('tower_id_associated');
        onAddParking(formData.run, formData.license_plate, parkingId, storedTowerId);
    };

    const [formData, setFormData] = useState({
        run: '',
        dv: '',
        license_plate: ''
      });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
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
                            <div class="mb-1">
                                <label for="run" class="form-label">{t('vehicleForm.run')}</label>
                                <input type="number" class="form-control" id="run" name="run" value={formData.run} onChange={handleChange} required placeholder={t('vehicleForm.rutPlaceholder')}/>
                                </div>
                                <div class="mb-1">
                                <label for="dv" class="form-label">{t('vehicleForm.dv')}</label>
                                <input type="number" class="form-control" id="dv" name="dv" value={formData.dv} onChange={handleChange} required placeholder={t('vehicleForm.dvPlaceholder')}/>
                                </div>
                                <div class="mb-3">
                                <label for="license_plate" class="form-label">{t('vehicleForm.licensePlate')}</label>
                                <input type="text" class="form-control" id="license_plate" name="license_plate" value={formData.license_plate} onChange={handleChange} required/>
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
