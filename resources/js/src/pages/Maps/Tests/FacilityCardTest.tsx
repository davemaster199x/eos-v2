import React from 'react';
import FacilityCard from '../FacilityCard';

const FacilityCardTest = () => {
    const testFacility = {
        name: 'Test Facility',
        address: '123 Test St',
        facilities: [{ type: 'office', speciality: 'Orthopedics', doctors: ['Dr. A', 'Dr. B'] }],
    };

    const focusOnFacility = (lat, lng, name) => {
        console.log(`Focusing on facility: ${name} at [${lat}, ${lng}]`);
    };

    return <FacilityCard facility={testFacility} focusOnFacility={focusOnFacility} />;
};

export default FacilityCardTest;
