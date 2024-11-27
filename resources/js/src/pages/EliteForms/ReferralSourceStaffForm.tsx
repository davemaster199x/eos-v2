import React from 'react';
import FormComponent from '../../components/FormComponent';
import { preProcessFormData } from '../../utils/util';
import { useQuery } from '@tanstack/react-query';
import { fetchAllReferralSource } from '../../api/referral-source';
import { createSelectObj } from '../../utils/helpers';
import { toast } from 'sonner';

const queryKey = 'referral-source';
function ReferralSourceStaffForm({ className, initialData, isEdit, onSuccess }: any) {
    const { isLoading, error, data: ReferralSource } = useQuery({ queryKey: [queryKey], queryFn: () => fetchAllReferralSource() });
    const rsOpts = ReferralSource?.map((item) => ({ ...item, label: item.referral_source_name, value: item.id }));
    const fields = [
        {
            name: 'heading',
            heading: {
                label: isEdit ? 'Edit Referral Source Staff' : 'Add Referral Source Staff',
                className: 'text-center',
            },
            width: 'w-full',
            colSpan: 6,
        },
        {
            name: 'referral_source_id',
            type: 'select',
            label: 'Referral Source',
            options: rsOpts,
            initialValue: createSelectObj(ReferralSource, initialData?.referral_source_id, 'referral_source_name', 'id') || '',
            colSpan: 3,
            isLoading: isLoading,
        },

        {
            name: 'title',
            type: 'text',
            label: 'Title',
            placeholder: 'Enter Title',
            initialValue: initialData?.title || '',
            colSpan: 3,
        },
        {
            name: 'first_name',
            type: 'text',
            label: 'First Name',
            placeholder: 'Enter First Name',
            initialValue: initialData?.first_name || '',
            colSpan: 2,
        },
        {
            name: 'middle_name',
            type: 'text',
            label: 'Middle Name',
            placeholder: 'Enter Middle Name',
            initialValue: initialData?.middle_name || '',
            colSpan: 2,
        },
        {
            name: 'last_name',
            type: 'text',
            label: 'Last Name',
            placeholder: 'Enter Last Name',
            initialValue: initialData?.last_name || '',
            colSpan: 2,
        },
        {
            name: 'phone',
            type: 'text',
            label: 'Phone',
            placeholder: '(000) 000-000',
            initialValue: initialData?.phone || '',
            colSpan: 3,
        },
        {
            name: 'email',
            type: 'email',
            label: 'Email',
            placeholder: 'name@example.com',
            initialValue: initialData?.email || '',
            colSpan: 3,
        },
    ];

    const handleFormSubmit = async (formData) => {
        const formPayload = await preProcessFormData(formData);
        const url = isEdit ? `/api/referral-source-staff/${initialData?.id}` : '/api/referral-source-staff';
        const response = await fetch(url, {
            method: 'POST',
            body: formPayload,
            headers: {
                'X-HTTP-Method-Override': isEdit ? 'PUT' : 'POST',
            },
        });
        const data = await response.json();
        if (response.ok) {
            toast.success(isEdit ? ' Referral source staff was updated successfully.' : "You've successfully added a new referral source staff.");
            if (onSuccess) onSuccess();
        } else {
            return data;
        }
    };

    return <FormComponent fields={fields} onSubmit={handleFormSubmit} formClassName={className} submitButtonText={isEdit ? 'Update' : 'Submit'} closemodal={onSuccess} />;
}

export default ReferralSourceStaffForm;
