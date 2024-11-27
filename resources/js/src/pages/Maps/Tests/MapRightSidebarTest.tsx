import React from 'react';
import MapRightSidebar from '../MapRightSidebar';

const MapRightSidebarTest = () => {
    return (
        <div className="flex h-screen">
            {/* Left side for spacing or other components */}
            <div className="w-2/3 bg-gray-50 p-4">
                <h2 className="text-2xl font-bold mb-4">Right Sidebar Test</h2>
                <p>This area can be used for testing other components or empty space.</p>
            </div>
            <MapRightSidebar />
        </div>
    );
};

export default MapRightSidebarTest;
