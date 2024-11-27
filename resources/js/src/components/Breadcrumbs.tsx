import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
    const location = useLocation();
    const pathname = location.pathname;
    const pathnames = pathname.split('/').filter((x) => x);

    return (
        <nav aria-label="breadcrumb" className="mb-8">
            <ol className="flex text-gray-500 font-semibold dark:text-white-dark">
                <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                </li>
                {pathnames.map((value, index) => {
                    const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                    return (
                        <li key={to} className={`before:content-['/'] before:px-1.5`}>
                            {index === pathnames.length - 1 ? (
                                <span className="text-[#4361EE] dark:text-white-light hover:text-black/70 dark:hover:text-white-light/70 cursor-pointer">{formatBreadcrumbLabel(value)}</span>
                            ) : (
                                <Link to={to}>{formatBreadcrumbLabel(value)}</Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

const formatBreadcrumbLabel = (label) => {
    return label
        .split('-') // Split the string by hyphen (or spaces if needed)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
        .join(' '); // Join the words back together with a space
};

export default Breadcrumbs;
