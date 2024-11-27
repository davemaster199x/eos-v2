import React from 'react';
import { cn } from '../utils/util';

interface StatusIndicatorProps {
    isActive: number;
    className?: string;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({ isActive, className }) => {
    const status = +isActive === 1 ? 'Active' : 'Inactive';
    return <span className={cn('px-2 py-1 rounded-full text-xs font-medium', className)}>{status}</span>;
};

export default StatusIndicator;
