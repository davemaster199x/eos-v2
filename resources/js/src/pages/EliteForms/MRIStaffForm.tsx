import React, { useEffect, useState } from 'react';
import FormComponent from '../../components/FormComponent';
import { FormSession } from '../../types/common';
import { preProcessFormData } from '../../utils/util';
import { toast } from 'sonner';

function MRIStaffForm({ initialData = {}, isEdit = false, onSuccess, session = FormSession.CREATE, className }: any) {
    const [mriFacilities, setMriFacilities] = useState([]);

    // Fetch the facilities from the API on component mount
    useEffect(() => {
        const fetchMriFacilities = async () => {
            try {
                const response = await fetch('/api/mri-facilities');
                const data = await response.json();
                setMriFacilities(data.map((facility) => ({ value: facility.id, label: facility.facility_name })));
            } catch (error) {
                console.error('Error fetching facilities:', error);
            }
        };
        fetchMriFacilities();
    }, []);

    const initialassigned_facilities = initialData?.assigned_facilities?.map((item) => ({
        value: item.facility.id,
        label: `${item.facility.facility_name}`,
    }));

    const fields = [
        {
            name: 'heading',
            heading: {
                label: isEdit ? 'Edit Mri Staff' : 'Add Mri Staff',
                className: 'text-center',
            },
            width: 'w-full',
            colSpan: 6,
        },
        {
            name: 'first_name',
            type: 'text',
            label: 'First Name',
            placeholder: 'Enter First Name',
            initialValue: initialData.first_name || '',
            colSpan: 2,
        },
        {
            name: 'middle_name',
            type: 'text',
            label: 'Middle Name',
            placeholder: 'Enter Middle Name',
            initialValue: initialData.middle_name || '',
            colSpan: 2,
        },
        {
            name: 'last_name',
            type: 'text',
            label: 'Last Name',
            placeholder: 'Enter Last Name',
            initialValue: initialData.last_name || '',
            colSpan: 2,
        },
        {
            name: 'title',
            type: 'text',
            label: 'Title',
            placeholder: 'Enter Title',
            initialValue: initialData.title || '',
            colSpan: 6,
            width: 'w-1/2',
        },

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
            type: 'email',
            label: 'Email',
            placeholder: 'name@example.com',
            initialValue: initialData.email || '',
            colSpan: 3,
        },
        {
            name: 'mri_facility_id',
            type: 'select',
            isMulti: true,
            label: 'Assigned Facilities',
            options: mriFacilities,
            initialValue: initialassigned_facilities || '',
            colSpan: 6,
            width: 'w-1/2',
        },
        {
            name: 'status',
            type: 'radio',
            label: 'Status',
            initialValue: initialData.status || '1',
            options: [
                { value: '1', label: 'Active' },
                { value: '0', label: 'Inactive' },
            ],
            colSpan: 3,
        },
    ];

    const handleFormSubmit = async (formData) => {
        const formPayload = await preProcessFormData(formData);

        console.log('Form Payload:');
        for (let [key, value] of formPayload.entries()) {
            console.log(`${key}:`, value);
        }

        const url = isEdit ? `/api/mri-staffs/${initialData.id}` : '/api/mri-staffs';
        if (isEdit) {
            formPayload.append('_method', 'PUT'); // Add for PUT requests
        }

        const response = await fetch(url, {
            method: 'POST',
            body: formPayload,
        });
        const data = await response.json();
        if (response.ok) {
            toast.success(isEdit ? ' MRI staff was updated successfully.' : "You've successfully added a new MRI staff.");
            if (onSuccess) onSuccess();
        } else {
            return data;
        }
    };

    return <FormComponent fields={fields} onSubmit={handleFormSubmit} formClassName={className} submitButtonText={isEdit ? 'Update' : 'Submit'} closemodal={onSuccess} />;
}

export default MRIStaffForm;
