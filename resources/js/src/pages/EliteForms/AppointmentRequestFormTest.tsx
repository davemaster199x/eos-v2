import React, { useState } from 'react';
import FormComponentUpdate from '../../components/FormComponent-Update';
import { appointmentTypeOptions, injection_facility_type, inOfficeInjectionTypes, surgeyCenterInjectionTypes, therapist_provided, visitTypeOptions, preProcessFormData } from '../../utils/util';
import { useQuery } from '@tanstack/react-query';
import { fetchAllPatients } from '../../api/patient';
import { useQueryParamsContext } from '../../Providers/QueryParamsProvider';
import { fetchAllProviders } from '../../api/provider';
import { toast } from 'sonner';

export default function AppointmentRequestFormTest({ className, isEdit, initialData, onSuccess }: any) {
    const { queryParams } = useQueryParamsContext();
    const [selectedProviderType, setSelectedProviderType] = useState(initialData?.provider_type || queryParams.provider_type || 'Specialist');
    const [selectedPatient, setSelectedPatient] = useState(initialData?.patient_intake || null) as any;
    const [selectedProvider, setSelectedProvider] = useState(initialData?.provider || null) as any;
    const [selectedProviderOffice, setSelectedProviderOffice] = useState(initialData?.provider_office || '') as any;
    const [selectedProviderCenter, setSelectedProviderCenter] = useState(initialData?.provider_center || '') as any;
    // End of Appointment Request States

    // Fetch the Patients from the API on component mount
    const { isLoading: isPatientsLoading, data: patients } = useQuery({
        queryKey: ['all-patients'],
        queryFn: async () => {
            const data = await fetchAllPatients();
            return data?.map((item) => ({ ...item, value: item.id, label: `${item.first_name || ''} ${item.middle_name || ''} ${item.last_name || ''}` }));
        },
    });

    const { isLoading: isProviderLoading, data: providers } = useQuery({
        queryKey: ['all-providers', selectedProviderType],

        queryFn: async () => {
            const data = await fetchAllProviders(selectedProviderType);
            return data?.map((item) => ({ ...item, value: item.id, label: `${item.first_name || ''} ${item.middle_name || ''} ${item.last_name || ''}` }));
        },
    });

    const fields = [
        {
            name: 'heading',
            heading: {
                label: isEdit ? 'Edit Appointment Request' : 'New Appointment Request',
                className: 'text-center',
            },
            width: 'w-full',
            colSpan: 6,
        },
        {
            name: 'patient_intake_id',
            type: 'select',
            label: 'Patient',
            placeholder: 'Select a patient',
            initialValue: '',
            colSpan: 3,
            options: patients,
            onChange: ({ selectedOption }) => {
                setSelectedPatient(selectedOption);
            },
            card: {
                conditionalDisplay: (formData) => !!formData?.patient_id,
                title: 'Patient Information',
                items: [
                    {
                        label: 'Referral Source',
                        value: selectedPatient?.referral_source?.referral_source_name || initialData?.referral_source?.referral_source_name || 'N/A',
                        colSpan: 3,
                    },
                    {
                        label: 'Case Manager',
                        value: selectedPatient?.referralsourcestaff?.first_name || initialData?.referralsourcestaff?.first_name || 'N/A',
                        colSpan: 3,
                    },
                    {
                        label: 'Address',
                        value: selectedPatient?.full_address || initialData?.full_address || 'N/A',
                        colSpan: 6,
                        width: 'w-1/2',
                    },
                ],
            },
            isLoading: isPatientsLoading,
        },

        {
            name: 'high_priority',
            type: 'radio',
            label: 'High Priority?',
            options: [
                { label: 'Yes', value: '1' },
                { label: 'No', value: '0' },
            ],
            initialValue: '0',
            colSpan: 3,
        },
        {
            name: 'provider_type',
            label: 'Provider Type',
            type: 'radio',
            options: [
                { label: 'Specialist', value: 'Specialist' },
                { label: 'Therapist', value: 'Therapist' },
            ],
            initialValue: selectedProviderType,
            onChange: ({ value, reset, resetRaw }) => {
                resetRaw(['appointment_type', 'provider_id', 'provider_office_id', 'surgery_center_id']);
                setSelectedProviderType(value);
            },
            colSpan: 3,
        },

        {
            name: 'visit_type',
            label: 'Visit Type',
            type: 'radio',
            options: visitTypeOptions,
            initialValue: 'In Person',
            colSpan: 3,
        },
        {
            name: 'provider_id',
            type: 'select',
            options: providers,
            label: `${selectedProviderType === 'Specialist' ? 'Specialist' : 'Therapist'} Requested`,
            placeholder: 'Select a provider',
            onChange: ({ selectedOption, resetRaw }) => {
                const provider = providers.find((item: any) => +item.value === +selectedOption.value);
                setSelectedProvider(provider || null);
                resetRaw(['provider_office_id', 'surgery_center_id']);
            },
            initialValue: null,
            colSpan: 3,
            isLoading: isProviderLoading,
        },
        {
            name: 'appointment_types',
            type: 'select',
            label: 'Appointment Type',
            options: selectedProviderType === 'Therapist' ? therapist_provided : appointmentTypeOptions,
            placeholder: 'Select an appointment type',
            initialValue: null,
            colSpan: 3,
            isMulti: selectedProviderType === 'Therapist' ? true : false,
            onChange: ({ selectedOption, reset }) => {
                reset(['injection_type']);
            },
        },
        {
            name: 'injection_type',
            type: 'radio',
            label: 'Injection Facility Type',
            options: injection_facility_type,
            placeholder: 'Select injection facility type',
            initialValue: '',
            colSpan: 3,
            conditionalDisplay: (formData) => formData.appointment_type?.value === 'Injection',
        },
        {
            name: 'in_office',
            type: 'select',
            label: 'Injection Type',
            options: inOfficeInjectionTypes,
            placeholder: 'Select injection type',
            initialValue: inOfficeInjectionTypes[0],
            colSpan: 3,
            conditionalDisplay: (formData) => formData.injection_type === 'In Office',
        },
        {
            name: 'at_surgery_center',
            type: 'select',
            label: 'Injection Type',
            options: surgeyCenterInjectionTypes,
            placeholder: 'Select injection type',
            initialValue: surgeyCenterInjectionTypes[0],
            colSpan: 3,
            conditionalDisplay: (formData) => formData.injection_type === 'At Surgery Center',
        },
        {
            name: 'provider_office_id',
            type: 'select',
            label: 'Provider Office',
            options: selectedProvider?.offices?.map((item) => ({ label: item.office_name, value: item.id })),
            placeholder: 'Select provider office',
            initialValue: null,
            colSpan: 3,
            onChange: ({ selectedOption }) => {
                const office = selectedProvider?.offices.find((item) => item.id === selectedOption.value);
                setSelectedProviderOffice(office || null);
            },
            conditionalDisplay: (formData) => {
                const { appointment_type, injection_type } = formData;

                if (appointment_type?.value === 'Surgery') {
                    return false;
                }

                if (appointment_type?.value === 'Injection' && injection_type !== 'In Office') {
                    return false;
                }

                return true;
            },
            card: {
                conditionalDisplay: (formData) => !!formData.provider_office_id,
                title: 'Office Information',
                items: [
                    {
                        label: 'Address',
                        value: selectedProviderOffice?.full_address || 'N/A',
                        colSpan: 3,
                    },

                    {
                        label: 'Office Notes',
                        value: selectedProviderOffice?.notes || 'N/A',
                        colSpan: 3,
                    },
                ],
            },
        },
        {
            name: 'surgery_center_id',
            type: 'select',
            label: 'Surgery Center',
            options: [],
            placeholder: 'Select surgery center',
            initialValue: '',
            colSpan: 3,
            conditionalDisplay: (formData) => {
                const { appointment_type, injection_type } = formData;

                if (appointment_type?.value === 'Surgery') {
                    return true;
                }

                if (appointment_type?.value === 'Injection' && injection_type === 'At Surgery Center') {
                    return true;
                }

                return false;
            },
            onChange: ({ selectedOption }) => {
                const center = selectedProvider?.centers.find((item) => item.id === selectedOption.value);
                setSelectedProviderCenter(center || null);
            },
            card: {
                conditionalDisplay: selectedProviderCenter,
                title: 'Surgery Center Information',
                items: [
                    {
                        label: 'Address',
                        value: selectedProviderCenter?.full_address || 'N/A',
                        colSpan: 3,
                    },

                    {
                        label: 'Office Notes',
                        value: selectedProviderCenter?.notes || 'N/A',
                        colSpan: 3,
                    },
                ],
            },
        },
        {
            name: 'patient_medical_records',
            type: 'file',
            label: 'Attach Medical Records',
            initialValue: null,
            colSpan: 6,
            width: 'w-1/2',
        },
        {
            name: 'notes',
            type: 'textarea',
            label: 'Notes',
            placeholder: 'Enter Notes',
            initialValue: '',
            colSpan: 6,
        },
    ];

    const handleFormSubmit = async (formData) => {
        const formPayload = await preProcessFormData(formData);
        console.log(formData);

        if (isEdit) {
            formPayload.append('_method', 'PUT'); // Add for PUT requests
        }
        const url = isEdit ? `/api/appointment-requests/${initialData.id}` : '/api/appointment-requests';
        const response = await fetch(url, {
            method: 'POST',
            body: formPayload,
        });

        const data = await response.json();

        if (response.ok) {
            toast.success(isEdit ? 'Appointment request was updated successfully.' : "You've successfully added a new appointment request.");
            if (onSuccess) onSuccess();
        } else {
            return data;
        }
    };

    return (
        <>
            <FormComponentUpdate fields={fields} initialData={initialData} onSubmit={handleFormSubmit} formClassName={className} closemodal={onSuccess} />
        </>
    );
}
