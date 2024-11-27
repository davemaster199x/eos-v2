import React from 'react';
import { cn } from '../utils/util';

interface TableSkeletonLoaderProps {
    columns: number;
    rows: number;
    className?: string;
    showTabs?: boolean;
    showPagination?: boolean;
    tabCount?: number;
}

const TableSkeletonLoader: React.FC<TableSkeletonLoaderProps> = ({ columns, rows, className, showTabs = true, showPagination = true, tabCount = 3 }) => {
    return (
        <div className={cn('mb-5 animate-pulse', className)}>
            {showTabs && (
                <div className="mb-5 mt-3 flex flex-wrap border-b border-gray-200">
                    {Array.from({ length: tabCount }).map((_, index) => (
                        <div key={index} className="mr-4 mb-2 h-8 w-24 bg-gray-200 rounded"></div>
                    ))}
                </div>
            )}

            {showPagination && (
                <div className="flex justify-start items-center gap-4 mb-4">
                    <div className="h-4 w-48 bg-gray-200 rounded"></div>
                </div>
            )}

            <div className="w-full">
                <table className="w-full">
                    <thead>
                        <tr>
                            {Array.from({ length: columns }).map((_, index) => (
                                <th key={index} className="bg-gray-200 p-4 text-left">
                                    <div className="h-4 bg-gray-300 rounded"></div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from({ length: rows }).map((_, rowIndex) => (
                            <tr key={rowIndex} className="border-b border-gray-200">
                                {Array.from({ length: columns }).map((_, colIndex) => (
                                    <td key={colIndex} className="p-4">
                                        <div className="h-4 bg-gray-200 rounded"></div>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showPagination && (
                <div className="flex justify-center items-center gap-4 mt-4">
                    <div className="h-8 w-8 bg-gray-200 rounded"></div>
                    <div className="h-8 w-8 bg-gray-200 rounded"></div>
                    <div className="h-8 w-8 bg-gray-200 rounded"></div>
                </div>
            )}
        </div>
    );
};

export default TableSkeletonLoader;
