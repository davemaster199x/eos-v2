import React from 'react';

interface FormatArrayProps<T extends object> {
    data: T[];
    displayField: keyof T;
    emptyMessage?: string;
    separator?: string;
    className?: string;
    itemClassName?: string;
    renderItem?: (item: T) => React.ReactNode;
    asList?: boolean;
}

/**
 * Displays an array of objects, with each item rendered as a string
 * and separated by a separator. If the array is empty, displays a
 * message. Can also be used to render the array as a list.
 *
 * @param {T[]} data - The array of objects to display
 * @param {keyof T} displayField - The field to display from each object
 * @param {string} [emptyMessage='No items to display'] - The message to
 *   display if the array is empty
 * @param {string} [separator=', '] - The separator to use between items
 * @param {string} [className=''] - The className to apply to the container
 * @param {string} [itemClassName=''] - The className to apply to each item
 * @param {(item: T) => React.ReactNode} [renderItem] - A function to use to
 *   render each item. If not provided, will use the value of the
 *   displayField as a string.
 * @param {boolean} [asList=false] - Whether to render as a list instead of
 *   a string
 * @returns {React.ReactNode} The rendered array
 */
export function FormatArray<T extends object>({
    data,
    displayField,
    emptyMessage = 'No items to display',
    separator = ', ',
    className = '',
    itemClassName = '',
    renderItem,
    asList = false,
}: FormatArrayProps<T>) {
    if (data?.length === 0) {
        return <div className={className}>{emptyMessage}</div>;
    }

    const renderDefault = (item: T) => {
        const value = item[displayField];
        return typeof value === 'string' || typeof value === 'number' ? String(value) : '';
    };

    const itemRenderer = renderItem || renderDefault;

    if (asList) {
        return (
            <ul className={className}>
                {data?.map((item, index) => (
                    <li key={index} className={itemClassName}>
                        {itemRenderer(item)}
                    </li>
                ))}
            </ul>
        );
    }

    return (
        <div className={className}>
            {data?.map((item, index) => (
                <React.Fragment key={index}>
                    <span className={itemClassName}>{itemRenderer(item)}</span>
                    {index < data?.length - 1 && separator}
                </React.Fragment>
            ))}
        </div>
    );
}

export default FormatArray;
