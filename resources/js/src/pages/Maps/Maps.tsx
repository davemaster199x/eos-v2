import React, { useState, useEffect } from 'react';
import Map from './Map';
import MapFilterResults from './MapFilterResultsSidebar';
import MapFiltersSidebar from './MapFiltersSidebar';

const Maps = () => {
    // Set initial state from query parameters

    return (
        <div className="flex h-screen bg-white">
            <MapFiltersSidebar />
            <MapFilterResults />
            <Map />
        </div>
    );
};

export default Maps;
