import React, { useEffect } from 'react';
import Table from '../../components/Table';
import { useQuery } from '@tanstack/react-query';
import Delete from '../../components/Delete';
import { useQueryParamsContext } from '../../Providers/QueryParamsProvider';
import { fetchProviderOffices } from '../../api/provider';
import ProviderOfficeForm from '../EliteForms/ProviderOfficeForm';
import StatusIndicator from '../../components/StatusIndicator';
import PayStatus from '../../components/PayStatus';
import FormatArray from '../../components/FormatArray.tsx';
import Avatar from '../../components/Avatar';
import FullName from '../../components/FullName.tsx';
import Edit from '../../components/Edit.tsx';
import { SpecialistIcon, TherapistIcon } from '../../components/Icons/index.tsx';
import { toast } from 'sonner';
import FilePreviewWithTooltip from '../../components/FilePreviewWithTooltip';
import Loader from '../../components/Loader.tsx';

const queryKey = 'provider-offices';
const ProviderOfficeView = () => {
    const { queryParams, setQueryParams } = useQueryParamsContext();
    const {
        isLoading,
        isFetching,
        error,
        data: resData,
        refetch,
    } = useQuery({
        queryKey: [queryKey, queryParams, queryParams.provider_type],
        queryFn: () => fetchProviderOffices(queryParams.provider_type),
    });

    const data = resData?.data;
    const editForm = <ProviderOfficeForm />;
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
            label: 'Specialist Offices',
            icon: <SpecialistIcon />,
            isActive: (data, queryParams) => queryParams.provider_type === 'Specialist',
            onTabChange: () => {
                setQueryParams({ ...queryParams, provider_type: 'Specialist', page: '1' });
                refetch();
            },
        },
        {
            key: 'therapist',
            label: 'Therapist Offices',
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
            accessor: (row) => <Avatar size="sm" src={row.photo_file?.preview_url} shape="rounded" className="min-w-[70px]" alt="Office Image of Surgery Center" />,
        },
        {
            header: 'Office Name',
            accessor: 'office_name',
        },
        {
            header: 'Address',
            accessor: 'full_address',
        },
        {
            header: 'Phone',
            accessor: 'phone',
        },
        {
            header: 'Email',
            accessor: 'email',
        },
        {
            header: 'Provider',
            accessor: (row) => <FullName row={row?.provider} />,
        },
        {
            header: 'Specialties Offered',
            accessor: (row) => <FormatArray data={row?.po_specialty_detail} displayField="name" />,
            hide: queryParams.provider_type === 'Therapist',
        },
        {
            header: 'Therapist Provided',
            accessor: (row) => <FormatArray data={row?.po_therapies_provided} displayField="name" />,
            hide: queryParams.provider_type === 'Specialist',
        },
        {
            header: 'Pay Status',
            accessor: (row) => <PayStatus status={row?.pay_status} />,
            hide: queryParams.provider_type === 'Specialist',
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
                        tooltip: 'Edit Provider Office',
                        content: <Edit data={data} toEdit={row} Form={editForm} queryKey={queryKey} />,
                    },
                    {
                        tooltip: 'Delete',
                        content: (
                            <Delete
                                form="provider-offices"
                                id={row.id}
                                onSuccess={() => toast.success('Provider office successfully deleted.')}
                                onError={(error) => toast.error('Failed to deactivate Provider-office: ' + error.message)}
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
                    itemName: queryParams.provider_type == 'Specialist' ? 'Specialist Offices' : 'Therapist Offices',
                    className: 'mb-4',
                }}
            />
        </div>
    );
};

export default ProviderOfficeView;
