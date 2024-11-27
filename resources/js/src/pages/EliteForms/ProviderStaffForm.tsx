import React, { useState } from 'react';
import FormComponent from '../../components/FormComponent';
import { point_of_contact, provider_type, preProcessFormData, displayErrorAlert } from '../../utils/util';
import { useQuery } from '@tanstack/react-query';
import { fetchAllProviders } from '../../api/provider';
import { toast } from 'sonner';

function ProviderStaffForm({ initialData, onSuccess, isEdit, className }: any) {
    const [designatedOffices, setDesignatedOffices] = useState([]);
    const [selectedProviderType, setSelectedProviderType] = useState(initialData?.provider_type || 'Specialist');
    const providerLabel = initialData?.provider_type || 'Specialist';

    const { isLoading: isProviderLoading, data: providers } = useQuery({
        queryKey: ['providers', selectedProviderType],
        queryFn: async () => {
            const data = await fetchAllProviders(selectedProviderType);
            return data.map((provider) => ({ ...provider, value: provider.id, label: `${provider.first_name} ${provider.last_name}` }));
        },
    });
    // Fetch Designated Offices based on selected providers
    const assignDesignatedOffices = async ({ selectedOption: selectedProviders, reset }) => {
        const providerOffices = selectedProviders.map((provider) => provider.offices);
        const providerOfficesCombined = [...providerOffices.flat()].filter((item) => item !== undefined) as any;
        const designatedOfficesOpts = providerOfficesCombined.map((item) => ({ ...item, value: item.id, label: item.office_name }));
        setDesignatedOffices(designatedOfficesOpts);
    };
    // Update label when provider type changes
    const handleProviderTypeChange = ({ value, label, resetRaw }) => {
        resetRaw(['provider_id', 'designated_office']);
        setSelectedProviderType(value);
    };
    console.log('initialData', initialData);
    const initialprovider = initialData?.provider_details?.map((item) => ({
        value: item.provider_id,
        label: `${item.provider.first_name} ${item.provider.middle_name || ''} ${item.provider.last_name}`.trim(),
    }));

    const initialdesignatedOffices = initialData?.designated_office_details?.map((item) => ({
        value: item.designated_office.id,
        label: `${item.designated_office.office_name}`,
    }));

    const initialpoint_of_contact_details = initialData?.point_of_contact_details?.map((item) => item.point_of_contact);

    const fields = [
        {
            name: 'heading',
            heading: {
                label: isEdit ? 'Edit Provider Staff' : 'Add Provider Staff',
                className: 'text-center',
            },
            width: 'w-full',
            colSpan: 6,
        },
        {
            name: 'first_name',
            type: 'text',
            label: 'First',
            placeholder: 'Enter First Name',
            initialValue: initialData?.first_name || '',
            colSpan: 2,
        },
        {
            name: 'middle_name',
            type: 'text',
            label: 'Middle',
            placeholder: 'Enter Middle Name',
            initialValue: initialData?.middle_name || '',
            colSpan: 2,
        },
        {
            name: 'last_name',
            type: 'text',
            label: 'Last',
            placeholder: 'Enter Last Name',
            initialValue: initialData?.last_name || '',
            colSpan: 2,
        },
        {
            name: 'title',
            type: 'text',
            label: 'Title',
            placeholder: 'Enter Title',
            initialValue: initialData?.title || '',
            width: 'w-1/2',
            colSpan: 6,
        },
        {
            name: 'staff_language',
            type: 'radio',
            label: 'Staff Language',
            initialValue: initialData?.staff_language || '',
            options: [
                { value: 'English', label: 'English' },
                { value: 'Spanish', label: 'Spanish' },
            ],
            colSpan: 3,
        },
        {
            name: 'status',
            type: 'radio',
            label: 'Status',
            placeholder: 'Select Status',
            initialValue: initialData?.status || '1',
            options: [
                { value: '1', label: 'Active' },
                { value: '0', label: 'Inactive' },
            ],
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
            name: 'provider_type',
            type: 'radio',
            label: 'Affiliated Provider Type',
            options: provider_type,
            initialValue: initialData?.provider_type || 'Specialist',
            width: 'w-1/2',
            colSpan: 6,
            onChange: handleProviderTypeChange,
        },
        {
            name: 'provider_id',
            type: 'select',
            label: providerLabel, // Use dynamic label here
            placeholder: 'Select a provider',
            initialValue: initialprovider || [],
            options: providers,
            colSpan: 3,
            isMulti: true,
            isLoading: isProviderLoading,
            onChange: assignDesignatedOffices,
        },
        {
            name: 'designated_office',
            type: 'select',
            label: 'Designated Office',
            placeholder: 'Select a designated office',
            initialValue: initialdesignatedOffices || [],
            options: designatedOffices,
            colSpan: 3,
            isMulti: true,
        },

        {
            name: 'point_of_contacts',
            type: 'checkbox',
            label: 'Point of Contacts',
            placeholder: 'Select Point of Contact',
            initialValue: initialpoint_of_contact_details || [],
            options: point_of_contact,
            colSpan: 6,
            isMulti: true,
            conditionalDisplay: (formData) => formData.provider_type === 'Specialist',
        },
    ];

    const handleFormSubmit = async (formData) => {
        const formPayload = await preProcessFormData(formData);

        console.log('Form Payload:');
        for (let [key, value] of formPayload.entries()) {
            console.log(`${key}:`, value);
        }

        const url = isEdit ? `/api/provider-staff/${initialData.id}` : '/api/provider-staff';
        if (isEdit) {
            formPayload.append('_method', 'PUT'); // Add for PUT requests
        }

        const response = await fetch(url, {
            method: 'POST',
            body: formPayload,
        });
        const data = await response.json();
        if (response.ok) {
            toast.success(isEdit ? 'Provider staff was updated successfully.' : "You've successfully added a new provider staff.");

            if (onSuccess) onSuccess();
        } else {
            return data;
        }
    };

    return <FormComponent fields={fields} onSubmit={handleFormSubmit} formClassName={className} submitButtonText={isEdit ? 'Update' : 'Submit'} closemodal={onSuccess} />;
}

export default ProviderStaffForm;
