import React, { useState, useEffect } from 'react';
import FormComponent from '../../components/FormComponent';
import { states, displayErrorAlert } from '../../utils/util'; // Assuming `states` utility is imported as in other forms

function SpecialistOfficeForm() {
    const [specialists, setSpecialists] = useState([]);
    const [specialties, setSpecialties] = useState<{ value: string; label: string }[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchSpecialists = async () => {
            try {
                const response = await fetch('/api/get-specialist');
                const data = await response.json();
                setSpecialists(
                    data.map((specialist) => ({
                        value: specialist.id,
                        label: `${specialist.first_name} ${specialist.last_name}`,
                    }))
                );
            } catch (error) {
                console.error('Error fetching specialists:', error);
            }
        };

        fetchSpecialists();

        // Load available specialties, this is static in the blade but could be dynamic
        setSpecialties([
            { value: 'Pain Management', label: 'Pain Management' },
            { value: 'Orthopedic Surgeon', label: 'Orthopedic Surgeon' },
            { value: 'Neurosurgeon', label: 'Neurosurgeon' },
            { value: 'Neurologist', label: 'Neurologist' },
            { value: 'Orthospine', label: 'Orthospine' },
            { value: 'Podiatrist', label: 'Podiatrist' },
            { value: 'Internal Medicine', label: 'Internal Medicine' },
        ]);
    }, []);

    const fields = [
        {
            name: 'specialist_id',
            type: 'select',
            label: 'Specialist',
            options: specialists,
            initialValue: '',
            colSpan: 6,
        },
        {
            name: 'full_address',
            type: 'text',
            label: 'Home Address',
            placeholder: 'Enter Home Address',
            initialValue: '',
            customHandler: true,
            autoComplete: 'off',
            colSpan: 6,
        },
        {
            name: 'street_address',
            type: 'text',
            label: 'Street Address',
            placeholder: 'Enter Street Address',
            initialValue: '',
            colSpan: 3,
        },
        {
            name: 'city',
            type: 'text',
            label: 'City',
            placeholder: 'Enter City',
            initialValue: '',
            colSpan: 3,
        },
        { name: 'state', type: 'select', label: 'State', options: states.map((state) => ({ value: state, label: state })), colSpan: 3 },
        {
            name: 'zip',
            type: 'text',
            label: 'Zip',
            placeholder: 'Enter Zip',
            initialValue: '',
            colSpan: 3,
        },
        {
            name: 'office_name',
            type: 'textarea',
            label: 'Office Name',
            placeholder: 'Enter Office Name',
            initialValue: '',
            colSpan: 3,
        },
        {
            name: 'office_notes',
            type: 'textarea',
            label: 'Office Notes',
            placeholder: 'Enter Office Notes',
            initialValue: '',
            colSpan: 3,
        },
        {
            name: 'phone',
            type: 'text',
            label: 'Phone',
            placeholder: 'Enter Phone',
            initialValue: '',
            colSpan: 3,
        },
        {
            name: 'specialties_offered',
            type: 'select',
            label: 'Specialties Offered at This Office',
            options: specialties,
            isMulti: true,
            initialValue: [],
            colSpan: 3,
        },
        {
            name: 'image_of_office',
            type: 'file',
            label: 'Image of Office',
            initialValue: null,
            colSpan: 3,
        },
        {
            name: 'status',
            type: 'select',
            label: 'Status',
            options: [
                { value: '1', label: 'Active' },
                { value: '0', label: 'Inactive' },
            ],
            initialValue: '1',
            colSpan: 3,
        },
    ];

    const handleFormSubmit = async (formData) => {
        const formPayload = new FormData();
        Object.keys(formData).forEach((key) => {
            let value = formData[key];

            // If the value is an array of objects, extract the 'value' property from each object
            if (Array.isArray(value)) {
                value = value.map((item) => (item && typeof item === 'object' && 'value' in item ? item.value : item));
            }

            // If the value is an object with a 'value' property, extract it
            if (value && typeof value === 'object' && 'value' in value) {
                value = value.value;
            }

            // If the processed value is still an array (e.g., after the above mapping), append each item individually
            if (Array.isArray(value)) {
                value.forEach((item) => formPayload.append(`${key}[]`, item));
            } else {
                formPayload.append(key, value);
            }
        });

        console.log('Form Payload:', formData);
        for (let [key, value] of formPayload.entries()) {
            console.log(`${key}:`, value);
        }

        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ?? '';
        const response = await fetch('/specialist-office/store', {
            method: 'POST',
            body: formPayload,
            headers: {
                'X-CSRF-TOKEN': csrfToken,
            },
        });
        const data = await response.json();
        console.log(response);
        if (response.ok) {
            alert("Success! You've successfully completed your action.");
        } else {
            displayErrorAlert(data);
        }
    };

    return <FormComponent fields={fields} onSubmit={handleFormSubmit} submitButtonText="Submit" />;
}

export default SpecialistOfficeForm;
