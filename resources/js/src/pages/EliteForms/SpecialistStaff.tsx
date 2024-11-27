import React, { useEffect, useState } from 'react';
import FormComponent from '../../components/FormComponent';
import { point_of_contact, displayErrorAlert } from '../../utils/util';

function SpecialistStaff() {
    const [specialists, setSpecialists] = useState([]);
    const [designatedOffices, setDesignatedOffices] = useState([]);

    // Fetch Specialists
    useEffect(() => {
        const fetchSpecialists = async () => {
            try {
                const response = await fetch('/api/get-provider');
                const data = await response.json();

                setSpecialists(data.map((item) => ({ value: item.id, label: `${item.first_name} ${item.last_name}` })));
            } catch (error) {
                console.error('Error fetching specialists:', error);
            }
        };
        fetchSpecialists();
    }, []);

    // Fetch Designated Offices based on selected specialists
    const fetchDesignatedOffices = async (selectedSpecialists) => {
        const specialistIds = selectedSpecialists.map((specialist) => specialist.value).join('&specialist_id[]=');
        try {
            const response = await fetch(`/api/get-specialist-office?specialist_id[]=${specialistIds}`);
            const data = await response.json();

            setDesignatedOffices(data.map((item) => ({ value: item.id, label: item.street_address })));
        } catch (error) {
            console.error('Error fetching designated offices:', error);
        }
    };

    const fields = [
        {
            name: 'specialist_id',
            type: 'select',
            label: 'Specialist',
            placeholder: 'Select a specialist',
            initialValue: '',
            options: specialists,
            colSpan: 3,
            isMulti: true,
            onChange: fetchDesignatedOffices, // Fetch offices when specialists change
        },
        {
            name: 'designated_office',
            type: 'select',
            label: 'Designated Office',
            placeholder: 'Select a designated office',
            initialValue: '',
            options: designatedOffices,
            colSpan: 3,
            isMulti: true,
        },
        {
            name: 'title',
            type: 'textarea',
            label: 'Title',
            placeholder: 'Enter Title',
            initialValue: '',
            colSpan: 3,
        },
        {
            name: 'name',
            type: 'text',
            label: 'Name',
            placeholder: 'Enter Full Name',
            initialValue: '',
            colSpan: 3,
        },
        {
            name: 'staff_language',
            type: 'radio',
            label: 'Staff Language',
            options: [
                { value: 'English', label: 'English' },
                { value: 'Spanish', label: 'Spanish' },
            ],
            colSpan: 3,
        },
        {
            name: 'email',
            type: 'email',
            label: 'Email',
            placeholder: 'Enter Email',
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
            name: 'point_of_contact',
            type: 'select',
            label: 'Point of Contact',
            placeholder: 'Select Point of Contact',
            initialValue: '',
            options: point_of_contact,
            colSpan: 3,
        },
        {
            name: 'status',
            type: 'select',
            label: 'Status',
            placeholder: 'Select Status',
            initialValue: '1',
            options: [
                { value: '1', label: 'Active' },
                { value: '0', label: 'Inactive' },
            ],
            colSpan: 3,
        },
    ];

    const handleFormSubmit = async (formData) => {
        const formPayload = new FormData();
        Object.keys(formData).forEach((key) => {
            let value = formData[key];

            if (value && typeof value === 'object' && value.value) {
                value = value.value;
            }
            if (Array.isArray(value)) {
                value.forEach((item) => {
                    formPayload.append(key, item.value);
                });
                return;
            }
            formPayload.append(key, value);
        });

        console.log('Form Payload:');
        for (let [key, value] of formPayload.entries()) {
            console.log(`${key}:`, value);
        }

        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ?? '';
        const response = await fetch('/specialist-staff/store', {
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

    return <FormComponent fields={fields} onSubmit={handleFormSubmit} submitButtonText="Submit" />;
}

export default SpecialistStaff;
