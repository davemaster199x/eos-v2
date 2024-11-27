import { QueryClient, QueryKey, useQueryClient } from '@tanstack/react-query';
import React, { cloneElement } from 'react';
import useModal from '../hooks/useModal';
import ModalComponent from './ModalComponent';
import { Settings } from 'solar-icon-set';
import { cn } from '../utils/util';

type Props = {
    data: any;
    toEdit: any;
    Form: React.ReactElement;
    queryKey: string | any[];
    Icon?: React.ReactElement;
    onSuccess?: (queryClient: QueryClient, closeModal: () => void) => void;
    onError?: (error: Error) => void;
    className?: string;
    modalContentClassName?: string;
};

/**
 * @function Edit
 * @description A component that renders a modal on click with a form to edit a selected item.
 * @param {Props} props The component props.
 * @prop {any} data The data to be edited.
 * @prop {any} toEdit The item to be edited.
 * @prop {React.ReactElement} Form The form to be rendered in the modal.
 * @prop {string} queryKey The query key to be invalidated on success.
 * @prop {React.ReactElement} [Icon] The icon to be rendered. If not provided, a Settings icon will be rendered.
 * @returns {React.ReactElement} The rendered component.
 */
const Edit = (props: Props) => {
    const queryClient = useQueryClient();
    const { openModal, closeModal, ModalWrapper } = useModal();

    const handleEdit = (row) => {
        const data = props.data?.find((item) => item.id === row.id);
        const modalContent = cloneElement(props.Form, {
            className: cn('shadow-none m-0 p-0', props?.modalContentClassName),
            onSuccess: props.onSuccess ? props.onSuccess(queryClient, closeModal) : handleSuccess,
            initialData: data,
            isEdit: true,
        });

        openModal(modalContent, ModalComponent);
    };

    const handleSuccess = () => {
        closeModal();

        queryClient.invalidateQueries({
            // queryKey: props.queryKey as QueryKey,
            predicate: (query) => query.queryKey[0] === props.queryKey,
        });
    };

    return (
        <span className={cn('p-1 hover:bg-gray-100 rounded cursor-pointer inline-flex items-center', props?.className)} onClick={() => handleEdit(props.toEdit)}>
            {props?.Icon ? cloneElement(props.Icon, {}) : <Settings size={18} iconStyle="LineDuotone" />}
            <ModalWrapper />
        </span>
    );
};

export default Edit;
