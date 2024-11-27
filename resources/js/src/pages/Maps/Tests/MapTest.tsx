import React, { useState } from 'react';
import Map from '../Map';

const MapTest = () => {
    const [patientCoordinates, setPatientCoordinates] = useState([-74.006, 40.7128]);
    const testFacilities = [
        {
            name: 'Test Facility 1',
            address: '123 Test St',
            lat: 40.7128,
            lng: -74.006,
            facilities: [{ type: 'office', speciality: 'Orthopedics', doctors: ['Dr. A', 'Dr. B'] }],
        },
        {
            name: 'Test Facility 2',
            address: '456 Test St',
            lat: 40.7306,
            lng: -73.9352,
            facilities: [{ type: 'surgery', speciality: 'General Surgery', doctors: ['Dr. C', 'Dr. D'] }],
        },
    ];

    return <Map facilities={testFacilities} patientCoordinates={patientCoordinates} setPatientCoordinates={setPatientCoordinates} />;
};

export default MapTest;
