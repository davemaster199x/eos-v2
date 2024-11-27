import React from 'react';
import FormComponent, { FieldsType } from '../../components/FormComponent';
import { documentTypes, preProcessFormData, recommendationRequested } from '../../utils/util';
import { useQuery } from '@tanstack/react-query';
import { fetchAllPatients } from '../../api/patient';
import { fetchAllProviderOffices, fetchAllProviders } from '../../api/provider';
import { mapArr } from '../../utils/helpers';
import { toast } from 'sonner';

function DocumentForm({ className, isEdit, initialData, onSuccess }: any) {
    const submitBtn = isEdit ? 'Update' : 'Submit';

    const { isLoading: isPatientLoading, data: dbPatients } = useQuery({
        queryKey: ['patients'],
        queryFn: fetchAllPatients,
    });

    const { isLoading: isLoadingProviders, data: dbProviders } = useQuery({
        queryKey: ['providers'],
        queryFn: () => fetchAllProviders('Specialist'),
    });

    const { isLoading: isPOfficeLoading, data: dbProviderOffice } = useQuery({
        queryKey: ['all-provider-office'],
        queryFn: () => fetchAllProviderOffices('Therapist'),
    });

    // Get options
    const providerOpts = dbProviders?.map((item) => ({
        value: item.id,
        label: `${item.first_name || ''} ${item.middle_name || ''} ${item.last_name || ''}`.trim(),
    }));
    const patientOpts =
        dbPatients?.map((item) => ({
            value: item.id,
            label: `${item.first_name || ''} ${item.middle_name || ''} ${item.last_name || ''}`.trim(),
        })) || [];

    const officeOpts =
        dbProviderOffice?.map((item) => ({
            value: item.id,
            label: item.office_name,
        })) || [];

    // initial data
    const initialPatient = {
        value: initialData?.patient_intake?.id,
        label: `${initialData?.patient_intake?.first_name || ''} ${initialData?.patient_intake?.middle_name || ''} ${initialData?.patient_intake?.last_name || ''}`.trim(),
    };

    const initialDocType = {
        value: initialData?.document_type,
        label: initialData?.document_type,
    };

    const initialRecoRequested = initialData?.recommendation_requested?.map((item: any) => item.recommendation_requested);

    const initialNearestFacility = {
        value: initialData?.nearest_facility?.id,
        label: initialData?.nearest_facility?.office_name,
    };

    const initialNearestSpecialist = {
        value: initialData?.nearest_specialist?.id,
        label: initialData?.nearest_specialist?.office_name,
    };

    const fields: FieldsType = [
        {
            name: 'heading',
            heading: {
                label: isEdit ? 'Edit Document' : 'Add Document',
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
            initialValue: initialData?.patient_intake ? initialPatient : null,
            options: patientOpts,
            colSpan: 6,
            className: 'w-1/2',
            isLoading: isPatientLoading,
        },
        {
            name: 'document_type',
            type: 'select',
            label: 'Document Type',
            placeholder: 'Select a document type',
            initialValue: initialData?.document_type ? initialDocType : null,
            options: documentTypes,
            colSpan: 6,
            className: 'w-1/2',
            onChange: ({ reset }) => {
                reset(['bill_amount', 'notes', 'documents', 'recommendation_requested']);
            },
        },
        {
            name: 'recommendation_requested',
            type: 'checkbox',
            label: 'Recommendation Requested',
            placeholder: 'Select a document type',
            initialValue: initialData?.recommendation_requested ? initialRecoRequested : null,
            options: recommendationRequested,
            colSpan: 6,
            className: 'w-1/2',
            onChange: ({ formData, reset }: any) => {
                reset(['nearest_specialist', 'nearest_facility']);
            },
            conditionalDisplay: (formData) => formData.document_type?.value === 'Recommendation',
        },
        {
            name: 'nearest_facility',
            type: 'select',
            label: 'Nearest Facility',
            placeholder: 'Select a nearest facility',
            initialValue: initialData?.nearest_facility ? initialNearestFacility : null,
            options: officeOpts,
            colSpan: 3,
            conditionalDisplay: (formData) => formData.recommendation_requested?.includes('Physical Therapy') || formData.recommendation_requested?.includes('Chiropractic Therapy'),
            isLoading: isPOfficeLoading,
        },
        {
            name: 'nearest_specialist',
            type: 'select',
            label: 'Nearest Specialist',
            placeholder: 'Select a nearest facility',
            initialValue: initialData?.nearest_specialist ? initialNearestSpecialist : null,
            options: providerOpts,
            colSpan: 3,
            conditionalDisplay: (formData) => formData.recommendation_requested?.includes('Consult with another specialist'),
            isLoading: isLoadingProviders,
        },

        {
            name: 'bill_amount',
            type: 'text',
            label: 'Bill Amount',
            placeholder: 'Enter Bill Amount',
            initialValue: '',
            colSpan: 3,
            conditionalDisplay: (formData) =>
                formData.document_type?.value === 'Bill' ||
                formData.document_type?.value === 'Professional Bill' ||
                formData.document_type?.value === 'Facility Bill' ||
                formData.document_type?.value === 'Anesthesia Bill',
        },
        {
            name: 'documents',
            type: 'file',
            label: 'Attach Files',
            multiple: true,
            initialValue: initialData?.documents ? mapArr(initialData?.documents, 'document_file') : [],
            colSpan: 3,
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
        if (isEdit) {
            formPayload.append('_method', 'PUT');
        }
        const url = isEdit ? `/api/documents/${initialData?.id}` : '/api/documents';
        const response = await fetch(url, {
            method: 'POST',
            body: formPayload,
        });

        const data = await response.json();

        if (response.ok) {
            toast.success(isEdit ? ' Document was updated successfully.' : "You've successfully added a new Document.");
            if (onSuccess) onSuccess();
        } else {
            return data;
        }
    };

    return <FormComponent fields={fields} onSubmit={handleFormSubmit} formClassName={className} submitButtonText={submitBtn} />;
}

export default DocumentForm;
