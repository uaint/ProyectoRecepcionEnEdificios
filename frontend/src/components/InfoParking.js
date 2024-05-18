import React from 'react';
import { formatDateLarge } from '../Utils.js';

// Suponiendo que tienes esta función definida en algún lugar de tu proyecto
function freeparking(license_plate) {

    fetch(`https://dduhalde.online/.netlify/functions/api/free_parking/${license_plate}`)
        .then(response => {
        if (!response.ok) {
            throw new Error('An error occured trying to remove a vehicle.');
        }
        console.log(`Vehicle remove successfully.`);
        })
        .catch(error => {
        console.error('An error occured trying to remove a vehicle:', error);
        });
}

const InfoParking = ({ data }) => {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title mb-3">{data.full_name}</h2>
                            <p className="card-text">License Plate: {data.license_plate}</p>
                            <p className="card-text">Parked Since: {formatDateLarge(data.parked_since)}</p>
                            <div className="d-grid gap-1">
                                <button
                                    type="button"
                                    className="btn btn-warning"
                                    onClick={() => freeparking(data.license_plate)}
                                >
                                    Free Parking
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
