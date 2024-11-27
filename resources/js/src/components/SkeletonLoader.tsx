import React from 'react';
import { cn } from '../utils/util';

interface SkeletonLoaderProps {
    width?: number;
    height?: number;
    className?: string;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ width = 340, height = 245, className = '' }) => {
    return (
        <div className={cn(`bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden`, className)} style={{ width, height }}>
            {/* Image placeholder */}
            <div className="h-3/5 bg-gray-300 dark:bg-gray-600 animate-pulse" />

            {/* Content placeholders */}
            <div className="p-4 space-y-2">
                {/* Title placeholder */}
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse w-3/4" />

                {/* Description placeholder */}
                <div className="space-y-2">
                    <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded animate-pulse" />
                    <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded animate-pulse w-5/6" />
                </div>

                {/* Button placeholder */}
                <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded animate-pulse mt-4 w-1/2" />
            </div>
        </div>
    );
};

export default SkeletonLoader;
