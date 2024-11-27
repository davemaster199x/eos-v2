import React from 'react';
import { cn } from '../utils/util';

const Badge = ({ children, variant = 'blue', className = '', ...props }) => {
    const baseClasses = 'px-2 py-1 text-xs font-medium rounded-lg';

    const variantClasses = {
        blue: 'bg-blue-100 text-blue-800',
        green: 'bg-[#C2E7E7] text-[#066]',
        // Add more color variants as needed
    };

    return (
        <span className={cn(baseClasses, variantClasses[variant] || variantClasses.blue, className)} {...props}>
            {children}
        </span>
    );
};

export default Badge;
