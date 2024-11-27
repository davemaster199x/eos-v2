import React, { useEffect, useState } from 'react';
import FormComponent from '../../components/FormComponent';
import { preProcessFormData } from '../../utils/util';
import { toast } from 'sonner';
import { fetchAllPatients } from '../../api/patient';
import { useQuery } from '@tanstack/react-query';
import { fetchAllMriFacility } from '../../api/mri-facility';
import { mapArr } from '../../utils/helpers';
import { FilePreviewModal } from '../../components/FilePreviewModal';
import { FileListItem } from '../../components/FileListItem';
function MRiAppointmentRequestForm({ className, onSuccess, isEdit, initialData }: any) {
    const [patientMedRecords, setPatientMedRecords] = useState(initialData?.patient.medical_records || null) as any;
    const { isLoading: isPatientsLoading, data: patients } = useQuery({
        queryKey: ['all-patients'],
        queryFn: async () => {
            const data = await fetchAllPatients();
            return data.map((item) => ({ ...item, value: item.id, label: `${item.first_name || ''} ${item.middle_name || ''} ${item.last_name || ''}` }));
        },
    });
    const { isLoading: isFacilityLoading, data: facilities } = useQuery({
        queryKey: ['all-mri-facilities'],
        queryFn: async () => {
            const data = await fetchAllMriFacility();
            return data.map((item) => ({ ...item, value: item.id, label: item.facility_name }));
        },
    });
    console.log(facilities);
    const initialPatient = {
        value: initialData?.patient_id,
        label: `${initialData?.patient?.first_name || ''} ${initialData?.patient?.middle_name || ''} ${initialData?.patient?.last_name || ''}`.trim(),
    };

    const initialFacility = {
        value: initialData?.facility?.id,
        label: initialData?.facility?.facility_name,
    };
    console.log(initialFacility);
    const fields = [
        {
            name: 'heading',
            heading: {
                label: isEdit ? 'Edit MRI Appointment Request' : 'New MRI Appointment Request',
                className: 'text-center',
            },
            width: 'w-full',
            colSpan: 6,
        },
        {
            name: 'high_priority',
            type: 'radio',
            label: 'High Priority?',
            options: [
                { label: 'Yes', value: '1' },
                { label: 'No', value: '0' },
            ],
            initialValue: initialData?.high_priority || '0',
            colSpan: 3,
        },
        {
            name: 'patient_id',
            type: 'select',
            label: 'Patient',
            placeholder: 'Select a patient',
            initialValue: initialData?.patient ? initialPatient : null,
            options: patients,
            colSpan: 6,
            width: 'w-1/2',
            isLoading: isPatientsLoading,
            onChange: ({ selectedOption }) => {
                const patient = patients.find((item) => item.value === selectedOption?.value);
                setPatientMedRecords(patient?.medical_records || null);
            },
        },

        {
            name: 'facility_id',
            type: 'select',
            label: 'Facility Requested',
            placeholder: 'Select a facility',
            initialValue: initialData?.facility ? initialFacility : null,
            options: facilities,
            colSpan: 6,
            width: 'w-1/2',
            isLoading: isFacilityLoading,
        },
        {
            label: 'Patient Medical Records',
            renderItem: () => (
                <div className="w-full flex flex-col gap-2">
                    {patientMedRecords?.map((item) => (
                        <FileListItem index={item.id} key={item.id} file={item.medical_records_file} hasRemoveButton={false} />
                    ))}
                </div>
            ),
            colSpan: 6,
            width: 'w-1/2',
            conditionalDisplay: () => patientMedRecords?.length,
        },
        {
            name: 'notes',
            type: 'textarea',
            label: 'Notes',
            placeholder: 'Enter Notes',
            initialValue: initialData?.notes || '',
            colSpan: 6,
        },
    ];

    const handleFormSubmit = async (formData) => {
        const formPayload = await preProcessFormData(formData);
        const url = isEdit ? `/api/mri-appointment-requests/${initialData?.id}` : '/api/mri-appointment-requests';
        if (isEdit) {
            formPayload.append('_method', 'PUT');
        }
        const response = await fetch(url, {
            method: 'POST',
            body: formPayload,
        });
        const data = await response.json();
        if (response.ok) {
            toast.success(isEdit ? 'MRI appointment request was updated successfully.' : "You've successfully added a new mri appointment request.");
            if (onSuccess) onSuccess?.();
        } else {
            return data;
        }
    };

    return <FormComponent fields={fields} onSubmit={handleFormSubmit} formClassName={className} closemodal={onSuccess} submitButtonText={isEdit ? 'Update' : 'Submit'} />;
}

export default MRiAppointmentRequestForm;
