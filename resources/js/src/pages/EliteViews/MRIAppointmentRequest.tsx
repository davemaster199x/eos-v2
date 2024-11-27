import React, { useEffect } from 'react';
import Table from '../../components/Table';
import { useQuery } from '@tanstack/react-query';
import Delete from '../../components/Delete';
import { useQueryParamsContext } from '../../Providers/QueryParamsProvider';
import Edit from '../../components/Edit';
import { toast } from 'sonner';
import MRIAppointmentRequestForm from '../EliteForms/MRIAppointmentRequestForm';
import { fetchMRIAppointmentRequests } from '../../api/mri-appointment-request';
import FullName from '../../components/FullName';
import FilePreviewWithTooltip from '../../components/FilePreviewWithTooltip';
import StatusIndicator from '../../components/StatusIndicator';
import Loader from '../../components/Loader';

const queryKey = 'mri-appointment-requests';

// api/{endpoint}
const endpoint = 'mri-appointment-requests';

// used for labels
const titleSingular = 'MRI Appointment Request';
const titlePlural = 'MRI Appointment Requests';
const MRIAppointmentRequestView = () => {
    const { queryParams, setQueryParams } = useQueryParamsContext();
    const { isLoading, error, data: resData } = useQuery({ queryKey: [queryKey, queryParams], queryFn: () => fetchMRIAppointmentRequests() });
    const data = resData?.data || [];
    const editForm = <MRIAppointmentRequestForm />;

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
            header: 'Patient',
            accessor: (row) => <FullName row={row?.patient} />,
        },
        {
            header: 'High Priority',
            accessor: (row) => (row.high_priority ? 'Yes' : 'No'),
        },
        {
            header: 'Facility',
            accessor: (row) => row.facility?.facility_name,
        },
        {
            header: 'Medical Records',
            accessor: (row) => (
                <div className="flex flex-col flex-wrap gap-2">
                    {row?.patient?.medical_records && row?.patient?.medical_records.length > 0
                        ? row?.patient?.medical_records.map((record) => <FilePreviewWithTooltip key={record.id} fileUrl={record.medical_records_file} />)
                        : null}
                </div>
            ),
        },
        {
            header: 'Notes',
            accessor: 'notes',
        },

        {
            header: 'Status ',
            accessor: 'request_status',
        },
        {
            header: 'Actions',
            action: {
                variant: 1,
                actions: (row) => [
                    {
                        tooltip: `Edit ${titleSingular}`,
                        content: <Edit data={data} toEdit={row} Form={editForm} queryKey={queryKey} />,
                    },
                    {
                        tooltip: 'Delete',
                        content: (
                            <Delete
                                form={endpoint}
                                id={row.id}
                                onSuccess={() => toast.success(`${titleSingular} successfully deleted.`)}
                                onError={(error) => toast.error(`Failed to deactivate ${titleSingular.toLowerCase()}:` + error.message)}
                            />
                        ),
                    },
                ],
            },
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
                    itemName: titlePlural,
                    className: 'mb-4',
                }}
            />
        </div>
    );
};

export default MRIAppointmentRequestView;
