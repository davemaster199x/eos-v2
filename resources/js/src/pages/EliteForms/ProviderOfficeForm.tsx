import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import FormComponent from '../../components/FormComponent';
import { pay_status, preProcessFormData, specialty_name, states, therapist_provided } from '../../utils/util';
import { fetchAllProviders } from '../../api/provider';
import { toast } from 'sonner';

const ProviderOfficeForm = ({ initialData = {}, isEdit = false, className = '', providerType = 'Specialist', onSuccess = () => {} }: any) => {
    const [selectedProviderType, setSelectedProviderType] = useState(initialData?.provider_type || providerType || 'Specialist');
    const [selectedProvider, setSelectedProvider] = useState<any>(initialData?.provider || null);

    const {
        isLoading,
        error,
        data: providersData,
    } = useQuery({
        queryKey: ['providers', selectedProviderType],
        queryFn: () => fetchAllProviders(selectedProviderType),
    });
    if (isLoading) return null;
    if (error) return <div>Error: {error.message}</div>;
    const providers = providersData?.map((provider) => ({
        ...provider,
        value: provider.id,
        label: `${provider.first_name} ${provider.last_name}`,
        name: provider.provider_type === 'Specialist' ? provider.specialties[0]?.name || 'N/A' : provider.provider_collections[0]?.name || 'N/A',
    }));
    const initialStates = states?.find((state) => state.value === initialData?.state);
    const initialSpecialties = initialData?.po_specialty_detail?.map((specialty) => specialty.name);
    const initialTherapiesProvided = initialData?.po_therapies_provided?.map((therapy) => therapy.name);
    const fields = [
        {
            heading: {
                label: isEdit ? 'Edit ' + selectedProviderType + ' Office' : 'Add Provider Office',
                className: 'text-center',
            },
            colSpan: 6,
        },
        {
            name: 'provider_type',
            label: 'Affiliated Provider Type',
            type: 'radio',
            options: [
                { label: 'Specialist', value: 'Specialist' },
                { label: 'Therapist', value: 'Therapist' },
            ],
            initialValue: initialData?.provider_type || selectedProviderType,
            onChange: ({ value, reset }) => {
                setSelectedProviderType(value);
                reset(['provider_id', 'pay_status', 'specialties_offered', 'therapies_provided', 'status']);
            },
            colSpan: 3,
        },
        {
            name: 'provider_id',
            type: 'select',
            options: providers,
            label: selectedProviderType === 'Specialist' ? 'Specialist' : 'Therapist',
            placeholder: 'Select a provider',
            onChange: ({ selectedOption, setFormData }) => {
                const provider = providers.find((item) => item.value === selectedOption.value);
                setSelectedProvider(provider || null);
                setFormData((formData) => ({ ...formData, office_name: `${selectedOption.label} - ${formData.city}` }));
            },
            initialValue: { label: `${selectedProvider?.first_name || ''} ${selectedProvider?.last_name || ''}`, value: selectedProvider?.id } || null,
            colSpan: 3,
            card: {
                conditionalDisplay: (formData) => !!formData.provider_id,
                title: `${selectedProviderType} Information`,
                items: [
                    { label: 'Type', value: selectedProvider?.provider_type, colSpan: 3 },
                    { label: 'Pay Status', value: selectedProvider?.pay_status, colSpan: 3 },
                    {
                        label: selectedProviderType === 'Specialist' ? 'Specialties' : 'Therapies',
                        value: selectedProvider?.[selectedProvider?.provider_type === 'Specialist' ? 'specialties' : 'therapies_provided']?.map((item) => item.name).join(', ') || 'N/A',
                        colSpan: 3,
                    },
                    { label: 'Provider Language', value: selectedProvider?.language, colSpan: 3 },
                ],
            },
        },
        {
            name: 'full_address',
            type: 'text',
            label: 'Address',
            placeholder: 'Enter Address',
            initialValue: initialData?.full_address || '',
            customHandler: true,
            onAddressSelect: ({ setFormData, city }) => {
                setFormData((formData) => ({ ...formData, office_name: `${selectedProvider?.label} - ${city}` }));
            },
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
            onChange: ({ e, formData }) => {
                formData.office_name = `${selectedProvider?.label} - ${e.target.value}`;
            },
            colSpan: 3,
        },
        {
            name: 'state',
            type: 'select',
            label: 'State',
            options: states,
            initialValue: initialStates || { label: 'California', value: 'California' },
            colSpan: 3,
        },
        {
            name: 'zip',
            type: 'text',
            label: 'Zip',
            placeholder: 'Enter Zip',
            initialValue: initialData?.zip_code || '',
            colSpan: 3,
        },
        {
            name: 'office_name',
            type: 'text',
            label: 'Office Name',
            placeholder: 'Enter Office Name',
            initialValue: initialData?.office_name || '',
            colSpan: 6,
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
            type: 'text',
            label: 'Email',
            placeholder: 'name@example.com',
            initialValue: initialData?.email || '',
            colSpan: 3,
        },
        {
            name: selectedProviderType === 'Specialist' ? 'specialties_offered' : 'therapies_provided',
            type: 'checkbox',
            label: selectedProviderType === 'Specialist' ? 'Specialties Offered' : 'Therapies Provided',
            options: selectedProviderType === 'Specialist' ? specialty_name : therapist_provided,
            initialValue: initialData?.provider_type === 'Specialist' ? initialSpecialties : initialTherapiesProvided || [],
            colSpan: 2,
            isMulti: true,
            conditionalDisplay: selectedProviderType === 'Specialist',
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
            colSpan: 2,
        },
        {
            name: 'pay_status',
            type: 'radio',
            label: 'Payment Status',
            options: pay_status,
            initialValue: initialData?.pay_status || 'Is Paying',
            colSpan: 2,
            conditionalDisplay: (formData) => formData.provider_type === 'Therapist',
        },
        {
            name: 'photo_file',
            type: 'file',
            label: 'Image of Office',
            initialValue: initialData?.photo_file || '',
            colSpan: 3,
        },
        {
            name: 'notes',
            type: 'textarea',
            label: 'Office Notes',
            placeholder: 'Enter Office Notes',
            initialValue: initialData?.notes || '',
            colSpan: 3,
        },
        {
            heading: {
                label: 'Office Schedule',
                className: 'border-t py-4 mt-2',
            },
            colSpan: 6,
        },
        ...['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => ({
            name: `${day}_schedule`,
            type: 'text',
            label: day.charAt(0).toUpperCase() + day.slice(1),
            placeholder: `Enter ${day.charAt(0).toUpperCase() + day.slice(1)} Schedule`,
            initialValue: initialData?.[`${day}_schedule`] || '',
            colSpan: 3,
        })),
    ];

    const handleFormSubmit = async (formData) => {
        const formPayload = await preProcessFormData(formData);
        const url = isEdit ? `/api/provider-offices/${initialData.id}` : '/api/provider-offices';

        console.log('Form Payload:');
        for (let [key, value] of formPayload.entries()) {
            console.log(`${key}:`, value);
        }
        try {
            const response = await fetch(url, {
                method: 'POST',
                body: formPayload,
                headers: {
                    'X-HTTP-Method-Override': isEdit ? 'PUT' : 'POST',
                },
            });

            const data = await response.json();

            if (response.ok) {
                toast.success(isEdit ? ' Provider office was updated successfully.' : "You've successfully added a new provider office.");
                if (onSuccess) onSuccess(data);
            } else {
                return data;
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('An error occurred while submitting the form. Please try again.');
        }
    };

    return <FormComponent fields={fields} onSubmit={handleFormSubmit} submitButtonText={isEdit ? 'Update' : 'Submit'} formClassName={className} closemodal={onSuccess} />;
};

export default ProviderOfficeForm;
