import React, { useEffect } from 'react';
import Table from '../../components/Table';
import { useQuery } from '@tanstack/react-query';
import Delete from '../../components/Delete';
import SurgeryCenterForm from '../EliteForms/SurgeryCenterForm';
import { fetchSurgeryCenters } from '../../api/surgery-centers.ts';
import { useQueryParamsContext } from '../../Providers/QueryParamsProvider.tsx';
import Avatar from '../../components/Avatar';
import FormatArray from '../../components/FormatArray.tsx';
import StatusIndicator from '../../components/StatusIndicator.tsx';
import Edit from '../../components/Edit.tsx';
import { toast } from 'sonner';
import FilePreviewWithTooltip from '../../components/FilePreviewWithTooltip';
import Loader from '../../components/Loader.tsx';

const queryKey = 'surgery-centers';
const SurgeryCenterView = () => {
    const { queryParams, setQueryParams } = useQueryParamsContext();
    const { isLoading, error, data: resData } = useQuery({ queryKey: [queryKey, queryParams], queryFn: () => fetchSurgeryCenters() });
    const data = resData?.data;
    const editForm = <SurgeryCenterForm />;

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
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    // Define the table columns
    const columns = [
        {
            accessor: (row) => <Avatar size="sm" src={row.photo_file?.preview_url} shape="rounded" className="min-w-[70px]" alt="Office Image of Surgery Center" />,
        },
        {
            header: 'Surgery Center Name',
            accessor: 'name',
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
            header: 'Affiliated Specialist',
            accessor: (row) => <FormatArray data={row?.surgeryCenterProviders} displayField="provider_name" />,
        },
        {
            header: 'Surgical Procedures',
            accessor: (row) => <FormatArray data={row.procedures_offered} displayField="name" />,
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
                        tooltip: 'Edit Surgery Center',
                        content: <Edit data={data} toEdit={row} Form={editForm} queryKey={queryKey} />,
                    },
                    {
                        tooltip: 'Delete',
                        content: (
                            <Delete
                                form="surgery-centers"
                                id={row.id}
                                onSuccess={() => toast.success('Surgery Center successfully deleted.')}
                                onError={(error) => toast.error('Failed to deactivate Surgery Center: ' + error.message)}
                            />
                        ),
                    },
                ],
            },
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
                    itemName: 'Surgery Centers',
                    className: 'mb-4',
                }}
            />
        </div>
    );
};

export default SurgeryCenterView;
