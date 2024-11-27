import React, { useEffect } from 'react';
import Table from '../../components/Table';
import { Document } from 'solar-icon-set';
import { useQuery } from '@tanstack/react-query';
import Delete from '../../components/Delete';
import PatientIntakeForm from '../EliteForms/PatientIntakeForm';
import { useQueryParamsContext } from '../../Providers/QueryParamsProvider';
import { fetchPatients } from '../../api/patient';
import FullName from '../../components/FullName';
import Edit from '../../components/Edit';
import FilePreviewWithTooltip from '../../components/FilePreviewWithTooltip';
import { formatDate } from '../../utils/util';
import { toast } from 'sonner';
import Loader from '../../components/Loader';

const queryKey = 'patients';
const PatientIntakeView = () => {
    const { queryParams, setQueryParams } = useQueryParamsContext();
    const { isLoading, error, data: resData } = useQuery({ queryKey: [queryKey, queryParams], queryFn: () => fetchPatients() });

    const data = resData?.data || [];
    const editForm = <PatientIntakeForm />;
    console.log(data);

    // Set the initial query params if they don't exist
    useEffect(() => {
        setQueryParams({
            page: queryParams.page || '1',
            limit: queryParams.limit || '25',
        });
    }, []);

    // If data is loading, display a loading message
    if (isLoading) return <Loader variant="spinner" />;
    // If there is an error, display an error message
    if (error) return <div>Error: {error.message}</div>;

    const columns = [
        {
            header: 'Full Name',
            accessor: (row) => <FullName row={row} />,
        },
        {
            header: 'Date of Birth',
            accessor: (row) => formatDate(row.date_of_birth),
        },
        {
            header: 'Date of Injury',
            accessor: (row) => formatDate(row.date_of_injury),
        },
        {
            header: 'Address',
            accessor: 'full_address',
        },
        {
            header: 'Referral Source',
            accessor: (row) => <label>{row.referralsource?.referral_source_name}</label>,
        },
        {
            header: 'Case Manager',
            accessor: (row) => {
                if (row.referral_source_staff) {
                    const firstName = row.referral_source_staff.first_name || '';
                    const lastName = row.referral_source_staff.last_name || '';
                    return <label>{`${firstName} ${lastName}`.trim()}</label>;
                }
                return <label>N/A</label>;
            },
        },
        {
            header: 'Law Firm',
            accessor: (row) => <label>{row.lawfirm.law_firm_name}</label>,
        },
        {
            header: 'Medical Records',
            accessor: (row) => (
                <div className="flex flex-wrap gap-2">
                    {row.medical_records && row.medical_records.length > 0 ? (
                        row.medical_records.map((record) => <FilePreviewWithTooltip key={record.id} fileUrl={record.medical_records_file} />)
                    ) : (
                        <span className="text-gray-500 italic">No files uploaded</span>
                    )}
                </div>
            ),
        },
        {
            header: 'Action',
            actionVariant: 'variant1',
            actions: (row) => [
                {
                    tooltip: 'Edit',
                    icon: <Document />,
                    content: <Edit data={data} toEdit={row} Form={editForm} queryKey={queryKey} />,
                },
                {
                    tooltip: 'Delete',
                    content: (
                        <Delete
                            form="patients"
                            id={row.id}
                            onSuccess={() => toast.success('Patient successfully deleted.')}
                            onError={(error) => toast.error('Failed to deactivate Patients: ' + error.message)}
                        />
                    ),
                },
            ],
        },
    ];

    const currentPage = resData?.current_page;
    const lastPage = resData?.last_page;
    const total = resData?.total;
    const perPage = resData?.per_page;
    const from = resData?.from;
    const to = resData?.to;

    return (
        <div className="p-6">
            <Table
                columns={columns}
                data={data}
                pagination={{
                    paginationData: {
                        current_page: currentPage,
                        last_page: lastPage,
                        total: total,
                        per_page: perPage,
                    },
                    onPageChange: (page) => {
                        setQueryParams({ ...queryParams, page: String(page) });
                    },
                    buttonSize: 'sm',
                    className: 'mt-6 ',
                }}
                paginationInfo={{
                    from: from,
                    to: to,
                    total: total,
                    itemName: 'Patients',
                    className: 'mb-4',
                }}
            />
        </div>
    );
};

export default PatientIntakeView;
