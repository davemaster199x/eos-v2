import React, { useEffect, useState } from 'react';
import FormComponent from '../../components/FormComponent';
import { states, incidentTypeOptions, preProcessFormData } from '../../utils/util';

import { useQuery } from '@tanstack/react-query';
import { fetchAllLawFirms } from '../../api/lawfirm';
import { fetchAllReferralSource } from '../../api/referral-source';
import { createSelectArr, mapArr } from '../../utils/helpers';

import { toast } from 'sonner';

function PatientIntakeForm({ className = '', onSuccess, isEdit, initialData }: any) {
    const [selectedReferralSource, setSelectedReferralSource] = useState(initialData?.referralsource || null) as any;
    const [selectedCM, setSelectedCM] = useState(initialData?.referral_source_staff || null) as any;

    const { data: lawFirms } = useQuery({
        queryKey: ['law-firms'],
        queryFn: async () => {
            const data = await fetchAllLawFirms();
            return data.map((firm) => ({ value: firm.id, label: firm.law_firm_name }));
        },
    });

    const { data: referralSources } = useQuery({
        queryKey: ['referral-sources'],
        queryFn: async () => {
            const data = await fetchAllReferralSource();
            return data.map((source) => ({ ...source, value: source.id, label: source.referral_source_name }));
        },
    });

    const initialincident = incidentTypeOptions?.find((data) => data.value === initialData?.accident_type);
    const initialreferral_source = {
        label: initialData?.referralsource?.referral_source_name,
        value: initialData?.referralsource?.id,
    };
    const initiallaw_firm = {
        label: initialData?.lawfirm?.law_firm_name,
        value: initialData?.lawfirm?.id,
    };
    const initialcasemanager = {
        label: `${initialData?.referral_source_staff?.first_name} ${initialData?.referral_source_staff?.middle_name || ''} ${initialData?.referral_source_staff?.last_name}`,
        value: initialData?.referral_source_staff?.id,
    };
    const initialothercasemanager = initialData?.other_case_managers?.map((item) => String(item.other_referral_source_staff_id)) || [];

    const initialemc_owner = initialData?.emc_owners?.map((data) => ({
        label: data.emc_owner_name,
        value: data.emc_owner_name,
    }));

    const initialState = {
        label: initialData?.state,
        value: initialData?.state,
    };

    const fields = [
        {
            name: 'heading',
            heading: {
                label: isEdit ? 'Edit Patient' : 'Add Patient',
                className: 'text-center',
            },
            width: 'w-full',
            colSpan: 6,
        },
        {
            name: 'emc_owner',
            type: 'select',
            label: 'EMC Owner',
            options: [
                { value: 'Mae Dingcong', label: 'Mae Dingcong' },
                { value: 'Giezett Diaz', label: 'Giezett Diaz' },
                { value: 'Romalyn Eugenio', label: 'Romalyn Eugenio' },
                { value: 'Sarah Sornil', label: 'Sarah Sornil' },
                { value: 'Heliza Sarreal', label: 'Heliza Sarreal' },
                { value: 'Rose Cabañero', label: 'Rose Cabañero' },
            ],
            initialValue: initialemc_owner || [],
            isMulti: true,
            colSpan: 6,
            width: 'w-1/2',
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
            name: 'date_of_birth',
            type: 'date',
            label: 'Date of Birth',
            initialValue: initialData?.date_of_birth ? new Date(initialData?.date_of_birth) : new Date(),
            colSpan: 3,
            className: 'w-1/3',
        },
        {
            name: 'date_of_injury',
            type: 'date',
            label: 'Date of Injury',
            initialValue: initialData?.date_of_injury ? new Date(initialData?.date_of_injury) : new Date(),
            colSpan: 3,
            className: 'w-1/3',
        },
        {
            name: 'full_address',
            type: 'text',
            label: 'Home Address',
            placeholder: 'Enter Home Address',
            initialValue: initialData?.full_address || '',
            customHandler: true,
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
            initialValue: initialData?.state
                ? initialState
                : {
                      label: 'California',
                      value: 'California',
                  },
            colSpan: 3,
        },
        {
            name: 'zip_code',
            type: 'text',
            label: 'Zip',
            placeholder: 'Enter Zip',
            initialValue: initialData?.zip_code || '',
            colSpan: 3,
        },
        {
            name: 'is_vip',
            type: 'radio',
            label: 'Is this a VIP Patient?',
            options: [
                { label: 'Yes', value: '1' },
                { label: 'No', value: '0' },
            ],
            initialValue: initialData?.is_vip || '0',
            colSpan: 2,
        },
        {
            name: 'gender',
            type: 'radio',
            label: 'Gender',
            options: [
                { label: 'Male', value: '1' },
                { label: 'Female', value: '0' },
            ],
            initialValue: initialData?.gender || '1',
            colSpan: 2,
        },
        {
            name: 'preferred_language',
            type: 'radio',
            label: 'Preferred Language',
            options: [
                { label: 'English', value: '1' },
                { label: 'Spanish', value: '0' },
            ],
            initialValue: initialData?.preferred_language || '1',
            colSpan: 2,
        },

        {
            name: 'accident_type',
            type: 'select',
            label: 'Accident Type',
            options: incidentTypeOptions,
            initialValue: initialincident || '',
            colSpan: 6,
            width: 'w-1/2',
        },
        {
            name: 'referral_source_id',
            type: 'select',
            label: 'Referral Source',
            options: referralSources,
            initialValue: initialData?.referralsource?.id ? initialreferral_source : null,
            colSpan: 3,
            onChange: ({ selectedOption, reset }) => {
                const rs = referralSources.find((item) => item?.value === selectedOption?.value);
                setSelectedReferralSource(rs);
                reset(['referral_source_staff_id']);
            },
        },
        {
            name: 'law_firm_id',
            type: 'select',
            label: 'Law Firm',
            options: lawFirms,
            initialValue: initialData?.law_firm_id ? initiallaw_firm : '',
            colSpan: 3,
            // onChange: (e) => handleLawFirmChange(e.value),
        },

        {
            name: 'referral_source_staff_id',
            type: 'select',
            label: 'Case Manager',
            options: selectedReferralSource?.referral_source_staff?.map((cm: any) => ({ label: `${cm.first_name} ${cm.middle_name || ''} ${cm.last_name}`, value: cm.id })),
            initialValue: initialData?.referral_source_staff?.id ? initialcasemanager : null,
            colSpan: 3,
            onChange: ({ selectedOption, resetRaw }) => {
                const cm = selectedReferralSource?.referral_source_staff?.find((item) => item?.id === selectedOption?.value);
                setSelectedCM(cm);
                resetRaw(['other_case_managers']);
            },
        },
        {
            name: 'other_case_managers',
            type: 'checkbox',
            label: 'Other Case Manager',
            options: selectedReferralSource?.referral_source_staff
                ?.map((cm: any) => ({ label: `${cm.first_name} ${cm.middle_name || ''} ${cm.last_name}`, value: cm.id }))
                .filter((cm) => cm.value !== selectedCM?.id),
            initialValue: initialData?.other_case_managers.length ? initialothercasemanager : [],
            colSpan: 3,
        },

        {
            name: 'phone',
            type: 'text',
            label: 'Phone',
            placeholder: '(555) 555-1234',
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
            name: 'medicalFiles',
            type: 'file',
            label: 'Medical Records',
            initialValue: mapArr(initialData?.medical_records, 'medical_records_file'),
            colSpan: 6,
            width: 'w-1/2',
            multiple: true,
        },
        {
            name: 'medical_note',
            type: 'textarea',
            label: 'Medical Records Note',
            placeholder: 'Enter notes about the medical records',
            initialValue: initialData?.medical_note || '',
            colSpan: 6,
        },
    ];

    const handleFormSubmit = async (formData) => {
        const formPayload = await preProcessFormData(formData);

        const url = isEdit ? `/api/patients/${initialData?.id}` : '/api/patients';
        if (isEdit) {
            formPayload.append('_method', 'PUT'); // Add for PUT requests
        }
        const response = await fetch(url, {
            method: 'POST',
            body: formPayload,
        });
        const data = await response.json();
        if (response.ok) {
            toast.success(isEdit ? ' Patient was updated successfully.' : "You've successfully added a new Patient.");
            if (onSuccess) onSuccess(); // Callback
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

export default PatientIntakeForm;
