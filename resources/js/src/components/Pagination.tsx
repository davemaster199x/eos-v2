import React from 'react';
import { IconType } from 'react-icons';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { IoArrowBackOutline, IoArrowForwardOutline } from 'react-icons/io5';
import { AltArrowLeft, AltArrowRight, DoubleAltArrowLeft, DoubleAltArrowRight } from 'solar-icon-set';
import { cn } from '../utils/util';

export interface PaginationProps {
    paginationData: {
        current_page: number;
        last_page: number;
        total: number;
        per_page: number;
    };
    onPageChange: (page: number) => void;
    buttonSize?: 'sm' | 'md' | 'lg';
    className?: string;
}

const Pagination: React.FC<PaginationProps> = ({ paginationData, onPageChange, buttonSize = 'md', className }) => {
    const { current_page, last_page, total, per_page } = paginationData;

    const ButtonLeftIcon = <AltArrowLeft />;
    const ButtonRightIcon = <AltArrowRight />;
    const DoubleLeftButtonIcon = <DoubleAltArrowLeft />;
    const DoubleRightButtonIcon = <DoubleAltArrowRight />;

    const buttonSizeClasses = {
        sm: 'p-1 text-sm',
        md: 'p-2',
        lg: 'p-3 text-lg',
    };

    const numberButtonSizeClasses = {
        sm: 'px-2 py-1 text-xs',
        md: 'px-3.5 py-2 text-sm',
        lg: 'px-4 py-2 text-lg',
    };

    const renderPageNumbers = () => {
        const pageNumbers = [] as JSX.Element[];
        const maxVisiblePages = 3;
        let startPage = Math.max(1, current_page - 1);
        let endPage = Math.min(last_page, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <li key={i}>
                    <button
                        type="button"
                        onClick={() => onPageChange(i)}
                        className={`flex justify-center font-semibold ${numberButtonSizeClasses[buttonSize]} rounded-full transition
              ${
                  i === current_page
                      ? 'bg-primary text-white dark:text-white-light dark:bg-primary'
                      : 'bg-white-light text-dark hover:text-white hover:bg-primary dark:text-white-light dark:bg-[#191e3a] dark:hover:bg-primary'
              }`}
                    >
                        {i}
                    </button>
                </li>
            );
        }
        return pageNumbers;
    };

    return (
        <ul className={cn('inline-flex justify-between items-center space-x-1 rtl:space-x-reverse m-auto w-full', className)}>
            <div className="flex gap-2">
                <li>
                    <button
                        type="button"
                        onClick={() => onPageChange(1)}
                        disabled={current_page === 1}
                        className={`flex justify-center font-semibold ${
                            buttonSizeClasses[buttonSize]
                        } rounded-full transition bg-white-light text-dark hover:text-white hover:bg-primary dark:text-white-light dark:bg-[#191e3a] dark:hover:bg-primary ${
                            current_page === 1 ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        {DoubleLeftButtonIcon}
                    </button>
                </li>
                <li>
                    <button
                        type="button"
                        onClick={() => onPageChange(current_page - 1)}
                        disabled={current_page === 1}
                        className={`flex justify-center font-semibold ${
                            buttonSizeClasses[buttonSize]
                        } rounded-full transition bg-white-light text-dark hover:text-white hover:bg-primary dark:text-white-light dark:bg-[#191e3a] dark:hover:bg-primary ${
                            current_page === 1 ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        {ButtonLeftIcon}
                    </button>
                </li>
            </div>
            <div className="flex gap-2">{renderPageNumbers()}</div>
            <div className="flex gap-2">
                <li>
                    <button
                        type="button"
                        onClick={() => onPageChange(current_page + 1)}
                        disabled={current_page === last_page}
                        className={`flex justify-center font-semibold ${
                            buttonSizeClasses[buttonSize]
                        } rounded-full transition bg-white-light text-dark hover:text-white hover:bg-primary dark:text-white-light dark:bg-[#191e3a] dark:hover:bg-primary ${
                            current_page === last_page ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        {ButtonRightIcon}
                    </button>
                </li>
                <li>
                    <button
                        type="button"
                        onClick={() => onPageChange(last_page)}
                        disabled={current_page === last_page}
                        className={`flex justify-center font-semibold ${
                            buttonSizeClasses[buttonSize]
                        } rounded-full transition bg-white-light text-dark hover:text-white hover:bg-primary dark:text-white-light dark:bg-[#191e3a] dark:hover:bg-primary ${
                            current_page === last_page ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        {DoubleRightButtonIcon}
                    </button>
                </li>
            </div>
        </ul>
    );
};

export interface PaginationInfoProps {
    from: number;
    to: number;
    total: number;
    itemName?: string;
    className?: string;
    infoClassName?: string;
    highlightClassName?: string;
}

export const PaginationInfo: React.FC<PaginationInfoProps> = ({ from, to, total, itemName = 'facilities', className, infoClassName, highlightClassName }) => {
    return (
        <div className={cn('text-xs text-gray-500', className)}>
            Total {itemName}: {total}, {from && to ? `Showing ${from} to ${to}` : ''}
            {/* <span className={cn('font-bold', highlightClassName)}>
                {from} - {to} of {total}{' '}
            </span>
            {infoClassName && <span className={cn('', infoClassName)}></span>} */}
        </div>
    );
};

export default Pagination;
