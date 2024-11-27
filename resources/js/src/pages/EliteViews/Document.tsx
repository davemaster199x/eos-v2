import React, { useEffect } from 'react';
import Table from '../../components/Table';
import { useQuery } from '@tanstack/react-query';
import Delete from '../../components/Delete';
import { useQueryParamsContext } from '../../Providers/QueryParamsProvider';
import Edit from '../../components/Edit';
import { toast } from 'sonner';
import { fetchDocuments } from '../../api/document';
import FullName from '../../components/FullName';
import FilePreviewWithTooltip from '../../components/FilePreviewWithTooltip';
import StatusIndicator from '../../components/StatusIndicator';
import DocumentForm from '../EliteForms/DocumentForm';
import Loader from '../../components/Loader';

const queryKey = 'documents';

// api/{endpoint}
const endpoint = 'documents';

// used for labels
const titleSingular = 'Document';
const titlePlural = 'Documents';
const DocumentView = () => {
    const { queryParams, setQueryParams } = useQueryParamsContext();
    const { isLoading, error, data: resData } = useQuery({ queryKey: [queryKey, queryParams], queryFn: () => fetchDocuments() });
    const data = resData?.data || [];
    const editForm = <DocumentForm />;

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
            header: 'Patient',
            accessor: (row) => <FullName row={row?.patient_intake} />,
        },
        {
            header: 'Document Type',
            accessor: 'document_type',
        },
        {
            header: 'Attached Files',
            accessor: (row) => (
                <div className="flex flex-col flex-wrap gap-2">
                    {row?.documents && row?.documents.length > 0 ? row?.documents?.map((doc) => <FilePreviewWithTooltip key={doc.id} fileUrl={doc.document_file} />) : null}
                </div>
            ),
        },
        {
            header: 'Notes',
            accessor: 'notes',
        },

        {
            header: 'Status ',
            accessor: 'doc_status',
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
                    itemName: titlePlural,
                    className: 'mb-4',
                }}
            />
        </div>
    );
};

export default DocumentView;
