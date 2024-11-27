import React from 'react';

const DynamicFormatter = ({ data, formatType, separator = ', ' }) => {
    if (!Array.isArray(data)) {
        console.error(`Unexpected ${formatType} structure:`, data);
        return <span>Error: Unexpected data structure</span>;
    }

    const formatters = {
        designatedOffice: (item) => {
            if (typeof item !== 'object' || !item.designated_office) {
                console.error(`Unexpected ${formatType} item structure:`, item);
                return 'Error: Invalid data';
            }
            const { full_address, office_name } = item.designated_office;
            return `${office_name}: ${full_address}`;
        },
        provider: (item) => {
            if (typeof item !== 'object' || !item.provider) {
                console.error(`Unexpected ${formatType} item structure:`, item);
                return 'Error: Invalid data';
            }
            const { first_name, middle_name, last_name } = item.provider;
            return `${first_name} ${middle_name || ''} ${last_name}`.trim();
        },

        facility: (item) => {
            if (typeof item !== 'object' || !item.facility) {
                console.error(`Unexpected ${formatType} item structure:`, item);
                return 'Error: Invalid data';
            }
            const { facility_name } = item.facility;
            return `${facility_name}`;
        },
        default: (item) => {
            if (typeof item !== 'object') {
                console.error(`Unexpected ${formatType} item structure:`, item);
                return 'Error: Invalid data';
            }
            return Object.values(item).join(' ');
        },
    };

    const formatter = formatters[formatType] || formatters.default;

    const formattedItems = data.map((item, index) => (
        <React.Fragment key={index}>
            {index > 0 && separator}
            <span>{formatter(item)}</span>
        </React.Fragment>
    ));

    return <div>{formattedItems}</div>;
};

export default DynamicFormatter;
