import React, { useEffect, useState } from 'react';

export type AlertPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
export type AlertType = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';

interface AlertProps {
    id?: string;
    type?: AlertType;
    title?: string;
    message?: string;
    duration?: number;
    hasCloseButton?: boolean;
    onClose?: (id: string) => void;
}

const Alert: React.FC<AlertProps> = ({ id, type = 'primary', title = '', message = '', duration = 0, hasCloseButton = true, onClose = () => {} }) => {
    const [progress, setProgress] = useState(100);

    useEffect(() => {
        if (duration <= 0) return;

        const startTime = Date.now();
        const timer = setInterval(() => {
            const elapsedTime = Date.now() - startTime;
            const newProgress = Math.max(0, 100 - (elapsedTime / duration) * 100);
            setProgress(newProgress);

            if (newProgress === 0) {
                clearInterval(timer);
                onClose(id || '');
            }
        }, 100);

        return () => clearInterval(timer);
    }, [duration, id, onClose]);

    const typeClasses: Record<AlertType, string> = {
        primary: 'text-primary bg-primary-light dark:bg-primary-dark-light',
        secondary: 'text-secondary bg-secondary-light dark:bg-secondary-dark-light',
        success: 'text-success bg-success-light dark:bg-success-dark-light',
        warning: 'text-warning bg-warning-light dark:bg-warning-dark-light',
        danger: 'text-danger bg-danger-light dark:bg-danger-dark-light',
        info: 'text-info bg-info-light dark:bg-info-dark-light',
    };

    return (
        <div className={`relative flex justify-between items-center w-full p-3.5 text-sm rounded ${typeClasses[type]} overflow-hidden`}>
            <span className="ltr:pr-2 rtl:pl-2">
                <strong className="ltr:mr-1 rtl:ml-1">{title}</strong>
                {typeof message === 'string' ? message : JSON.stringify(message)}
            </span>

            {hasCloseButton && (
                <button type="button" className="ltr:ml-auto rtl:mr-auto hover:opacity-80" onClick={() => onClose(id as string)}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M9.85348 9.14602C9.89993 9.19247 9.93678 9.24762 9.96192 9.30831C9.98706 9.36901 10 9.43406 10 9.49975C10 9.56544 9.98706 9.63049 9.96192 9.69119C9.93678 9.75188 9.89993 9.80703 9.85348 9.85348C9.80703 9.89993 9.75188 9.93678 9.69119 9.96192C9.63049 9.98706 9.56544 10 9.49975 10C9.43406 10 9.36901 9.98706 9.30831 9.96192C9.24762 9.93678 9.19247 9.89993 9.14602 9.85348L5 5.70684L0.85398 9.85348C0.760165 9.9473 0.632925 10 0.50025 10C0.367576 10 0.240335 9.9473 0.14652 9.85348C0.0527047 9.75966 2.61533e-09 9.63242 0 9.49975C-2.61533e-09 9.36707 0.0527047 9.23983 0.14652 9.14602L4.29316 5L0.14652 0.85398C0.0527047 0.760165 -9.88503e-10 0.632925 0 0.50025C9.88503e-10 0.367576 0.0527047 0.240335 0.14652 0.14652C0.240335 0.0527047 0.367576 9.88503e-10 0.50025 0C0.632925 -9.88503e-10 0.760165 0.0527047 0.85398 0.14652L5 4.29316L9.14602 0.14652C9.23983 0.0527047 9.36707 -2.61533e-09 9.49975 0C9.63242 2.61533e-09 9.75966 0.0527047 9.85348 0.14652C9.9473 0.240335 10 0.367576 10 0.50025C10 0.632925 9.9473 0.760165 9.85348 0.85398L5.70684 5L9.85348 9.14602Z"
                            fill="#01AB55"
                        />
                    </svg>
                </button>
            )}
        </div>
    );
};

export default Alert;
