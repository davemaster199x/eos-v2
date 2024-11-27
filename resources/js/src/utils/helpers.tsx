/**
 * An interface to define the props for the createSelectInitialValue function.
 */
/**
 * Creates an initial value for a select component, given some data.
 *
 * If the data is a string, it will be used as both the label and value.
 * If the data is an object, the labelField and valueField props will be used
 * to determine what fields to use as the label and value.
 *
 * @param props An object containing the data and optional labelField and valueField
 * @returns An object with a label and value, or null if the data is not a string or object
 */
export const createSelectObj = (data: string | any[], id = null, labelField = 'id', valueField = 'id'): { label: string; value: string } | null => {
    if (Array.isArray(data) && id && labelField && valueField) {
        const found = data.find((d) => d.id === +id);
        if (!found) return null;
        return { label: found[labelField], value: found[valueField] };
    }
    if (typeof data === 'string') {
        return { label: data, value: data };
    }
    return null;
};

/**
 * Maps over an array and returns an array of objects with label and value properties.
 *
 * @param {T[]} data - The data to map over
 * @param {string | string[] | ((item: T) => string)} [labelField='id'] - The field name to use as the label
 * @param {string | string[] | ((item: T) => string)} [valueField='id'] - The field name to use as the value
 * @returns {Array<{ label: string; value: string }>}
 */
export const createSelectArr = <T,>(
    data: T[],
    labelField: string | string[] | ((item: T) => string) = 'id',
    valueField: string | string[] | ((item: T) => string) = 'id'
): Array<{ label: string | T; value: string | T }> => {
    if (!data || !labelField || !valueField) {
        return [];
    }

    return data?.map((item) => {
        const getField = (fieldName: string | string[]): string => {
            let obj = item;
            if (Array.isArray(fieldName)) {
                for (const key of fieldName) {
                    if (obj === null || obj === undefined) {
                        return '';
                    }
                    obj = obj[key] ? obj[key] : null;
                }
            } else {
                obj = fieldName.split('.').reduce((o, k) => o && o[k], item);
            }

            return typeof obj === 'string' ? obj : '';
        };

        return {
            label: typeof labelField === 'function' ? labelField(item) : getField(labelField) || item['label'] || '',
            value: typeof valueField === 'function' ? valueField(item) : getField(valueField) || item['value'] || '',
        };
    });
};

/**
 * Maps over an array and returns an array of values from the given field.
 *
 *
 * @param {any[]} data - The data to map over
 * @param {string} field - The field name to get the value from
 * @returns {any[]}
 *
 * @example
 * const data = [
 *     { name: 'John Doe', age: 24 },
 *     { name: 'Jane Doe', age: 22 },
 *     { name: 'Bob Smith', age: null },
 * ];
 *
 * const ages = mapArr(data, 'age');
 * // ages is [24, 22, null]
 */
export const mapArr = (data, field) => {
    if (!data || !field) {
        return [];
    }

    return data.map((item) => {
        if (typeof item !== 'object' || item === null) {
            return [];
        }

        const value = item[field];
        if (value === null || value === undefined) {
            return [];
        }

        return value;
    });
};
import { parse, format, setHours, setMinutes, setSeconds } from 'date-fns';

/**
 * Format the appointment date and time using date-fns.
 *
 * @param {string} dateStr - The appointment date string
 * @param {string} timeStr - The appointment time string
 * @param {string} [formatStr='MMM d, yyyy h:mm a'] - The desired output format
 * @returns {string} The formatted date and time, or 'N/A' if invalid
 */
export function formatAppointmentDateTime(dateStr, timeStr, formatStr = 'MMM d, yyyy h:mm a') {
    if (!dateStr || !timeStr) {
        return 'N/A';
    }

    try {
        // Parse the date and time
        const dateObj = parse(dateStr, "yyyy-MM-dd'T'HH:mm:ss.SSSSSS'Z'", new Date());
        const timeObj = parse(timeStr, "yyyy-MM-dd'T'HH:mm:ss.SSSSSS'Z'", new Date());

        // Combine date and time
        const combinedDateTime = setSeconds(setMinutes(setHours(dateObj, timeObj.getHours()), timeObj.getMinutes()), timeObj.getSeconds());

        // Format the combined date and time
        return format(combinedDateTime, formatStr);
    } catch (error) {
        console.error('Error formatting appointment date/time:', error);
        return 'N/A';
    }
}

// Example usage:
// const formattedDateTime = formatAppointmentDateTime("2024-09-27T00:00:00.000000Z", "2024-09-27T22:53:00.000000Z");
// console.log(formattedDateTime); // Output: Sep 27, 2024 10:53 PM
