import React, { useState } from 'react';
import MapLeftSidebar from '../MapLeftSidebar';

const MapLeftSidebarTest = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [currentView, setCurrentView] = useState('compact');
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

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        // Implement the distance calculation logic here
        return 1.2; // Mocked value for testing
    };

    const focusOnFacility = (lat, lng, name) => {
        console.log(`Focusing on facility: ${name} at [${lat}, ${lng}]`);
    };

    const applySortingAndFilters = () => {
        console.log('Applying sorting and filters...');
    };

    return (
        <MapLeftSidebar
            facilities={testFacilities}
            currentPage={currentPage}
            itemsPerPage={10}
            currentView={currentView}
            calculateDistance={calculateDistance}
            patientCoordinates={[-74.006, 40.7128]}
            setCurrentView={setCurrentView}
            setCurrentPage={setCurrentPage}
            focusOnFacility={focusOnFacility}
            applySortingAndFilters={applySortingAndFilters}
        />
    );
};

export default MapLeftSidebarTest;
