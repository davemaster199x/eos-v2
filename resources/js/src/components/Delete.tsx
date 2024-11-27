import React, { forwardRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ClipboardRemove, TrashBinMinimalistic } from 'solar-icon-set';
import { getCsrfToken } from './Csrf';

interface DeleteProps {
    form: string;
    id: number;
    onSuccess?: () => void;
    onError?: (error: Error) => void;
    query_Key?: any[];
}

const Delete = forwardRef<HTMLSpanElement, DeleteProps>(({ form, id, onSuccess, onError, query_Key = [] }, ref) => {
    const queryClient = useQueryClient();

    const deactivateProviderMutation = useMutation({
        mutationFn: (id: number) =>
            fetch(`/api/${form}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then((res) => {
                if (!res.ok) throw new Error(`Failed to deactivate ${form}`);
                return res.json();
            }),
        onSuccess: () => {
            if (query_Key.length > 0) {
                query_Key.forEach((key) => {
                    queryClient.invalidateQueries({
                        predicate: (query) => query.queryKey[0] === key,
                    });
                });
            } else {
                queryClient.invalidateQueries({
                    predicate: (query) => query.queryKey[0] === form,
                });
            }
            onSuccess?.();
        },
        onError: (error: Error) => {
            onError?.(error);
        },
    });

    const handleDeactivate = async (event: React.MouseEvent) => {
        event.stopPropagation();
        if (window.confirm(`Are you sure you want to deactivate this?`)) {
            try {
                await deactivateProviderMutation.mutateAsync(id);
            } catch (error) {
                console.error(`Failed to deactivate ${form}:`, error);
            }
        }
    };

    return (
        <span ref={ref} onClick={handleDeactivate} className="p-1 hover:bg-gray-100 rounded cursor-pointer inline-flex items-center" role="button" tabIndex={0}>
            <TrashBinMinimalistic size={18} iconStyle="LineDuotone" />
        </span>
    );
});

Delete.displayName = 'Delete';

export default Delete;
