import React, { useEffect } from 'react';
import Table from '../../components/Table';
import { useQuery } from '@tanstack/react-query';
import Delete from '../../components/Delete';
import ReferralSource from '../EliteForms/ReferralSource';
import { useQueryParamsContext } from '../../Providers/QueryParamsProvider';
import { fetchReferralSource } from '../../api/referral-source';
import Edit from '../../components/Edit';
import { toast } from 'sonner';
import Loader from '../../components/Loader';

const queryKey = 'referral-source';
const ReferralSourceView = () => {
    const { queryParams, setQueryParams } = useQueryParamsContext();
    const { isLoading, error, data: resData } = useQuery({ queryKey: [queryKey, queryParams], queryFn: () => fetchReferralSource() });
    const data = resData?.data || [];
    const editForm = <ReferralSource />;

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

    const columns = [
        {
            header: 'Referral Source Name',
            accessor: 'referral_source_name',
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
            header: 'Business Type',
            accessor: 'business_type',
        },
        {
            header: 'Actions',
            action: {
                variant: 1,
                actions: (row) => [
                    {
                        tooltip: 'Edit Referral Source',
                        content: <Edit data={data} toEdit={row} Form={editForm} queryKey={queryKey} />,
                    },
                    {
                        tooltip: 'Delete',
                        content: (
                            <Delete
                                form="referral-source"
                                id={row.id}
                                onSuccess={() => toast.success('Referral Source successfully deleted.')}
                                onError={(error) => toast.error('Failed to deactivate Referral Source: ' + error.message)}
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
                    itemName: 'Referral Source',
                    className: 'mb-4',
                }}
            />
        </div>
    );
};

export default ReferralSourceView;
