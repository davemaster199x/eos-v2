import React, { useEffect, useState } from 'react';
import Table from '../../components/Table';
import { Document } from 'solar-icon-set';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import Delete from '../../components/Delete';
import MRIFacilityForm from '../EliteForms/MRIFacilityForm';
import { useQueryParamsContext } from '../../Providers/QueryParamsProvider';
import { fetchMriFacility } from '../../api/mri-facility.ts';
import Avatar from '../../components/Avatar';
import StatusIndicator from '../../components/StatusIndicator.tsx';
import Edit from '../../components/Edit';
import { toast } from 'sonner';
import Loader from '../../components/Loader.tsx';

const queryKey = 'mri-facilities';
const MriFacilityView = () => {
    const { queryParams, setQueryParams } = useQueryParamsContext();
    const queryClient = useQueryClient();

    const { isLoading, error, data: resData } = useQuery({ queryKey: [queryKey, queryParams], queryFn: () => fetchMriFacility() });

    const data = resData?.data || [];
    const editForm = <MRIFacilityForm />;

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
            accessor: (row) => <Avatar size="sm" src={row.photo_file} shape="rounded" className="min-w-[70px]" alt="Office Image of Surgery Center" />,
        },
        {
            header: 'Facility Name',
            accessor: 'facility_name',
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
            header: 'Status',
            accessor: (row) => <StatusIndicator isActive={row.status} />,
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
                            form="mri-facilities"
                            id={row.id}
                            onSuccess={() => toast.success('MRI Facility successfully deleted.')}
                            onError={(error) => toast.error('Failed to deactivate MRI-Facilities: ' + error.message)}
                        />
                    ),
                },
            ],
        },
    ];

    // Define the pagination data, this is available if laravel pagination is enabled
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
                    itemName: 'MRI Facilities',
                    className: 'mb-4',
                }}
            />
        </div>
    );
};

export default MriFacilityView;
