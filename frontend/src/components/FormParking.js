import React, { useState } from 'react';

const FormParking = ({ parkingId }) => {
    const [licensePlate, setLicensePlate] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();

        // Call API to add visitor
        fetch(`https://dduhalde.online/.netlify/functions/api/assing_parking/${licensePlate}/${parkingId}`)
        .then(response => {
        if (!response.ok) {
            throw new Error('An error occured trying to add a vehicle.');
        }
        console.log(`Vehicle added successfully.`);
        })
        .catch(error => {
        console.error('An error occured trying to add a vehicle:', error);
        });
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title">Add Car to Parking {parkingId}</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="license_plate" className="form-label">License Plate</label>
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
                                    <button type="submit" className="btn btn-primary">Submit</button>
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
