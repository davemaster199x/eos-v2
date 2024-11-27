import React, { useEffect } from 'react';
import Table from '../../components/Table';
import { useQuery } from '@tanstack/react-query';
import Delete from '../../components/Delete';
import MRIAppointmentForm from '../EliteForms/MRIAppointmentForm.tsx';
import { useQueryParamsContext } from '../../Providers/QueryParamsProvider';
import { fetchMRIAppointments } from '../../api/mri-appointment';
import Edit from '../../components/Edit';
import { toast } from 'sonner';
import FullName from '../../components/FullName.tsx';
import StatusIndicator from '../../components/StatusIndicator';
import { formatDate, formatTime } from '../../utils/util';
import Loader from '../../components/Loader.tsx';

const queryKey = 'mri-appointments';
const MRIAppointmentView = () => {
    const { queryParams, setQueryParams } = useQueryParamsContext();
    const { isLoading, error, data: resData } = useQuery({ queryKey: [queryKey, queryParams], queryFn: () => fetchMRIAppointments() });
    const data = resData?.data || [];
    const editForm = <MRIAppointmentForm />;

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
            header: 'Facility',
            accessor: (row) => <label>{row.mri_facility.facility_name}</label>,
        },
        {
            header: 'Appt Date & Time',
            accessor: (row) => (
                <label>
                    {formatDate(row.appointment_date)} {formatTime(row.appointment_time)}
                </label>
            ),
        },
        {
            header: 'Notes',
            accessor: 'notes',
        },
        {
            header: 'Appointment Status',
            accessor: 'mri_appt_status',
        },
        {
            header: 'Actions',
            action: {
                variant: 1,
                actions: (row) => [
                    {
                        tooltip: 'Edit MRI Appointment',
                        content: <Edit data={data} toEdit={row} Form={editForm} queryKey={queryKey} />,
                    },
                    {
                        tooltip: 'Delete',
                        content: (
                            <Delete
                                form="mri-appointments"
                                id={row.id}
                                onSuccess={() => toast.success('MRI Appointment successfully deleted.')}
                                onError={(error) => toast.error('Failed to deactivate MRI Appointment: ' + error.message)}
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
                    itemName: 'MRI Appointment',
                    className: 'mb-4',
                }}
            />
        </div>
    );
};

export default MRIAppointmentView;
