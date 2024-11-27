import React from 'react';
import Maps from '../Maps';

const MapsTest = () => {
    const testFacilities = [
        {
            name: 'Test Facility 1',
            address: '123 Test St',
            lat: 40.7128,
            lng: -74.186,
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

    return <Maps facilities={testFacilities} />;
};

export default MapsTest;
