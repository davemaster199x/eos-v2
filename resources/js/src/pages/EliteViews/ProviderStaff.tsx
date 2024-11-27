import React, { useEffect } from 'react';
import Table from '../../components/Table';
import { useQuery } from '@tanstack/react-query';
import Delete from '../../components/Delete';
import { fetchProviderStaff } from '../../api/provider-staff';
import { useQueryParamsContext } from '../../Providers/QueryParamsProvider';
import FormatArray from '../../components/FormatArray';
import DynamicFormatter from '../../components/DynamicFormatter';
import FullName from '../../components/FullName';
import ProviderStaffForm from '../EliteForms/ProviderStaffForm';
import Edit from '../../components/Edit';
import { toast } from 'sonner';
import Loader from '../../components/Loader';

const queryKey = 'provider-staff';
const ProviderStaffView = () => {
    const { queryParams, setQueryParams } = useQueryParamsContext();

    const { isLoading, error, data: resData } = useQuery({ queryKey: [queryKey, queryParams], queryFn: () => fetchProviderStaff() });

    const data = resData?.data;
    const editForm = <ProviderStaffForm />;

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
            header: 'Affiliated Provider Type',
            accessor: 'provider_type',
        },
        {
            header: 'Provider',
            accessor: (row) => <DynamicFormatter data={row.provider_details} formatType="provider" />,
        },
        {
            header: 'Point of Contact for',
            accessor: (row) => <FormatArray data={row.point_of_contact_details} displayField="point_of_contact" />,
        },
        {
            header: 'Designated Office',
            accessor: (row) => <DynamicFormatter data={row.designated_office_details} formatType="designatedOffice" separator=" | " />,
        },
        {
            header: 'Actions',
            action: {
                variant: 1,
                actions: (row) => [
                    {
                        tooltip: 'Edit Provider Staff',
                        content: <Edit data={data} toEdit={row} Form={editForm} queryKey={queryKey} />,
                    },
                    {
                        tooltip: 'Delete',
                        content: (
                            <Delete
                                form="provider-staff"
                                id={row.id}
                                onSuccess={() => toast.success('Provider staff successfully deleted.')}
                                onError={(error) => toast.error('Failed to deactivate Provider Staff: ' + error.message)}
                            />
                        ),
                    },
                ],
            },
        },
    ];

    // If data is loading, display a loading message
    // if (isLoading || isFetching) {
    //     return (
    //         <TableSkeletonLoader
    //             columns={columns.length}
    //             rows={25} // Adjust this number as needed
    //             className="mb-4" // Add any additional classes you need
    //         />
    //     );
    // }

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
                    itemName: 'Provider Staff',
                    className: 'mb-4',
                }}
            />
        </div>
    );
};

export default ProviderStaffView;
