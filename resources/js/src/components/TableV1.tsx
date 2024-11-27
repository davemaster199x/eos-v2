import React, { useState } from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { cn } from '../utils/util';
import Dropdown from './Dropdown';
import { MenuDots } from 'solar-icon-set';
import { useQueryParamsContext } from '../Providers/QueryParamsProvider';
import Pagination, { PaginationInfo, PaginationInfoProps, PaginationProps } from './Pagination';
/**
 * Renders action buttons based on the specified variant.
 *
 * @param {object} row - The current row data.
 * @param {string} variant - The variant of action layout ('variant1' or 'variant2').
 * @param {array} actions - The actions to be rendered, provided externally through the `columns` prop.
 * @returns JSX element representing the action buttons.
 */
const renderActions = (row, variant, actions) => {
    const renderActionContent = (action) => {
        if (React.isValidElement(action.content)) {
            // If action.content is a React element (like the Delete component), wrap it with a div
            return <div>{action.content}</div>;
        } else {
            // Otherwise, render a button with the icon
            return (
                <button type="button" onClick={() => action.onClick(row)}>
                    {action.icon}
                </button>
            );
        }
    };

    switch (variant) {
        case 1:
            return (
                <td className="text-center">
                    <ul className="flex items-center justify-center gap-2">
                        {actions.map((action, index) => (
                            <li key={index}>
                                <Tippy content={action.tooltip}>{renderActionContent(action)}</Tippy>
                            </li>
                        ))}
                    </ul>
                </td>
            );
        case 2:
            return (
                <td className="text-center">
                    <div className="dropdown">
                        <Dropdown offset={[0, 5]} placement={`bottom-end`} button={<MenuDots />}>
                            <ul>
                                {actions.map((action, index) => (
                                    <li key={index}>{renderActionContent(action)}</li>
                                ))}
                            </ul>
                        </Dropdown>
                    </div>
                </td>
            );
        default:
            return (
                <td className="text-center">
                    <ul className="flex items-center justify-center gap-2">
                        {actions.map((action, index) => (
                            <li key={index}>
                                <Tippy content={action.tooltip}>{renderActionContent(action)}</Tippy>
                            </li>
                        ))}
                    </ul>
                </td>
            );
    }
};
/**
 * The Table component renders a dynamic table with customizable columns and data.
 *
 * @param {array} columns - The columns of the table, each containing header, accessor, and optional actionVariant and actions.
 * @param {array} data - The data to be displayed in the table rows.
 *
 * Columns array example:
 * [
        {
            header: () => <div className="custom-header">Name</div>,
            accessor: (row) => <strong>{row.law_firm_name}</strong>,
        },
        {
            header: 'Action (Variant 1)',
            actionVariant: 'variant1',
            actions: (row) => [
                {
                    tooltip: 'Edit',
                    icon: <Document />,
                    onClick: () => console.log('Edit', row),
                },
                {
                    tooltip: 'Delete',
                    icon: <Document />,
                    onClick: () => console.log('Delete', row),
                },
            ],
        },
        {
            header: 'Action (Variant 2)',
            actionVariant: 'variant2',
            actions: (row) => [
                {
                    label: 'Download',
                    onClick: () => console.log('Download', row),
                },
                {
                    label: 'Share',
                    onClick: () => console.log('Share', row),
                },
                {
                    label: 'Edit',
                    onClick: () => console.log('Edit', row),
                },
                {
                    label: 'Delete',
                    onClick: () => console.log('Delete', row),
                },
            ],
        },
 * ]
 */

type TTable = {
    columns: any;
    data: any;
    tabs?: any;
    pagination?: PaginationProps;
    paginationInfo?: PaginationInfoProps;
};

const Table = ({ columns, data, tabs, pagination, paginationInfo }: TTable) => {
    const { queryParams, setQueryParams } = useQueryParamsContext();
    const [activeTab, setActiveTab] = useState(tabs && tabs.length > 0 ? tabs[0].key : null);

    const getActiveColumns = () => {
        if (tabs && tabs.length > 0) {
            return columns[activeTab] || [];
        }
        return columns || [];
    };

    const getActiveData = () => {
        if (tabs && tabs.length > 0) {
            return data[activeTab] || [];
        }
        return data || [];
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab.key);
        setQueryParams((prevParams) => ({
            ...prevParams,
            ...tab.queryParams,
            page: 1, // Reset to first page when changing tabs
        }));
    };

    const renderTableContent = () => (
        <table className="w-full">
            <thead>
                <tr>
                    {getActiveColumns().map((column, index) => (
                        <th key={index} className={cn('bg-gray-100 p-4 text-left font-semibold', column.className)}>
                            {typeof column.header === 'function' ? column.header() : column.header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {getActiveData().map((row, rowIndex) => (
                    <tr key={rowIndex} className="border-b border-gray-200">
                        {getActiveColumns().map((column, colIndex) =>
                            column.actionVariant ? (
                                <React.Fragment key={`action-${colIndex}`}>{renderActions(row, column.actionVariant, column.actions(row))}</React.Fragment>
                            ) : (
                                <td key={colIndex} className={cn('p-4', column.className)}>
                                    {column.cell ? column.cell({ value: row[column.accessor], row }) : typeof column.accessor === 'function' ? column.accessor(row) : row[column.accessor]}
                                </td>
                            )
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    );

    return (
        <div className={cn('mb-5', '')}>
            {tabs && tabs.length > 0 && (
                <div className="mb-5 mt-3 flex flex-wrap border-b border-gray-200">
                    {tabs.map((tab) => (
                        <button
                            key={tab.key}
                            className={`relative -mb-[1px] flex items-center p-5 py-3 text-sm font-medium transition-all duration-300 before:absolute before:bottom-0 before:left-0 before:right-0 before:m-auto before:h-[1px] before:w-0 before:bg-primary before:transition-all before:duration-700 hover:text-primary hover:before:w-full ${
                                tab.active && 'text-primary before:!w-full'
                            }`}
                            onClick={() => handleTabChange(tab)}
                        >
                            {tab.icon && <span className="mr-2">{tab.icon}</span>}
                            {tab.label}
                        </button>
                    ))}
                </div>
            )}
            {pagination && <PaginationInfo {...(paginationInfo as any)} className={cn('w-full justify-start items-center gap-4 mb-4', paginationInfo?.className)} />}
            <div className="flex-1 text-sm">{renderTableContent()}</div>
            {pagination && <Pagination {...pagination} className={cn('w-full justify-center items-center gap-4', pagination?.className)} />}
        </div>
    );
};

export default Table;
