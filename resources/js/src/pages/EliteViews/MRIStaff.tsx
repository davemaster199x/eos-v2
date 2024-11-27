import React, { useEffect } from 'react';
import Table from '../../components/Table';
import { useQuery } from '@tanstack/react-query';
import Delete from '../../components/Delete';
import MRIStaffForm from '../EliteForms/MRIStaffForm';
import { useQueryParamsContext } from '../../Providers/QueryParamsProvider';
import { fetchMRIStaff } from '../../api/mri-staff';
import FullName from '../../components/FullName';
import DynamicFormatter from '../../components/DynamicFormatter';
import Edit from '../../components/Edit';
import { toast } from 'sonner';
import Loader from '../../components/Loader';

const queryKey = 'api/mri-staffs';
const MRIStaffView = () => {
    const { queryParams, setQueryParams } = useQueryParamsContext();
    const { isLoading, isFetching, error, data: resData } = useQuery({ queryKey: [queryKey, queryParams], queryFn: () => fetchMRIStaff() });
    const data = resData?.data;
    const editForm = <MRIStaffForm />;

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
            header: 'Assigned Facility',
            accessor: (row) => <DynamicFormatter data={row.assigned_facilities} formatType="facility" separator=", " />,
        },
        {
            header: 'Status',
            accessor: (row) => (row.statu = 1 ? 'Active' : 'Inactive'),
        },
        {
            header: 'Actions',
            action: {
                variant: 1,
                actions: (row) => [
                    {
                        tooltip: 'Edit MRI Staff',
                        content: <Edit data={data} toEdit={row} Form={editForm} queryKey={queryKey} />,
                    },
                    {
                        tooltip: 'Delete',
                        content: (
                            <Delete
                                form="mri-staffs"
                                id={row.id}
                                onSuccess={() => toast.success('MRI Staff successfully deleted')}
                                onError={(error) => toast.error('Failed to deactivate MRI Staff: ' + error.message)}
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
                    itemName: 'MRI Staff ',
                    className: 'mb-4',
                }}
            />
        </div>
    );
};

export default MRIStaffView;
