import React, { useState } from 'react';
import FormComponent from '../../components/FormComponent';
import {
    appointmentTypeOptions,
    injection_facility_type,
    inOfficeInjectionTypes,
    items_needed_for_appointment,
    surgeyCenterInjectionTypes,
    therapist_provided,
    visitTypeOptions,
    preProcessFormData,
} from '../../utils/util';
import { fetchAllPatients } from '../../api/patient';
import { fetchAllProviders } from '../../api/provider';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { mapArr } from '../../utils/helpers';
import { format } from 'date-fns';

function AppointmentForm({ className, onSuccess, isEdit, initialData }: any) {
    const [selectedProviderType, setSelectedProviderType] = useState(initialData?.provider_type || 'Specialist');
    const [selectedPatient, setSelectedPatient] = useState(initialData?.patient || null) as any;
    const [selectedProvider, setSelectedProvider] = useState(initialData?.provider || null) as any;
    const [selectedProviderOffice, setSelectedProviderOffice] = useState(initialData?.provider_office || null) as any;
    const [selectedProviderCenter, setSelectedProviderCenter] = useState(initialData?.surgery_center || null) as any;

    const {
        isLoading: isPatientLoading,
        error: patientError,
        data: dbPatients,
    } = useQuery({
        queryKey: ['patients'],
        queryFn: fetchAllPatients,
    });

    const { isLoading: isLoadingProviders, data: dbProviders } = useQuery({
        queryKey: ['providers', selectedProviderType],
        queryFn: () => fetchAllProviders(selectedProviderType),
    });

    const patients = dbPatients?.map((patient: any) => ({ ...patient, value: patient.id, label: `${patient.first_name || ''} ${patient.middle_name || ''} ${patient.last_name || ''}` }));
    const providers = dbProviders?.map((provider: any) => ({ ...provider, value: provider.id, label: `${provider.first_name || ''} ${provider.middle_name || ''} ${provider.last_name || ''}` }));

    // initial data
    const initialPatient = {
        value: initialData?.patient?.id,
        label: `${initialData?.patient?.first_name || ''} ${initialData?.patient?.middle_name || ''} ${initialData?.patient?.last_name || ''}`.trim(),
    };

    const initialProvider = {
        value: initialData?.provider?.id,
        label: `${initialData?.provider?.first_name || ''} ${initialData?.provider?.middle_name || ''} ${initialData?.provider?.last_name || ''}`.trim(),
    };

    const initialAppointmentTypes =
        initialData?.provider?.provider_type === 'Specialist'
            ? {
                  label: initialData?.appointment_types[0]?.name,
                  value: initialData?.appointment_types[0]?.name,
              }
            : initialData?.appointment_types.map((apptType) => ({
                  label: apptType?.name,
                  value: apptType?.name,
              }));

    const initialInjectionTypeInOffice = {
        label: initialData?.in_office,
        value: initialData?.in_office,
    };

    const initialInjectionTypeSurgeyCenter = {
        label: initialData?.at_sugery_center,
        value: initialData?.at_sugery_center,
    };

    const initialProviderOffice = {
        value: initialData?.provider_office?.id,
        label: initialData?.provider_office?.office_name,
    };

    const initialProviderCenter = {
        value: initialData?.surgery_center?.id,
        label: initialData?.surgery_center?.name,
    };

    const initialItemsNeeded = mapArr(initialData?.items_needed, 'name');

    const fields = [
        {
            name: 'heading',
            heading: {
                label: isEdit ? 'Edit Appointment' : 'Add Appointment',
                className: 'text-center',
            },
            width: 'w-full',
            colSpan: 6,
        },
        {
            name: 'patient_id',
            type: 'select',
            label: 'Patient',
            placeholder: 'Select a patient',
            initialValue: initialData?.patient ? initialPatient : null,
            colSpan: 6,
            width: 'w-1/2',
            options: patients,
            onChange: ({ selectedOption }) => {
                setSelectedPatient(selectedOption);
            },
            card: {
                conditionalDisplay: (formData) => !!formData.patient_id,
                title: 'Patient Information',
                items: [
                    {
                        label: 'Referral Source',
                        value: 'Fake RS',
                        colSpan: 3,
                    },
                    {
                        label: 'Case Manager',
                        value: 'Fake CM',
                        colSpan: 3,
                    },
                    {
                        label: 'Address',
                        value: selectedPatient?.full_address,
                        colSpan: 6,
                        width: 'w-1/2',
                    },
                ],
            },
            isLoading: isPatientLoading,
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
            onChange: ({ value, reset }) => {
                reset(['appointment_type', 'provider_id', 'provider_office_id', 'surgery_center_id']);
                setSelectedProviderType(value);
            },
            colSpan: 3,
        },

        {
            name: 'visit_type',
            label: 'Visit Type',
            type: 'radio',
            options: visitTypeOptions,
            initialValue: initialData?.visit_type || 'In Person',
            colSpan: 3,
        },
        {
            name: 'provider_id',
            type: 'select',
            options: providers,

            label: `${selectedProviderType === 'Specialist' ? 'Specialist' : 'Therapist'} Requested`,
            placeholder: 'Select a provider',
            onChange: ({ selectedOption }) => {
                const provider = providers.find((item: any) => item.value === selectedOption.value);
                setSelectedProvider(provider || null);
            },
            initialValue: initialData?.provider ? initialProvider : null,
            colSpan: 3,
            isLoading: isLoadingProviders,
        },
        {
            name: 'appointment_type',
            type: 'select',
            label: 'Appointment Type',
            options: selectedProviderType === 'Therapist' ? therapist_provided : appointmentTypeOptions,
            placeholder: 'Select an appointment type',
            initialValue: initialData?.appointment_types ? initialAppointmentTypes : null,
            colSpan: 3,
            isMulti: selectedProviderType === 'Therapist' ? true : false,
        },
        {
            name: 'injection_type',
            type: 'radio',
            label: 'Injection Facility Type',
            options: injection_facility_type,
            placeholder: 'Select injection facility type',
            initialValue: initialData?.injection_type || 'In Office',
            colSpan: 3,
            conditionalDisplay: (formData) => formData.appointment_type?.value === 'Injection',
        },
        {
            name: 'in_office',
            type: 'select',
            label: 'Injection Type',
            options: inOfficeInjectionTypes,
            placeholder: 'Select injection type',
            initialValue: initialData?.in_office ? initialInjectionTypeInOffice : inOfficeInjectionTypes[0],
            colSpan: 3,
            conditionalDisplay: (formData) => {
                if (formData.appointment_type?.value === 'Injection' && formData?.injection_type === 'In Office') {
                    return true;
                }
                return false;
            },
        },
        {
            name: 'at_surgery_center',
            type: 'select',
            label: 'Injection Type',
            options: surgeyCenterInjectionTypes,
            placeholder: 'Select injection type',
            initialValue: initialData?.at_sugery_center ? initialInjectionTypeSurgeyCenter : surgeyCenterInjectionTypes[0],
            colSpan: 3,
            conditionalDisplay: (formData) => {
                if (formData.appointment_type?.value === 'Injection' && formData?.injection_type === 'At Surgery Center') {
                    return true;
                }
                return false;
            },
        },
        {
            name: 'provider_office_id',
            type: 'select',
            label: 'Provider Office',
            options: selectedProvider?.offices?.map((item) => ({ label: item.office_name, value: item.id })),
            placeholder: 'Select provider office',
            initialValue: initialData?.provider_office ? initialProviderOffice : null,
            colSpan: 6,
            width: 'w-1/2',
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
                        value: selectedProviderOffice?.full_address,
                        colSpan: 3,
                    },

                    {
                        label: 'Office Notes',
                        value: selectedProviderOffice?.notes,
                        colSpan: 3,
                    },
                ],
            },
        },
        {
            name: 'surgery_center_id',
            type: 'select',
            label: 'Surgery Center',
            options: selectedProvider?.centers?.map((item) => ({ label: item.name, value: item.id })),
            placeholder: 'Select surgery center',
            initialValue: initialData?.surgery_center ? initialProviderCenter : null,
            colSpan: 6,
            width: 'w-1/2',
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
                        value: selectedProviderCenter?.full_address,
                        colSpan: 3,
                    },

                    {
                        label: 'Office Notes',
                        value: selectedProviderCenter?.notes,
                        colSpan: 3,
                    },
                ],
            },
        },
        {
            name: 'appointment_date',
            type: 'date',
            label: 'Appointment Date',
            placeholder: 'Select Appointment Date',
            initialValue: initialData?.appointment_date || new Date(),
            colSpan: 3,
            className: 'w-1/3',
        },
        {
            name: 'appointment_time',
            type: 'time',
            label: 'Appointment Time',
            placeholder: 'Select Appointment Time',
            format: 'H:i',
            initialValue: initialData?.appointment_time ? format(new Date(initialData?.appointment_time), 'HH:mm') : format(new Date(), 'HH:mm'),
            colSpan: 3,
            className: 'w-1/3',
        },
        {
            name: 'items_needed',
            type: 'checkbox',
            label: 'Items Needed for Appointment',
            options: items_needed_for_appointment,
            initialValue: initialData?.items_needed ? initialItemsNeeded : [],
            colSpan: 6,
            isMulti: true, // Allow multiple selections
        },
        {
            name: 'lien_file',
            type: 'file',
            label: 'Attach Lien',
            initialValue: initialData?.lien_file || null,
            colSpan: 6,
            width: 'w-1/2',
        },
        {
            name: 'special_notes',
            type: 'textarea',
            label: 'Special Notes',
            placeholder: 'Enter Special Notes',
            initialValue: initialData?.special_notes || '',
            colSpan: 6,
        },
    ];

    const handleFormSubmit = async (formData) => {
        const formPayload = await preProcessFormData(formData);
        if (isEdit) {
            formPayload.append('_method', 'PUT');
        }

        const url = isEdit ? `/api/patient-appointments/${initialData?.id}` : '/api/patient-appointments';
        const response = await fetch(url, {
            method: 'POST',
            body: formPayload,
        });
        const data = await response.json();
        if (response.ok) {
            toast.success(isEdit ? ' Patient appointment was updated successfully.' : "You've successfully added a new patient appointment.");
            if (onSuccess) onSuccess?.();
        } else {
            return data;
        }
    };

    return (
        <>
            <FormComponent fields={fields} onSubmit={handleFormSubmit} formClassName={className} closemodal={onSuccess} submitButtonText={isEdit ? 'Update' : 'Submit'} />
        </>
    );
}

export default AppointmentForm;
