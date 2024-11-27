import React, { useMemo } from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { cn } from '../utils/util';
import Dropdown from './Dropdown';
import { MenuDots } from 'solar-icon-set';
import { useQueryParamsContext } from '../Providers/QueryParamsProvider';
import Pagination, { PaginationInfo, PaginationInfoProps, PaginationProps } from './Pagination';

type ColumnDef<T = any> = {
    header?: string | (() => React.ReactNode);
    accessor?: keyof T | ((row: T) => React.ReactNode);
    action?: {
        variant?: number | string;
        actions?: (row: T) => any[];
        content?: React.ReactNode;
        onClick?: (row: T) => void;
        icon?: React.ReactNode;
    };
    actionVariant?: number | string;
    actions?: (row: T) => any[];
    className?: string;
    cell?: (props: { value: any; row: T }) => React.ReactNode;
    hide?: boolean | ((row: T, queryParams: Record<string, string>) => boolean);
};

type TabDef<T = any> = {
    key: string;
    label: string;
    icon?: React.ReactNode;
    isActive: (data: T[], queryParams: Record<string, string>) => boolean;
    onTabChange: () => void;
};

type TTable<T = any> = {
    columns: ColumnDef<T>[];
    data: T[];
    tabs?: TabDef<T>[];
    pagination?: PaginationProps;
    paginationInfo?: PaginationInfoProps;
};

function Table<T = any>({ columns, data, tabs, pagination, paginationInfo }: TTable<T>) {
    const { queryParams, setQueryParams } = useQueryParamsContext();

    const activeTab = useMemo(() => {
        if (!tabs) return null;
        return tabs.find((tab) => tab.isActive(data, queryParams as Record<string, string>))?.key || tabs[0].key;
    }, [tabs, data, queryParams]);

    const handleTabChange = (tab: TabDef<T>) => {
        tab.onTabChange();
    };
    const isColumnVisible = (column: ColumnDef<T>, row: T): boolean => {
        if (typeof column.hide === 'function') {
            return !column.hide(row, queryParams as Record<string, string>);
        }
        return !column.hide;
    };

    const filteredData = useMemo(() => {
        if (!activeTab || !tabs) return data;
        const activeTabDef = tabs.find((tab) => tab.key === activeTab);
        return activeTabDef ? data?.filter((row) => activeTabDef.isActive([row], queryParams as Record<string, string>)) : data;
    }, [data, activeTab, tabs, queryParams]);

    const renderActions = (row: T, variant: number | string | undefined, actions: any[]) => {
        const renderActionContent = (action: any) => (
            <Tippy content={action.tooltip}>{React.isValidElement(action.content) ? <div>{action.content}</div> : <button type="button">{action.icon}</button>}</Tippy>
        );

        switch (variant) {
            case 1:
                return (
                    <td className="text-center flex">
                        <ul className="flex items-center justify-center gap-2">
                            {actions.map((action, index) => (
                                <li key={index} className="flex justify-center items-center">
                                    {renderActionContent(action)}
                                </li>
                            ))}
                        </ul>
                    </td>
                );
            case 2:
                return (
                    <td className="text-center">
                        <div className="dropdown">
                            <Dropdown offset={[0, 5]} placement="bottom-end" button={<MenuDots />}>
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

    const renderTableContent = () => (
        <table className="w-full">
            <thead>
                <tr>
                    {columns.map(
                        (column, index) =>
                            isColumnVisible(column, {} as T) && (
                                <th key={index} className={cn('bg-gray-100 p-4 text-left font-semibold', column.className)}>
                                    {typeof column.header === 'function' ? column.header() : column.header}
                                </th>
                            )
                    )}
                </tr>
            </thead>
            <tbody>
                {filteredData?.map((row, rowIndex) => (
                    <tr key={rowIndex} className="border-b border-gray-200">
                        {columns.map(
                            (column, colIndex) =>
                                isColumnVisible(column, row) &&
                                (column.actionVariant || column.action ? (
                                    <React.Fragment key={`action-${colIndex}`}>
                                        {renderActions(row, column?.action?.variant || column.actionVariant, column?.action?.actions?.(row) || column.actions?.(row) || [])}
                                    </React.Fragment>
                                ) : (
                                    <td key={colIndex} className={cn('p-4', column.className)}>
                                        {column.cell
                                            ? column.cell({ value: row[column.accessor as keyof T], row })
                                            : typeof column.accessor === 'function'
                                            ? column.accessor(row)
                                            : (row[column.accessor as keyof T] as React.ReactNode)}
                                    </td>
                                ))
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    );

    return (
        <div className={cn('mb-5', '')}>
            {tabs && tabs.length > 0 && (
                <div className="mb-5 flex flex-wrap border-b border-gray-200">
                    {tabs.map((tab) => (
                        <button
                            key={tab.key}
                            className={`relative -mb-[1px] flex items-center p-5 py-3 text-sm font-medium transition-all duration-300 before:absolute before:bottom-0 before:left-0 before:right-0 before:m-auto before:h-[1px] before:w-0 before:bg-primary before:transition-all before:duration-700 hover:text-primary hover:before:w-full ${
                                activeTab === tab.key ? 'text-primary before:!w-full' : ''
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
}

export default Table;
