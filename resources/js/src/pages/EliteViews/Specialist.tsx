import React, { useEffect } from 'react';
import Table from '../../components/Table';
import { useQuery } from '@tanstack/react-query';
import FilePreviewWithTooltip from '../../components/FilePreviewWithTooltip';
import Delete from '../../components/Delete';
import ProviderForm from '../EliteForms/ProviderForm';
import { useQueryParamsContext } from '../../Providers/QueryParamsProvider';
import { fetchProviders } from '../../api/provider';
import FormatArray from '../../components/FormatArray';
import PayStatus from '../../components/PayStatus';
import FullName from '../../components/FullName';
import Edit from '../../components/Edit';
import { toast } from 'sonner';
import Avatar from '../../components/Avatar';
import Loader from '../../components/Loader';

const queryKey = 'provider';
const SpecialistView = () => {
    const { queryParams, setQueryParams } = useQueryParamsContext();
    const { isLoading, isFetching, error, data: resData } = useQuery({ queryKey: [queryKey, queryParams], queryFn: () => fetchProviders('Specialist') });
    const data = resData?.data as any;
    const editForm = <ProviderForm formName="Specialist" />;
    // Set the initial query params if they don't exist
    useEffect(() => {
        setQueryParams({
            page: queryParams.page || '1',
            limit: queryParams.limit || '25',
        });
    }, []);

    if (isLoading) return <Loader variant="spinner" />;
    // If there is an error, display an error message
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const columns = [
        {
            accessor: (row) => <Avatar size="sm" src={row.headshot?.download_url} shape="rounded" className="min-w-[70px]" alt="Office Image of Provider" />,
        },
        {
            header: 'Name',
            accessor: (row) => <FullName row={row} />,
        },
        {
            header: 'Provider Type',
            accessor: 'provider_type',
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
            header: 'Specialties',
            accessor: (row) => <FormatArray data={row.specialties} displayField="name" />,
        },
        {
            header: 'Pay Status',
            accessor: (row) => <PayStatus status={row.pay_status} />,
        },
        {
            header: 'Actions',
            action: {
                variant: 1,
                actions: (row) => [
                    {
                        tooltip: 'Edit Specialist',
                        content: <Edit data={data} toEdit={row} Form={editForm} queryKey={[queryKey, queryParams]} />,
                    },
                    {
                        tooltip: 'Delete',
                        content: (
                            <Delete
                                form="providers"
                                id={row.id}
                                onSuccess={() => toast.success('Specialist successfully deleted.')}
                                onError={(error) => alert('Failed to deactivate Specialist: ' + error.message)}
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
                    itemName: 'Specialists ',
                    className: 'mb-4',
                }}
            />
        </div>
    );
};

export default SpecialistView;
