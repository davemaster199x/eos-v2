import React, { useEffect } from 'react';
import Table from '../../components/Table';
import { useQuery } from '@tanstack/react-query';
import Delete from '../../components/Delete';
import { useQueryParamsContext } from '../../Providers/QueryParamsProvider';
import { fetchAppointmentRequests } from '../../api/appointment-request.ts';
import StatusIndicator from '../../components/StatusIndicator';
import PayStatus from '../../components/PayStatus';
import FormatArray from '../../components/FormatArray.tsx';
import FullName from '../../components/FullName.tsx';
import Edit from '../../components/Edit.tsx';
import { SpecialistIcon, TherapistIcon } from '../../components/Icons';
import AppointmentRequestForm from '../EliteForms/AppointmentRequestForm.tsx';
import FilePreviewWithTooltip from '../../components/FilePreviewWithTooltip';
import { toast } from 'sonner';
import Loader from '../../components/Loader.tsx';

const queryKey = 'appointment-requests';
export const AppointmentRequestView = () => {
    const { queryParams, setQueryParams } = useQueryParamsContext();
    const {
        isLoading,
        isFetching,
        error,
        data: resData,
        refetch,
    } = useQuery({
        queryKey: [queryKey, queryParams, queryParams.provider_type],
        queryFn: () => fetchAppointmentRequests(queryParams.provider_type),
    });

    const data = resData?.data;
    const editForm = <AppointmentRequestForm />;

    useEffect(() => {
        setQueryParams({
            page: queryParams.page || '1',
            limit: queryParams.limit || '25',
            provider_type: queryParams.provider_type || 'Specialist',
        });
    }, []);

    // If data is loading, display a loading message
    if (isLoading) return <Loader variant="spinner" />;
    // If there is an error, display an error message
    if (error) return <div>Error: {error.message}</div>;

    const tabs = [
        {
            key: 'specialist',
            label: 'To Specialists',
            icon: <SpecialistIcon />,
            isActive: (data, queryParams) => queryParams.provider_type === 'Specialist',
            onTabChange: () => {
                setQueryParams({ ...queryParams, provider_type: 'Specialist', page: '1' });
                refetch();
            },
        },
        {
            key: 'therapist',
            label: 'To Therapists',
            icon: <TherapistIcon />,
            isActive: (data, queryParams) => queryParams.provider_type === 'Therapist',
            onTabChange: () => {
                setQueryParams({ ...queryParams, provider_type: 'Therapist', page: '1' });
                refetch();
            },
        },
    ];

    const columns = [
        {
            header: 'Patient',
            accessor: (row) => <FullName row={row?.patient_intake} />,
        },
        {
            header: 'Appt Type',
            accessor: (row) => (queryParams.provider_type === 'Specialist' ? <span>{row.appointment_types[0]?.name}</span> : <FormatArray data={row?.appointment_types} displayField="name" />),
        },
        {
            header: 'Specialist Requested',
            accessor: (row) => <FullName row={row?.provider} />,
            hide: queryParams.provider_type === 'Therapist',
        },
        {
            header: 'Therapist Provided',
            accessor: (row) => <FullName row={row?.provider} />,
            hide: queryParams.provider_type === 'Specialist',
        },
        {
            header: 'High Priority',
            accessor: (row) => (row.high_priority ? 'Yes' : 'No'),
        },
        {
            header: 'Attached Medical Records',
            accessor: (row) => <FilePreviewWithTooltip fileUrl={row?.patient_medical_records} />,
        },

        {
            header: 'Notes',
            accessor: (row) => <PayStatus status={row?.pay_status} />,
        },
        {
            header: 'Status',
            accessor: (row) => <StatusIndicator isActive={row.status} />,
        },
        {
            header: 'Actions',
            action: {
                variant: 1,
                actions: (row) => [
                    {
                        tooltip: 'Edit Appointment Request',
                        content: <Edit data={data} toEdit={row} Form={editForm} queryKey={queryKey} />,
                    },
                    {
                        tooltip: 'Delete',
                        content: (
                            <Delete
                                form="appointment-requests"
                                id={row.id}
                                onSuccess={() => toast.success('Appointment request successfully deleted.')}
                                onError={(error) => toast.error('Failed to deactivate Appointment Request : ' + error.message)}
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
                tabs={tabs}
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
                    className: 'mt-6',
                }}
                paginationInfo={{
                    from: from,
                    to: to,
                    total: total,
                    itemName: 'Appointment Requests',
                    className: 'mb-4',
                }}
            />
        </div>
    );
};
