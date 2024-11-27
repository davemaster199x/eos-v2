import React from 'react';
import FormComponent from '../../components/FormComponent';
import { business_types, preProcessFormData, states } from '../../utils/util';
import { createSelectObj } from '../../utils/helpers';
import { toast } from 'sonner';

function ReferralSource({ className, initialData, isEdit, onSuccess }: any) {
    const fields = [
        {
            name: 'heading',
            heading: {
                label: isEdit ? 'Edit Referral Source' : 'Add Referral Source',
                className: 'text-center',
            },
            width: 'w-full',
            colSpan: 6,
        },
        {
            name: 'referral_source_name',
            type: 'text',
            label: 'Referral Source',
            placeholder: 'Enter law firm name here',
            initialValue: initialData?.referral_source_name || '',
            colSpan: 3,
        },
        {
            name: 'business_type',
            type: 'select',
            label: 'Business Type',
            options: business_types,
            initialValue: createSelectObj(initialData?.business_type), // returns [] if not found,
            colSpan: 3,
        },
        {
            name: 'logo',
            type: 'file',
            label: 'Logo',
            initialValue: initialData?.logo || '',
            colSpan: 3,
        },
        {
            name: 'full_address',
            type: 'text',
            label: 'Address',
            placeholder: 'Enter address here',
            initialValue: initialData?.full_address || '',
            customHandler: true,
            autoComplete: 'off',
            colSpan: 6,
        },
        {
            name: 'street_address',
            type: 'text',
            label: 'Street Address',
            placeholder: 'Enter Street Address',
            initialValue: initialData?.street_address || '',
            colSpan: 3,
        },
        {
            name: 'city',
            type: 'text',
            label: 'City',
            placeholder: 'Enter City',
            initialValue: initialData?.city || '',
            colSpan: 3,
        },
        {
            name: 'state',
            type: 'select',
            label: 'State',
            options: states,
            initialValue: createSelectObj(initialData?.state),
            colSpan: 3,
        },
        {
            name: 'zip_code',
            type: 'text',
            label: 'ZIP Code',
            placeholder: 'Enter ZIP Code',
            initialValue: initialData?.zip_code || '',
            colSpan: 3,
        },
        {
            name: 'phone',
            type: 'text',
            label: 'Phone',
            placeholder: '(000) 000-0000',
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

        const url = isEdit ? `/api/referral-source/${initialData.id}` : '/api/referral-source';
        const response = await fetch(url, {
            method: 'POST',
            body: formPayload,
            headers: {
                'X-HTTP-Method-Override': isEdit ? 'PUT' : 'POST',
            },
        });
        const data = await response.json();
        if (response.ok) {
            toast.success(isEdit ? ' Referral source was updated successfully.' : "You've successfully added a new referral source.");
            if (onSuccess) onSuccess();
        } else {
            return data;
        }
    };

    return <FormComponent fields={fields} onSubmit={handleFormSubmit} formClassName={className} submitButtonText={isEdit ? 'Update' : 'Submit'} closemodal={onSuccess} />;
}

export default ReferralSource;
