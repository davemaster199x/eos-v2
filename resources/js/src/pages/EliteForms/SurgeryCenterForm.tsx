import React from 'react';
import { useQuery } from '@tanstack/react-query';
import FormComponent from '../../components/FormComponent';
import { preProcessFormData, states } from '../../utils/util';
import { fetchAllProviders } from '../../api/provider';
import { toast } from 'sonner';

const procedures = [
    { value: 'Pain Management', label: 'Pain Management' },
    { value: 'Orthopedic', label: 'Orthopedic' },
    { value: 'Spine', label: 'Spine' },
];

function SurgeryCenterForm({ initialData = {}, onSuccess = () => {}, isEdit = false, className = '' }: any) {
    const { data: providersData } = useQuery({
        queryKey: ['providers'],
        queryFn: () => fetchAllProviders('Specialist'),
    });

    const providers = providersData?.map((item) => ({
        value: item.id,
        label: `${item.first_name} ${item.last_name}`,
    }));

    const initialSurgeryCenterProvider = initialData?.surgeryCenterProviders?.map((provider) => ({
        label: provider.provider_name,
        value: provider.provider_id,
    }));

    const initialSurgeryCenterProcedure = initialData?.procedures_offered?.map((procedure) => procedure.name);

    const fields = [
        {
            heading: {
                label: isEdit ? 'Edit Surgery Center' : 'Add Surgery Center',
                className: 'text-center',
            },
            width: 'w-full',
            colSpan: 6,
        },
        {
            name: 'name',
            type: 'text',
            label: 'Surgery Center Name',
            placeholder: 'Enter Surgery Center Name',
            initialValue: initialData?.name || '',
            colSpan: 6,
            width: 'w-1/2',
        },
        {
            name: 'full_address',
            type: 'text',
            label: 'Address',
            placeholder: 'Enter Address',
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
            initialValue: initialData?.state ? { label: initialData.state, value: initialData.state } : { label: 'California', value: 'California' },
            colSpan: 3,
        },
        {
            name: 'zip',
            type: 'text',
            label: 'Zip Code',
            placeholder: 'Enter Zip Code',
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
        {
            name: 'provider_id',
            type: 'select',
            label: 'Affiliated Specialist',
            options: providers,
            isMulti: true,
            initialValue: initialSurgeryCenterProvider || [],
            colSpan: 6,
            width: 'w-1/2',
        },
        {
            name: 'procedures_offered',
            type: 'checkbox',
            label: 'Available Surgical Procedures',
            options: procedures,
            initialValue: initialSurgeryCenterProcedure || [],
            colSpan: 3,
        },
        {
            name: 'status',
            type: 'radio',
            label: 'Status',
            initialValue: initialData?.status || '1',
            options: [
                { value: '1', label: 'Active' },
                { value: '0', label: 'Inactive' },
            ],
            colSpan: 3,
        },
        {
            name: 'photo_file',
            type: 'file',
            label: 'Image of Surgery Center',
            initialValue: initialData?.photo_file || null,
            colSpan: 3,
        },
        {
            name: 'baa_file',
            type: 'file',
            label: 'BAA',
            initialValue: initialData?.baa_file || null,
            colSpan: 3,
        },
        {
            name: 'w9_file',
            type: 'file',
            label: 'W-9',
            initialValue: initialData?.w9_file || null,
            colSpan: 3,
        },
        {
            name: 'facility_lien_file',
            type: 'file',
            label: 'Facility Lien',
            initialValue: initialData?.facility_lien_file || null,
            colSpan: 3,
        },
    ];

    const handleFormSubmit = async (formData) => {
        const formPayload = await preProcessFormData(formData);
        const url = isEdit ? `/api/surgery-centers/${initialData.id}` : '/api/surgery-centers';
        console.log('Form Payload:');
        for (let [key, value] of formPayload.entries()) {
            console.log(`${key}:`, value);
        }
        if (isEdit) {
            formPayload.append('_method', 'PUT');
        }

        try {
            const response = await fetch(url, {
                method: 'POST',
                body: formPayload,
            });
            const data = await response.json();
            if (response.ok) {
                toast.success(isEdit ? 'Surgery center was updated successfully.' : "You've successfully added a new surgery center.");
                if (onSuccess) onSuccess();
            } else {
                return data;
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('An error occurred while submitting the form. Please try again.');
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

export default SurgeryCenterForm;
