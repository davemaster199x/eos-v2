import React, { useEffect, useState } from 'react';
import FormComponent from '../../components/FormComponent';
import { preProcessFormData, formatDate, formatTime, mri_appointmentment_status } from '../../utils/util';
import { toast } from 'sonner';
function MRIAppointmentForm({ initialData = {}, className, onSuccess, isEdit }: any) {
    const [patients, setPatients] = useState([]);
    const [facilities, setFacilities] = useState([]);
    // console.log(initialData);
    // Fetch Patients
    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await fetch('/api/patients');
                const data = await response.json();

                setPatients(data.map((item) => ({ value: item.id, label: `${item.first_name || ''} ${item.middle_name || ''} ${item.last_name || ''}` })));
            } catch (error) {
                console.error('Error fetching patients:', error);
            }
        };
        fetchPatients();
    }, []);
    // Fetch MRI facilities
    useEffect(() => {
        const fetchFacilities = async () => {
            try {
                const response = await fetch('/api/mri-facilities');
                const data = await response.json();

                setFacilities(data.map((item) => ({ value: item.id, label: item.facility_name })));
            } catch (error) {
                console.error('Error fetching facilities:', error);
            }
        };
        fetchFacilities();
    }, []);

    const fields = [
        {
            name: 'heading',
            heading: {
                label: isEdit ? 'Edit MRI Appointment' : 'Add MRI Appointment',
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
            initialValue: isEdit ? { value: initialData?.patient?.id, label: `${initialData?.patient?.first_name} ${initialData?.patient?.middle_name || ''} ${initialData?.patient?.last_name}` } : '',
            options: patients,
            colSpan: 6,
            width: 'w-1/2',
        },
        {
            name: 'mri_facility_id',
            type: 'select',
            label: 'Facility Requested',
            placeholder: 'Select a facility',
            initialValue: isEdit ? { value: initialData?.mri_facility?.id, label: `${initialData?.mri_facility?.facility_name}` } : '',
            options: facilities,
            colSpan: 6,
            width: 'w-1/2',
        },
        {
            name: 'appointment_date',
            type: 'date',
            label: 'Appointment Date',
            placeholder: 'Select Appointment Date',
            initialValue: isEdit ? formatDate(initialData?.appointment_date) : new Date(),
            colSpan: 3,
            width: 'w-1/3',
        },
        {
            name: 'appointment_time',
            type: 'time',
            label: 'Appointment Time',
            placeholder: 'Select Appointment Time',
            initialValue: initialData?.appointment_time || new Date(),
            colSpan: 3,
            width: 'w-1/3',
        },
        {
            name: 'mri_appt_status',
            type: 'select',
            label: 'Appointment Status',
            placeholder: 'Select a status',
            initialValue: isEdit ? { value: initialData?.mri_appt_status, label: initialData?.mri_appt_status } : '',
            options: mri_appointmentment_status,
            colSpan: 6,
            width: 'w-1/2',
            conditionalDisplay: (formData) => formData.mri_appt_status != '',
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
        const url = isEdit ? `/api/mri-appointments/${initialData?.id}` : '/api/mri-appointments';

        console.log('Form Payload:');
        for (let [key, value] of formPayload.entries()) {
            console.log(`${key}:`, value);
        }
        if (isEdit) {
            formPayload.append('_method', 'PUT'); // Add for PUT requests
        }
        const response = await fetch(url, {
            method: 'POST', // Always use POST, even for PUT requests
            body: formPayload,
        });

        const data = await response.json();

        if (response.ok) {
            toast.success(isEdit ? ' MRI appointment was updated successfully.' : "You've successfully added a new mri appointment.");
            if (onSuccess) onSuccess?.();
        } else {
            return data;
        }
    };

    return <FormComponent fields={fields} onSubmit={handleFormSubmit} formClassName={className} submitButtonText={isEdit ? 'Update' : 'Submit'} closemodal={onSuccess} />;
}

export default MRIAppointmentForm;
