import React from 'react';

type Props = {
    row: any;
};

const FullName = ({ row }: Props) => {
    return <strong>{`${row?.first_name || ''} ${row?.middle_name || ''} ${row?.last_name || ''}`}</strong>;
};

export default FullName;
