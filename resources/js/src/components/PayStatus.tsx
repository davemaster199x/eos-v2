import React from 'react';
import { cn } from '../utils/util';

type PayStatus = 'Is Paying' | 'On Hold' | 'Not in Network' | 'For Retention' | 'Is Not Paying';

interface PayStatusBadgeProps {
    status: PayStatus;
    className?: string;
}

const statusColors: Record<PayStatus, string> = {
    'Is Paying': 'bg-green-100 text-green-800',
    'On Hold': 'bg-yellow-100 text-yellow-800',
    'Not in Network': 'bg-gray-100 text-gray-800',
    'For Retention': 'bg-blue-100 text-blue-800',
    'Is Not Paying': 'bg-red-100 text-red-800',
};

export const PayStatusBadge: React.FC<PayStatusBadgeProps> = ({ status, className }) => {
    // return <span className={cn('px-2 py-1 rounded-full text-xs font-medium', statusColors[status], className)}>{status}</span>;
    return <span className={cn('px-2 py-1 rounded-full text-xs font-medium', className)}>{status}</span>;
};

export default PayStatusBadge;
