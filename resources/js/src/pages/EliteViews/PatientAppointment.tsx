import React, { useEffect } from 'react';
import Table from '../../components/Table';
import { useQuery } from '@tanstack/react-query';
import Delete from '../../components/Delete';
import { useQueryParamsContext } from '../../Providers/QueryParamsProvider';
import Edit from '../../components/Edit';
import { toast } from 'sonner';
import FullName from '../../components/FullName';
import PatientAppointmentForm from '../EliteForms/PatientAppointmentForm';
import { SpecialistIcon, TherapistIcon } from '../../components/Icons';
import FormatArray from '../../components/FormatArray';
import { fetchPatientAppointments } from '../../api/patient-appointment';
import FilePreviewWithTooltip from '../../components/FilePreviewWithTooltip';
import { formatAppointmentDateTime } from '../../utils/helpers';
import Loader from '../../components/Loader';

const queryKey = 'patient-appointment';

// api/{endpoint}
const endpoint = 'patient-appointments';

// used for labels
const titleSingular = 'Patient Appointment';
const titlePlural = 'Patient Appointments';
const PatientAppointmentView = () => {
    const { queryParams, setQueryParams } = useQueryParamsContext();
    const { isLoading, refetch, error, data: resData } = useQuery({ queryKey: [queryKey, queryParams], queryFn: () => fetchPatientAppointments(queryParams.provider_type) });
    const data = resData?.data || [];
    const editForm = <PatientAppointmentForm />;

    // Set the initial query params if they don't exist
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
            accessor: (row) => <FullName row={row?.patient} />,
        },
        {
            header: 'Appt Types',
            accessor: (row) => <FormatArray data={row?.appointment_types} displayField="name" />,
        },
        {
            header: 'Specialist Requested',
            accessor: (row) => <FullName row={row?.provider} />,
            hide: queryParams.provider_type === 'Therapist',
        },
        {
            header: 'Therapist Requested',
            accessor: (row) => <FullName row={row?.provider} />,
            hide: queryParams.provider_type === 'Specialist',
        },
        {
            header: 'Office',
            accessor: (row) => row?.provider_office?.office_name,
        },

        {
            header: 'Date & Time ',
            accessor: (row) => formatAppointmentDateTime(row?.appointment_date, row?.appointment_time),
        },
        {
            header: 'Attached Lien ',
            accessor: (row) => <FilePreviewWithTooltip fileUrl={row.lien_file} />,
        },
        {
            header: 'Special Notes ',
            accessor: 'special_notes',
        },
        {
            header: 'Status ',
            accessor: 'appointment_status',
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
                                query_Key={[queryKey, queryParams]}
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

export default PatientAppointmentView;
