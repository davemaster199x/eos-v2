import React, { useEffect, useState } from 'react';
import FormComponent from '../../components/FormComponent';
import { note_type, preProcessFormData } from '../../utils/util';
import { toast } from 'sonner';

function PatientNotes({ className, isEdit }: any) {

    const [patients, setPatients] = useState([]);

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
    const fields = [
        {
            name: 'heading',
            heading: {
                label: isEdit ? 'Edit Patient Notes' : 'Add Patient Notes',
                className: 'text-center',
            },
            width: 'w-full',
            colSpan: 6,
        },
        {
            name: 'patient_intake_id',
            type: 'select',
            label: 'Patient',
            options: patients,
            initialValue: '1',
            colSpan: 6,
            width: 'w-1/2',
        },
        {
            name: 'note_type',
            type: 'select',
            label: 'Note Type',
            options: note_type,
            initialValue: '1',
            colSpan: 6,
            width: 'w-1/2',
        },
        {
            name: 'notes',
            type: 'textarea',
            label: 'Note',
            placeholder: 'Enter Notes',
            initialValue: '',
            colSpan: 6,
        },
    ];

    const handleFormSubmit = async (formData) => {
        const formPayload = await preProcessFormData(formData);
        console.log('Form Payload:');
        for (let [key, value] of formPayload.entries()) {
            console.log(`${key}:`, value);
        }
        const response = await fetch('/api/patient-note', {
            method: 'POST',
            body: formPayload,
        });
        const data = await response.json();
        if (response.ok) {
            toast.success(isEdit ? ' Patient note was updated successfully.' : "You've successfully added a new patient note.");
        } else {
            return data;
        }
    };

    return <FormComponent fields={fields} onSubmit={handleFormSubmit} formClassName={className} submitButtonText="Submit" />;
}

export default PatientNotes;
