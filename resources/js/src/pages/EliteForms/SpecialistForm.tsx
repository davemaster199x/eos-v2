import React, { useEffect, useState } from 'react';
import FormComponent from '../../components/FormComponent';
import { states, pay_status, specialist_name, language, displayErrorAlert } from '../../utils/util';

function SpecialistForm({ className }: any) {
    const [lawFirmOptions, setLawFirmOptions] = useState([]);

    useEffect(() => {
        // Fetch law firms and update the options
        fetch('/api/law-firms')
            .then((response) => response.json())
            .then((data) => {
                const formattedOptions = data.map((firm) => ({
                    label: firm.law_firm_name,
                    value: firm.id,
                }));
                setLawFirmOptions(formattedOptions);
            })
            .catch((error) => console.error('Error fetching law firms:', error));
    }, []);

    const fields = [
        // First Name
        { name: 'first_name', type: 'text', label: 'First Name', placeholder: 'Enter First Name', initialValue: '', colSpan: 3 },

        // Middle Name
        { name: 'middle_name', type: 'text', label: 'Middle Name', placeholder: 'Enter Middle Name', initialValue: '', colSpan: 3 },

        // Last Name
        { name: 'last_name', type: 'text', label: 'Last Name', placeholder: 'Enter Last Name', initialValue: '', colSpan: 3 },

        // Status
        {
            name: 'status',
            type: 'select',
            label: 'Status',
            options: [
                { label: 'Active', value: '1' },
                { label: 'Inactive', value: '0' },
            ],
            initialValue: '1',
            colSpan: 3,
        },

        // Payment Status
        {
            name: 'pay_status',
            type: 'select',
            label: 'Payment Status',
            options: pay_status,
            initialValue: 'Is Paying',
            colSpan: 3,
        },

        // Specialty (multiple select)
        {
            name: 'specialist_name',
            type: 'select',
            label: 'Specialty',
            options: specialist_name,
            isMulti: true,
            initialValue: [],
            colSpan: 3,
        },

        // Email
        { name: 'email', type: 'email', label: 'Email', placeholder: 'Enter Email', initialValue: '', colSpan: 3 },

        // Phone
        { name: 'phone', type: 'text', label: 'Phone', placeholder: '(555) 555-1234', initialValue: '', colSpan: 3 },

        // Specialist Language (radio buttons)
        {
            name: 'specialist_language',
            type: 'radio',
            label: 'Specialist Language',
            options: language,
            initialValue: 'English',
            colSpan: 3,
        },

        // Specialist Communication Notes
        {
            name: 'specialist_communication_note',
            type: 'textarea',
            label: 'Specialist Communication Notes',
            placeholder: '',
            initialValue: '',
            colSpan: 3,
        },

        // Headshot
        { name: 'headshotFile', type: 'file', label: 'Headshot', initialValue: null, colSpan: 3 },

        // Lien
        { name: 'lienFile', type: 'file', label: 'Lien', initialValue: null, colSpan: 3 },

        // CV
        { name: 'cvFile', type: 'file', label: 'Cv', initialValue: null, colSpan: 3 },

        // Signed Contract
        { name: 'signedcontractFile', type: 'file', label: 'Signed Contract', initialValue: null, colSpan: 3 },

        // W9
        { name: 'w9File', type: 'file', label: 'W9', initialValue: null, colSpan: 3 },

        // Provider Collection Form (multiple files)
        {
            name: 'providercollectionFormFiles',
            type: 'file',
            label: 'Provider Collection Form',
            initialValue: null,
            colSpan: 3,
            multiple: true,
        },

        // Other Documents
        { name: 'otherdocumentsFiles', type: 'file', label: 'Other Documents', initialValue: null, colSpan: 3 },

        // Blacklisted Law Firm (multiple select)
        {
            name: 'blacklisted_law_firm_id',
            type: 'select',
            label: 'Blacklisted Law Firm',
            options: lawFirmOptions,
            isMulti: true,
            initialValue: [],
            colSpan: 3,
        },
    ];

    const handleFormSubmit = async (formData) => {
        const formPayload = new FormData();
        Object.keys(formData).forEach((key) => {
            let value = formData[key];

            // Handle the items_needed array correctly
            if (key === 'specialist_name' || (key === 'blacklisted_law_firm_id' && Array.isArray(value))) {
                value.forEach((item, index) => {
                    formPayload.append(`${key}[${index}]`, item.value);
                });
            } else {
                // If value is an object with a `value` property (as in react-select), extract the `value`
                if (value && typeof value === 'object' && value.value) {
                    value = value.value;
                }
                formPayload.append(key, value);
            }
        });

        console.log('Form Payload:');
        for (let [key, value] of formPayload.entries()) {
            console.log(`${key}:`, value);
        }

        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ?? '';
        const response = await fetch('/specialist/store', {
            method: 'POST',
            body: formPayload,
            headers: {
                'X-CSRF-TOKEN': csrfToken,
            },
        });
        const data = await response.json();
        if (response.ok) {
            alert("Success! You've successfully completed your action.");
        } else {
            displayErrorAlert(data);
        }
    };

    return <FormComponent fields={fields} onSubmit={handleFormSubmit} formClassName={className} submitButtonText="Submit" />;
}

export default SpecialistForm;
