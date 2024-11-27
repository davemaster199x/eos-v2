import React, { useState } from 'react';
import FormComponent from '../../components/FormComponent';
import { pay_status, language, specialty_name, provider_type, therapist_provided, preProcessFormData } from '../../utils/util';
import { FormSession } from '../../types/common';
import { useQuery } from '@tanstack/react-query';
import { fetchAllReferralSource } from '../../api/referral-source';
import { createSelectArr, mapArr } from '../../utils/helpers';
import { toast } from 'sonner';

function ProviderForm({ initialData = {}, isEdit = false, onSuccess, session = FormSession.CREATE, className, formName }: any) {
    const {
        isLoading,
        error,
        data: referralSource,
    } = useQuery({
        queryKey: ['referral-source'],
        queryFn: fetchAllReferralSource,
    });
    const [selectedProviderType, setSelectedProviderType] = useState(initialData?.provider_type || 'Specialist');

    console.log(initialData);
    const blackListedRsOpts = referralSource?.map((referralSource) => ({ ...referralSource, label: referralSource.referral_source_name, value: referralSource.id }));

    const initialblaclisted = initialData?.blacklisted_referral_source?.map((data) => ({
        label: data?.referral_source?.referral_source_name,
        value: data?.referral_source_id,
    }));

    const fields = [
        {
            name: 'heading',
            heading: {
                label: isEdit ? 'Edit ' + formName : 'Add Provider',
                className: 'text-center',
            },
            width: 'w-full',
            colSpan: 6,
        },
        // First Name
        { name: 'first_name', type: 'text', label: 'First Name', placeholder: 'Enter First Name', initialValue: initialData?.first_name || '', colSpan: 2 },

        // Middle Name
        { name: 'middle_name', type: 'text', label: 'Middle Name', placeholder: 'Enter Middle Name', initialValue: initialData?.middle_name || '', colSpan: 2 },

        // Last Name
        { name: 'last_name', type: 'text', label: 'Last Name', placeholder: 'Enter Last Name', initialValue: initialData?.last_name || '', colSpan: 2 },

        //Provider Type
        {
            name: 'provider_type',
            type: 'select',
            label: 'Provider Type',
            options: provider_type,
            initialValue: {
                label: selectedProviderType,
                value: selectedProviderType,
            },
            colSpan: 3,
            onChange: ({ selectedOption }) => setSelectedProviderType(selectedOption.value),
        },

        // Specialty (multiple select) if provider type is specialist
        {
            name: 'specialty_name',
            type: 'select',
            label: 'Specialties',
            options: specialty_name,
            isMulti: true,
            initialValue: createSelectArr(initialData?.specialties, 'name', 'name'),
            colSpan: 3,
            conditionalDisplay: (formData) => formData.provider_type && formData.provider_type.value === 'Specialist',
        },

        // Therapist provided (multiple select) if provider type is Therapist
        {
            name: 'therapies_provided',
            type: 'select',
            label: 'Therapist Provided',
            options: therapist_provided,
            isMulti: true,
            initialValue: createSelectArr(initialData?.therapies_provided, 'name', 'name'),
            colSpan: 3,
            conditionalDisplay: (formData) => formData.provider_type && formData.provider_type.value === 'Therapist',
        },

        // Specialist Language (radio buttons)
        {
            name: 'language',
            type: 'radio',
            label: 'Provider Language',
            options: language,
            initialValue: initialData?.language || 'English',
            colSpan: 2,
        },

        // Payment Status
        {
            name: 'pay_status',
            type: 'radio',
            label: 'Payment Status',
            options: pay_status,
            initialValue: initialData?.pay_status || 'Is Paying',
            colSpan: 2,
        },
        // Status
        {
            name: 'status',
            type: 'radio',
            label: 'Status',
            options: [
                { label: 'Active', value: '1' },
                { label: 'Inactive', value: '0' },
            ],
            initialValue: initialData?.status || '1',
            colSpan: 2,
        },

        // Email
        { name: 'email', type: 'email', label: 'Email', placeholder: 'name@example.com', initialValue: initialData?.email || '', colSpan: 3 },

        // Phone
        { name: 'phone', type: 'text', label: 'Phone', placeholder: '(555) 555-1234', initialValue: initialData?.phone || '', colSpan: 3 },

        // Provider Communication Notes
        {
            name: 'provider_communication_note',
            type: 'textarea',
            label: 'Provider Communication Notes',
            placeholder: '',
            initialValue: initialData?.provider_communication_note || '',
            colSpan: 3,
        },

        {
            name: 'telemedicine',
            type: 'textarea',
            label: 'Telemedicine',
            placeholder: '',
            initialValue: initialData?.telemedicine || '',
            colSpan: 3,
        },

        // Headshot
        {
            name: 'headshot',
            type: 'file',
            label: 'Headshot',
            initialValue: initialData?.headshot,
            colSpan: 3,
        },

        // Lien
        {
            name: 'lien',
            type: 'file',
            label: 'Lien',
            initialValue: initialData?.lien,
            colSpan: 3,
        },

        // CV
        {
            name: 'cv',
            type: 'file',
            label: 'Cv',
            initialValue: initialData?.cv,
            colSpan: 3,
        },

        // Signed Contract
        {
            name: 'signed_contract',
            type: 'file',
            label: 'Signed Contract',
            initialValue: initialData?.signed_contract,
            colSpan: 3,
        },

        // W9
        {
            name: 'w_9',
            type: 'file',
            label: 'W9',
            initialValue: initialData?.w_9,
            colSpan: 3,
        },

        // Provider Collection Form (multiple files)
        {
            name: 'providercollectionFormFiles',
            type: 'file',
            label: 'Provider Collection Form',
            initialValue: initialData?.provider_collections ? mapArr(initialData?.provider_collections, 'provider_collection_form_file') : [],
            colSpan: 3,
            multiple: true,
        },
        //
        {
            name: 'complianceFiles',
            type: 'file',
            label: 'Compliance',
            initialValue: initialData?.compliances ? mapArr(initialData?.compliances, 'file') : [],
            colSpan: 3,
            multiple: true,
        },

        // Other Documents
        {
            name: 'otherDocumentFiles',
            type: 'file',
            label: 'Other Documents',
            initialValue: initialData?.compliances ? mapArr(initialData?.other_documents, 'other_documents_file') : [],
            colSpan: 3,
            multiple: true,
        },

        // Blacklisted Law Firm (multiple select)
        {
            name: 'blacklisted_referral_source_ids',
            type: 'select',
            label: 'Blacklisted Referral Sources',
            options: blackListedRsOpts,
            isMulti: true,
            initialValue: initialblaclisted || [],
            colSpan: 3,
        },
    ];

    const handleFormSubmit = async (formData) => {
        const formPayload = await preProcessFormData(formData);
        console.log('Form Payload:');
        for (let [key, value] of formPayload.entries()) {
            console.log(`${key}:`, value);
        }
        const url = isEdit ? `/api/providers/${initialData.id}` : '/api/providers';
        if (isEdit) {
            formPayload.append('_method', 'PUT'); // Add for PUT requests
        }

        const response = await fetch(url, {
            method: 'POST',
            body: formPayload,
        });
        const data = await response.json();
        if (response.ok) {
            toast.success(isEdit ? ' Provider was updated successfully.' : "You've successfully added a new Provider.");
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

export default ProviderForm;
