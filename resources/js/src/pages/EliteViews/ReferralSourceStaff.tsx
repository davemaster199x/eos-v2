import React, { useEffect } from 'react';
import Table from '../../components/Table';
import { useQuery } from '@tanstack/react-query';
import Delete from '../../components/Delete';
import { useQueryParamsContext } from '../../Providers/QueryParamsProvider';
import ReferralSourceStaffForm from '../EliteForms/ReferralSourceStaffForm';
import { fetchReferralSourceStaff } from '../../api/referral-source';
import FullName from '../../components/FullName';
import Edit from '../../components/Edit';
import { toast } from 'sonner';
import Loader from '../../components/Loader';

const queryKey = 'referral-source-staff';
const ReferralSourceStaffView = () => {
    const { queryParams, setQueryParams } = useQueryParamsContext();
    const { isLoading, error, data: resData } = useQuery({ queryKey: [queryKey, queryParams], queryFn: () => fetchReferralSourceStaff() });
    const data = resData?.data || [];
    const editForm = <ReferralSourceStaffForm />;

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
            header: 'Full Name',
            accessor: (row) => <FullName row={row} />,
        },
        {
            header: 'Title',
            accessor: 'title',
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
            header: 'Actions',
            action: {
                variant: 1,
                actions: (row) => [
                    {
                        tooltip: 'Edit Referral Source Staff',
                        content: <Edit data={data} toEdit={row} Form={editForm} queryKey={queryKey} />,
                    },
                    {
                        tooltip: 'Delete',
                        content: (
                            <Delete
                                form="referral-source-staff"
                                id={row.id}
                                onSuccess={() => toast.success('Referral source staff successfully deleted.')}
                                onError={(error) => toast.error('Failed to deactivate Referral Source Staff: ' + error.message)}
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
                    itemName: 'Referral Source Staff',
                    className: 'mb-4',
                }}
            />
        </div>
    );
};

export default ReferralSourceStaffView;
