import React from 'react';

const NoFacilitiesFound = () => {
    return (
        <div className="flex flex-col items-center justify-center p-8 text-center">
            <svg width="125" height="125" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="80" cy="80" r="60" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="4" />
                <line x1="125.071" y1="125.071" x2="180" y2="180" stroke="#9CA3AF" strokeWidth="4" strokeLinecap="round" />
                <path d="M65 65L95 95M95 65L65 95" stroke="#9CA3AF" strokeWidth="4" strokeLinecap="round" />
            </svg>
            <h3 className="mt-4 text-xl font-semibold text-gray-700">No Facilities Found</h3>
            <p className="mt-2 text-gray-500">Try adjusting your search criteria or add a new facility.</p>
        </div>
    );
};

export default NoFacilitiesFound;
