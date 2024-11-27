import React, { useEffect } from 'react';
import Table from '../../components/Table';
import { useQuery } from '@tanstack/react-query';
import Delete from '../../components/Delete';
import LawFirmForm from '../EliteForms/LawFirmForm';
import { useQueryParamsContext } from '../../Providers/QueryParamsProvider';
import { fetchLawfirms } from '../../api/lawfirm';
import Edit from '../../components/Edit';
import { toast } from 'sonner';
import Loader from '../../components/Loader';

const queryKey = 'law-firms';
const LawFirmsView = () => {
    const { queryParams, setQueryParams } = useQueryParamsContext();
    const { isLoading, error, data: resData } = useQuery({ queryKey: [queryKey, queryParams], queryFn: () => fetchLawfirms() });
    const data = resData?.data || [];
    const editForm = <LawFirmForm />;

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
            header: 'Name',
            accessor: (row) => <strong>{row.law_firm_name}</strong>,
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
            header: 'Type',
            accessor: 'firm_type',
        },
        {
            header: 'Actions',
            action: {
                variant: 1,
                actions: (row) => [
                    {
                        tooltip: 'Edit Law Firms',
                        content: <Edit data={data} toEdit={row} Form={editForm} queryKey={queryKey} />,
                    },
                    {
                        tooltip: 'Delete',
                        content: (
                            <Delete
                                form="law-firms"
                                id={row.id}
                                onSuccess={() => toast.success('Law firm successfully deleted.')}
                                onError={(error) => toast.error('Failed to deactivate Law-Firm: ' + error.message)}
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
                    itemName: 'Law Firm',
                    className: 'mb-4',
                }}
            />
        </div>
    );
};

export default LawFirmsView;
