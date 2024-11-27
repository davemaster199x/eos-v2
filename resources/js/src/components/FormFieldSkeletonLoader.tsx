import React from 'react';

const FormFieldSkeletonLoader = () => {
    return (
        <div className="animate-pulse">
            <div className="h-10 bg-gray-200 rounded-md flex items-center px-3">
                <div className="h-6 w-32 bg-gray-300 rounded mr-2"></div>
                <div className="h-5 w-5 bg-gray-300 rounded-full ml-auto"></div>
            </div>
        </div>
    );
};

export default FormFieldSkeletonLoader;
