import React, { useEffect, useState } from 'react';
import FormComponent, { FieldsType } from '../../components/FormComponent';
import { states, preProcessFormData } from '../../utils/util';
import { FormSession } from '../../types/common';
import { toast } from 'sonner';

function MRIFacilityForm({ initialData = {}, isEdit = false, onSuccess, session = FormSession.CREATE, className }: any) {
    const fields: FieldsType = [
        {
            name: 'heading',
            heading: {
                label: isEdit ? 'Edit Mri Facility' : 'Add Mri Facility',
                className: 'text-center',
            },
            width: 'w-full',
            colSpan: 6,
        },
        {
            name: 'facility_name',
            type: 'text',
            label: 'Facility Name',
            initialValue: initialData.facility_name || '',
            placeholder: 'Enter Facility Name',
            colSpan: 6,
            width: 'w-1/2',
        },
        {
            name: 'image_of_office',
            type: 'file',
            label: 'Image of the Facility',
            initialValue: initialData?.image_of_office,
            colSpan: 6,
            width: 'w-1/2',
        },
        {
            name: 'full_address',
            type: 'text',
            label: 'Address',
            placeholder: 'Enter Address here',
            initialValue: initialData.full_address || '',
            customHandler: true,
            autoComplete: 'off',
            colSpan: 6,
        },
        { name: 'street_address', type: 'text', label: 'Street Address', placeholder: 'Enter Street Address', initialValue: initialData.street_name || '', colSpan: 3 },
        { name: 'city', type: 'text', label: 'City', placeholder: 'Enter City', initialValue: initialData.city || '', colSpan: 3 },
        {
            name: 'state',
            type: 'select',
            label: 'State',
            options: states,
            initialValue: initialData.state ? { value: initialData.state, label: initialData.state } : '',
            colSpan: 3,
        },
        { name: 'zip', type: 'text', label: 'Zip', placeholder: 'Enter Zip', initialValue: initialData.zip_code || '', colSpan: 3 },
        {
            name: 'phone',
            type: 'text',
            label: 'Phone',
            placeholder: '(000) 000-0000',
            initialValue: initialData.phone || '',
            colSpan: 3,
        },
        {
            name: 'email',
            type: 'text',
            label: 'Email',
            placeholder: 'name@example.com',
            initialValue: initialData.email || '',
            colSpan: 3,
        },
        {
            name: 'status',
            type: 'radio',
            label: 'Status',
            initialValue: initialData.status,
            options: [
                { value: '1', label: 'Active' },
                { value: '0', label: 'Inactive' },
            ],
            colSpan: 3,
        },
    ];

    const handleFormSubmit = async (formData) => {
        const formPayload = await preProcessFormData(formData);

        const url = isEdit ? `/api/mri-facilities/${initialData.id}` : '/api/mri-facilities';
        if (isEdit) {
            formPayload.append('_method', 'PUT'); // Add for PUT requests
        }

        const response = await fetch(url, {
            method: 'POST',
            body: formPayload,
        });

        const data = await response.json();

        if (response.ok) {
            toast.success(isEdit ? ' MRI facility was updated successfully.' : "You've successfully added a new mri facility.");
            if (onSuccess) onSuccess();
        } else {
            return data;
        }
    };

    return (
        <FormComponent
            fields={fields}
            onSubmit={handleFormSubmit}
            submitButtonText={isEdit ? 'Update' : 'Submit'}
            formClassName={className}
            editViewClass={isEdit ? 'panel shadow-none m-0 p-0' : ''}
            closemodal={onSuccess}
        />
    );
}

export default MRIFacilityForm;
