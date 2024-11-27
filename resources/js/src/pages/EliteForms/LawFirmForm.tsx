import React from 'react';
import FormComponent from '../../components/FormComponent';
import { states, preProcessFormData } from '../../utils/util';
import { createSelectObj } from '../../utils/helpers';
import { toast } from 'sonner';

function LawFirmForm({ initialData = {}, isEdit = false, onSuccess, className }: any) {
    const fields = [
        {
            name: 'heading',
            heading: {
                label: isEdit ? 'Edit Law Firm' : 'Add Law Firm',
                className: 'text-center',
            },
            width: 'w-full',
            colSpan: 6,
        },
        {
            name: 'law_firm_name',
            type: 'text',
            label: 'Law Firm Name',
            placeholder: 'Enter Law Firm Name',
            initialValue: initialData?.law_firm_name || '',
            colSpan: 3,
        },
        {
            name: 'firm_type',
            type: 'select',
            label: 'Firm Type',
            options: [
                { label: 'Pre-Lit', value: 'Pre-Lit' },
                { label: 'Trial', value: 'Trial' },
            ],
            initialValue: createSelectObj(initialData?.firm_type),
            colSpan: 3,
        },
        {
            name: 'logo',
            type: 'file',
            label: 'Logo',
            initialValue: initialData?.logo || '',
            colSpan: 6,
            width: 'w-1/2',
        },
        {
            name: 'full_address',
            type: 'text',
            label: 'Firm Address',
            placeholder: 'Enter Law Firm Address',
            initialValue: initialData?.full_address || '',
            customHandler: true,
            autoComplete: 'off',
            colSpan: 6,
        },
        { name: 'street_address', type: 'text', label: 'Street Address', placeholder: 'Enter Street Address', initialValue: initialData?.street_address || '', colSpan: 3 },
        { name: 'city', type: 'text', label: 'City', placeholder: 'Enter City', initialValue: initialData?.city || '', colSpan: 3 },
        {
            name: 'state',
            type: 'select',
            label: 'State',
            initialValue: initialData?.state ? { label: initialData?.state, value: initialData?.state } : { label: 'California', value: 'California' },
            options: states,
            colSpan: 3,
        },
        { name: 'zip', type: 'text', label: 'Zip', placeholder: 'Enter Zip', initialValue: initialData?.zip || '', colSpan: 3 },
        { name: 'phone', type: 'text', label: 'Phone', placeholder: '(000) 000-0000', initialValue: initialData?.phone || '', colSpan: 3 },
        { name: 'email', type: 'email', label: 'Email', placeholder: 'name@example.com', initialValue: initialData?.email || '', colSpan: 3 },
    ];

    const handleFormSubmit = async (formData) => {
        const formPayload = await preProcessFormData(formData);
        const url = isEdit ? `/api/law-firms/${initialData?.id}` : '/api/law-firms';

        if (isEdit) {
            formPayload.append('_method', 'PUT'); // Add for PUT requests
        }

        try {
            const response = await fetch(url, {
                method: 'POST', // Always use POST, even for PUT requests
                body: formPayload,
            });

            const data = await response.json();

            if (response.ok) {
                toast.success(isEdit ? ' Lawfirm was updated successfully.' : "You've successfully added a new lawfirm.");
                if (onSuccess) onSuccess(); // Callback
            } else {
                return data;
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return <FormComponent fields={fields} onSubmit={handleFormSubmit} formClassName={className} submitButtonText={isEdit ? 'Update' : 'Submit'} closemodal={onSuccess} />;
}

export default LawFirmForm;
