import { type ClassValue, clsx } from 'clsx';
import { format, parse } from 'date-fns';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';

export const documentTypes = [
    { label: 'Medical Record', value: 'Medical Record' },
    { label: 'Recommendation', value: 'Recommendation' },
    { label: 'Report', value: 'Report' },
    { label: 'Operative Report', value: 'Operative Report' },
    { label: 'Anesthesia Report', value: 'Anesthesia Report' },
    { label: 'Bill', value: 'Bill' },
    { label: 'Professional Bill', value: 'Professional Bill' },
    { label: 'Facility Bill', value: 'Facility Bill' },
    { label: 'Anesthesia Bill', value: 'Anesthesia Bill' },
    { label: 'MRI', value: 'MRI' },
    { label: 'Lien', value: 'Lien' },
].sort((a, b) => a.label.localeCompare(b.label));

export const recommendationRequested = [
    { label: 'MRI', value: 'MRI' },
    { label: 'Physical Therapy', value: 'Physical Therapy' },
    { label: 'Chiropractic Therapy', value: 'Chiropractic Therapy' },
    { label: 'Follow up', value: 'Follow up' },
    { label: 'Injection', value: 'Injection' },
    { label: 'Surgery', value: 'Surgery' },
    { label: 'Consult with another specialist', value: 'Consult with another specialist' },
].sort((a, b) => a.label.localeCompare(b.label));

export const states = [
    { label: 'Alabama', value: 'Alabama' },
    { label: 'Alaska', value: 'Alaska' },
    { label: 'Arizona', value: 'Arizona' },
    { label: 'Arkansas', value: 'Arkansas' },
    { label: 'California', value: 'California' },
    { label: 'Colorado', value: 'Colorado' },
    { label: 'Connecticut', value: 'Connecticut' },
    { label: 'Delaware', value: 'Delaware' },
    { label: 'Florida', value: 'Florida' },
    { label: 'Georgia', value: 'Georgia' },
    { label: 'Hawaii', value: 'Hawaii' },
    { label: 'Idaho', value: 'Idaho' },
    { label: 'Illinois', value: 'Illinois' },
    { label: 'Indiana', value: 'Indiana' },
    { label: 'Iowa', value: 'Iowa' },
    { label: 'Kansas', value: 'Kansas' },
    { label: 'Kentucky', value: 'Kentucky' },
    { label: 'Louisiana', value: 'Louisiana' },
    { label: 'Maine', value: 'Maine' },
    { label: 'Maryland', value: 'Maryland' },
    { label: 'Massachusetts', value: 'Massachusetts' },
    { label: 'Michigan', value: 'Michigan' },
    { label: 'Minnesota', value: 'Minnesota' },
    { label: 'Mississippi', value: 'Mississippi' },
    { label: 'Missouri', value: 'Missouri' },
    { label: 'Montana', value: 'Montana' },
    { label: 'Nebraska', value: 'Nebraska' },
    { label: 'Nevada', value: 'Nevada' },
    { label: 'New Hampshire', value: 'New Hampshire' },
    { label: 'New Jersey', value: 'New Jersey' },
    { label: 'New Mexico', value: 'New Mexico' },
    { label: 'New York', value: 'New York' },
    { label: 'North Carolina', value: 'North Carolina' },
    { label: 'North Dakota', value: 'North Dakota' },
    { label: 'Ohio', value: 'Ohio' },
    { label: 'Oklahoma', value: 'Oklahoma' },
    { label: 'Oregon', value: 'Oregon' },
    { label: 'Pennsylvania', value: 'Pennsylvania' },
    { label: 'Rhode Island', value: 'Rhode Island' },
    { label: 'South Carolina', value: 'South Carolina' },
    { label: 'South Dakota', value: 'South Dakota' },
    { label: 'Tennessee', value: 'Tennessee' },
    { label: 'Texas', value: 'Texas' },
    { label: 'Utah', value: 'Utah' },
    { label: 'Vermont', value: 'Vermont' },
    { label: 'Virginia', value: 'Virginia' },
    { label: 'Washington', value: 'Washington' },
    { label: 'West Virginia', value: 'West Virginia' },
    { label: 'Wisconsin', value: 'Wisconsin' },
    { label: 'Wyoming', value: 'Wyoming' },
];

export const appointmentTypeOptions = [
    { label: 'EEG', value: 'EEG' },
    { label: 'EMG Study', value: 'EMG Study' },
    { label: 'EMG/NCV', value: 'EMG/NCV' },
    { label: 'Follow up', value: 'Follow up' },
    { label: 'Initial Consultation', value: 'Initial Consultation' },
    { label: 'Injection', value: 'Injection' },
    { label: 'Medical Clearance', value: 'Medical Clearance' },
    { label: 'Surgery', value: 'Surgery' },
    { label: 'Surgery Pre - Ops', value: 'Surgery Pre - Ops' },
];

export const visitTypeOptions = [
    { value: 'In Person', label: 'In Person' },
    { value: 'Telemedicine', label: 'Telemedicine' },
];

export const inOfficeInjectionTypes = [
    { label: '(TPI) Trigger Point injection', value: '(TPI) Trigger Point injection' },
    { label: 'Bilateral Lumbar Paraspinous Musculature Trigger Point Injection', value: 'Bilateral Lumbar Paraspinous Musculature Trigger Point Injection' },
    { label: 'Corticosteroid Injection', value: 'Corticosteroid Injection' },
    { label: 'PRP', value: 'PRP' },
];

export const surgeyCenterInjectionTypes = [
    { label: 'Bilateral Cervical Transforaminal Epidural Injection', value: 'Bilateral Cervical Transforaminal Epidural Injection' },
    { label: 'Bilateral Lumbar Transforaminal Epidural Injection', value: 'Bilateral Lumbar Transforaminal Epidural Injection' },
    { label: 'Caudal Epidural Steroid Injection', value: 'Caudal Epidural Steroid Injection' },
    { label: 'Cervical Epidural Steroid Injection', value: 'Cervical Epidural Steroid Injection' },
    { label: 'Epidural Steroid Injection', value: 'Epidural Steroid Injection' },
    { label: 'Facet Joint Injection', value: 'Facet Joint Injection' },
    { label: 'Interlaminar Epidural Steroid Injection', value: 'Interlaminar Epidural Steroid Injection' },
    { label: 'Lumbar Epidural Steroid Injection', value: 'Lumbar Epidural Steroid Injection' },
    { label: 'Medial Branch Block', value: 'Medial Branch Block' },
    { label: 'PRP', value: 'PRP' },
    { label: 'Transforaminal Epidural Steroid Injection', value: 'Transforaminal Epidural Steroid Injection' },
];

export const pay_status = [
    { label: 'For Retention', value: 'For Retention' },
    { label: 'Is Not Paying', value: 'Is Not Paying' },
    { label: 'Is Paying', value: 'Is Paying' },
    { label: 'Not in Network', value: 'Not in Network' },
    { label: 'On Hold', value: 'On Hold' },
];

export const specialty_name = [
    { label: 'Cardiologist', value: 'Cardiologist' },
    { label: 'General Surgeon', value: 'General Surgeon' },
    { label: 'Internal Medicine', value: 'Internal Medicine' },
    { label: 'Neurologist', value: 'Neurologist' },
    { label: 'Neurosurgeon', value: 'Neurosurgeon' },
    { label: 'Neuropsych', value: 'Neuropsych' },
    { label: 'Opthalmologist', value: 'Opthalmologist' },
    { label: 'Orthopedic Surgeon', value: 'Orthopedic Surgeon' },
    { label: 'Orthospine', value: 'Orthospine' },
    { label: 'Pain Management', value: 'Pain Management' },
    { label: 'Plastic Surgeon', value: 'Plastic Surgeon' },
    { label: 'Podiatrist', value: 'Podiatrist' },
    { label: 'Psychologist', value: 'Psychologist' },
    {
        label: 'Emergency Medicine',
        value: 'Emergency Medicine',
    },
    {
        label: 'Sports Medicine',
        value: 'Sports Medicine',
    },
    {
        label: 'Orthopedic Specialist',
        value: 'Orthopedic Specialist',
    },
    {
        label: 'Neuropsychology',
        value: 'Neuropsychology',
    },
];

export const therapist_provided = [
    { label: 'Acupuncture', value: 'Acupuncture' },
    { label: 'Chiropractic Therapy', value: 'Chiropractic Therapy' },
    { label: 'Massage Therapy', value: 'Massage Therapy' },
    { label: 'Physical Therapy', value: 'Physical Therapy' },
    { label: 'Physiotherapy', value: 'Physiotherapy' },
    { label: 'Post Operative Home Health', value: 'Post Operative Home Health' },
    { label: 'Vestibular Therapy', value: 'Vestibular Therapy' },
];

export const language = [
    { label: 'English', value: 'English' },
    { label: 'Spanish', value: 'Spanish' },
];

export const ptchiro_appointment_types = [
    { value: 'Acupuncture', label: 'Acupuncture' },
    { value: 'Chiropractic Therapy', label: 'Chiropractic Therapy' },
    { value: 'Massage Therapy', label: 'Massage Therapy' },
    { value: 'Physical Therapy', label: 'Physical Therapy' },
    { value: 'Physiotherapy', label: 'Physiotherapy' },
    { value: 'Vestibular Therapy', label: 'Vestibular Therapy' },
];

export const incidentTypeOptions = [
    { label: 'Assault', value: 'Assault' },
    { label: 'Auto Accident', value: 'Auto Accident' },
    { label: 'Auto v. Auto major damage', value: 'Auto v. Auto major damage' },
    { label: 'Burn injuries', value: 'Burn injuries' },
    { label: 'Car Accident', value: 'Car Accident' },
    { label: 'Commercial accidents', value: 'Commercial accidents' },
    { label: 'Dog Bite', value: 'Dog Bite' },
    { label: 'Food poisoning', value: 'Food poisoning' },
    { label: 'Motor Vehicle Accident (MVA)', value: 'Motor Vehicle Accident (MVA)' },
    { label: 'MVA - Pedestrian vs car accidents', value: 'MVA - Pedestrian vs car accidents' },
    { label: 'MVA - rear-ended', value: 'MVA - rear-ended' },
    { label: 'MVA - side swiped', value: 'MVA - side swiped' },
    { label: 'MVA - T-boned', value: 'MVA - T-boned' },
    { label: 'Personal Injury', value: 'Personal Injury' },
    { label: 'Rear End', value: 'Rear End' },
    { label: 'Rear End; Hit n Run', value: 'Rear End; Hit n Run' },
    { label: 'Slip and Fall', value: 'Slip and Fall' },
];

export const point_of_contact = [
    { value: 'Billing', label: 'Billing' },
    { value: 'Follow ups', label: 'Follow ups' },
    { value: 'Initial Consults', label: 'Initial Consults' },
    { value: 'Recommendations', label: 'Recommendations' },
    { value: 'Reports', label: 'Reports' },
    { value: 'Surgical Operative Reports', label: 'Surgical Operative Reports' },
];

export const provider_type = [
    { label: 'Specialist', value: 'Specialist' },
    { label: 'Therapist', value: 'Therapist' },
];

export const injection_facility_type = [
    { label: 'At Surgery Center', value: 'At Surgery Center' },
    { label: 'In Office', value: 'In Office' },
];

export const note_type = [
    { label: 'Appointment', value: 'Appointment' },
    { label: 'In General', value: 'General' },
    { label: 'Items Needed ', value: 'Items Needed' },
    { label: 'Laboratory', value: 'Laboratory' },
    { label: 'Lien', value: 'Lien' },
    { label: 'MRI', value: 'MRI' },
    { label: 'PT/Chiro ', value: 'PT/Chiro' },
    { label: 'Records', value: 'Records' },
];

export const items_needed_for_appointment = [
    { label: 'Approved by DO', value: 'Approved by DO' },
    { label: 'Approved by RS', value: 'Approved by RS' },
    { label: 'Approved by the Patient', value: 'Approved by the Patient' },
    { label: 'Consent forms', value: 'Consent forms' },
    { label: 'Facility lien', value: 'Facility lien' },
    { label: 'Lien', value: 'Lien' },
    { label: 'Past Medical Records', value: 'Past Medical Records' },
    { label: 'Report/Imaging Report', value: 'Report/Imaging Report' },
];

export const business_types = [
    { label: 'Law Firm', value: 'Law Firm' },
    { label: 'Funding Company', value: 'Funding Company' },
    { label: 'Other', value: 'Other' },
];

export const mri_appointmentment_status = [
    { label: 'Pending', value: 'Pending ' },
    { label: 'Cancelled', value: 'Cancelled' },
    { label: 'Rescheduled', value: 'Rescheduled' },
    { label: 'Completed', value: 'Completed' },
    { label: 'No-Show', value: 'No-Show' },
].sort((a, b) => a.label.localeCompare(b.label));

export const getSelectStyles = (theme) => {
    if (theme === 'light') {
        return {
            control: (provided) => ({
                ...provided,
                WebkitTextSizeAdjust: '100%',
                tabSize: '4',
                WebkitTapHighlightColor: 'transparent',
                animationDuration: '1s',
                animationDelay: '1s',
                animationIterationCount: '1',
                WebkitFontSmoothing: 'antialiased',
                boxSizing: 'border-box',
                borderStyle: 'solid',
                borderRadius: '0.375rem',
                borderWidth: '1px',
                fontSize: '0.875rem',
                lineHeight: '1.25rem',
                fontWeight: '600',
                outline: '2px solid transparent !important',
                outlineOffset: '2px !important',
                backgroundColor: 'rgb(255 255 255 / var(--tw-bg-opacity))',
                color: 'rgb(14 23 38 / var(--tw-text-opacity))',
            }),
            option: (provided, state) => ({
                ...provided,
                fontFamily: 'inherit',
                fontFeatureSettings: 'inherit',
                fontVariationSettings: 'inherit',
                margin: '0',
                textTransform: 'none',
                appearance: 'none',
                width: '100%',
                '--tw-border-opacity': 1,
                '--tw-bg-opacity': 1,
                '--tw-text-opacity': 1,
                borderColor: 'rgb(224 230 237 / var(--tw-border-opacity))',
                backgroundColor: 'rgb(255 255 255 / var(--tw-bg-opacity))',
                color: 'rgb(14 23 38 / var(--tw-text-opacity))',
                boxShadow: '0 0 #0000',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                    backgroundColor: state.isSelected ? 'rgb(224 230 237 / 1)' : 'rgb(224 230 237 / 0.5)',
                },
            }),
            menu: (provided) => ({
                ...provided,
                boxSizing: 'border-box',
            }),
            // Add more customizations for other parts of the component if necessary
        };
    } else {
        return {
            control: (provided) => ({
                ...provided,
                WebkitTextSizeAdjust: '100%',
                tabSize: '4',
                WebkitTapHighlightColor: 'rgba(18, 30, 50, 1)',
                animationDuration: '1s',
                animationDelay: '1s',
                animationIterationCount: '1',
                WebkitFontSmoothing: 'antialiased',
                boxSizing: 'border-box',
                borderStyle: 'solid',
                borderRadius: '0.375rem',
                borderWidth: '1px',
                fontSize: '0.875rem',
                lineHeight: '1.25rem',
                fontWeight: '600',
                outline: '2px solid transparent !important',
                borderColor: 'rgba(23, 38, 60, 1)',
                backgroundColor: 'rgba(18, 30, 50, 1)',
                color: 'white',
            }),
            option: (provided, state) => ({
                ...provided,
                fontFamily: 'inherit',
                fontFeatureSettings: 'inherit',
                fontVariationSettings: 'inherit',
                margin: '0',
                textTransform: 'none',
                appearance: 'none',
                width: '100%',
                '--tw-border-opacity': 1,
                '--tw-bg-opacity': 1,
                '--tw-text-opacity': 1,
                borderColor: 'rgba(23, 38, 60, var(--tw-border-opacity))',
                backgroundColor: 'rgba(18, 30, 50, var(--tw-bg-opacity))',
                color: 'white',
                boxShadow: '0 0 #0000',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                    backgroundColor: state.isSelected ? 'rgba(18, 30, 50, 1)' : 'rgba(136, 142, 168, 0.5)',
                },
            }),
            menu: (provided) => ({
                ...provided,
                boxSizing: 'border-box',
            }),
            // Add more customizations for other parts of the component if necessary
        };
    }
};

export const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return format(date, 'MM/dd/yyyy');
};

export const formatTime = (timeString) => {
    if (!timeString) return '';

    // Parse the time string (now using HH:mm:ss format)
    const date = parse(timeString, 'HH:mm:ss', new Date());

    // Format to 12-hour time without seconds
    return format(date, 'h:mm a');
};

/**
 * Creates an object composed of the picked object properties.
 *
 * @param {Object} obj - The source object.
 * @param {string[]} keys - The property names to pick from the object.
 * @returns {Object} A new object with only the picked properties.
 *
 * @example
 * const user = { id: 1, name: 'John Doe', email: 'john@example.com', age: 30 };
 * const pickedUser = pick(user, ['id', 'name']);
 * console.log(pickedUser); // { id: 1, name: 'John Doe' }
 */
export function pick(obj, keys) {
    return keys.reduce((result, key) => {
        if (key in obj) {
            result[key] = obj[key];
        }
        return result;
    }, {});
}

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
//
export const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export async function getCoordinates(address?: string): Promise<{ longitude: number; latitude: number } | null> {
    if (!address) return null;
    const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiZWxpdGVtY2FyZSIsImEiOiJjbHk4d2hnYWMwbDhtMmtvajBvaWt2cjd2In0.gkNCaHLno7ByPjk2WiGCbQ';

    const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json`;
    const params = new URLSearchParams({
        access_token: MAPBOX_ACCESS_TOKEN,
        limit: '1', // Limit to one result
    });
    const url = `${endpoint}?${params}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

        if (data.features && data.features.length > 0) {
            const [longitude, latitude] = data.features[0].center;
            return { longitude, latitude };
        } else {
            throw new Error('No results found');
        }
    } catch (error) {
        toast.error('Cannot fetch coordinates: ' + error.message);
        throw error;
    }
}

export async function getAddress(longitude: number, latitude: number): Promise<string> {
    const MAPBOX_ACCESS_TOKEN = await fetch('/config')
        .then((r) => r.json())
        .then((r) => r.mapbox);

    const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json`;
    const params = new URLSearchParams({
        access_token: MAPBOX_ACCESS_TOKEN,
        limit: '1', // Limit to one result
    });

    try {
        const response = await fetch(`${endpoint}?${params}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

        if (data.features && data.features.length > 0) {
            return data.features[0].place_name;
        } else {
            throw new Error('No results found');
        }
    } catch (error) {
        toast.error('Error fetching address:', error.message);
        throw error;
    }
}

export const preProcessFormData = async (formData: any) => {
    const formPayload = new FormData();

    for (const [key, value] of Object.entries(formData)) {
        if (key === 'zip_code' || key === 'zip') {
            formPayload.delete('zip_code');
            formPayload.append('zip_code', value as string);
            continue;
        }

        if (value && typeof value === 'object') {
            if ('download_url' in value) {
                // This is a file object, convert it
                const file = await convertFileObjectToFile(value);
                if (file) {
                    formPayload.append(key, file);
                }
                continue;
            } else if ('value' in value) {
                formPayload.append(key, value.value as string);
                continue;
            }
        }

        if (Array.isArray(value)) {
            for (const item of value) {
                let processedItem = item;
                if (typeof item === 'object') {
                    if ('download_url' in item) {
                        // This is a file object in an array
                        const file = await convertFileObjectToFile(item);
                        if (file) {
                            formPayload.append(`${key}[]`, file);
                        }
                        continue;
                    } else if ('value' in item) {
                        processedItem = item.value;
                    }
                }

                if (key === 'specialty_name' && typeof processedItem === 'string') {
                    processedItem = processedItem.replace(/[^a-zA-Z0-9\s]/g, '').trim();
                }

                if (processedItem) {
                    formPayload.append(`${key}[]`, processedItem);
                }
            }
        } else if (key === 'provider_id') {
            if (typeof value !== 'object') {
                formPayload.append(key, value as string);
            }
        } else {
            formPayload.append(key, value as string | Blob);
        }
    }

    return formPayload;
};

export async function convertFileObjectToFile(fileObj) {
    if (!fileObj || !fileObj.download_url) {
        return null;
    }

    try {
        const response = await fetch(fileObj.download_url);
        const blob = await response.blob();
        return new File([blob], fileObj.name, { type: fileObj.mime_type });
    } catch (error) {
        toast.error('Error converting file object to File:', error);
        return null;
    }
}

export const displayErrorAlert = (data: any): void => {
    if (data.errors && typeof data.errors === 'object') {
        const errorMessages = Object.entries(data.errors)
            .map(([field, messages]) => {
                if (Array.isArray(messages)) {
                    return `${field}: ${messages.join(', ')}`;
                }
                return `${field}: ${messages}`;
            })
            .join('\n');
        alert(`Validation Errors:\n${errorMessages}`);
    } else if (data.error && typeof data.error === 'string') {
        alert(data.error);
    } else {
        alert('An error occurred while submitting the form.');
    }
};

export const getFileType = (fileOrUrl: FileOrInfo): string => {
    if (typeof fileOrUrl === 'string') {
        const extension = fileOrUrl.split('.').pop()?.toLowerCase();
        switch (extension) {
            case 'pdf':
                return 'application/pdf';
            case 'jpg':
            case 'jpeg':
            case 'png':
            case 'gif':
                return `image/${extension}`;
            case 'txt':
                return 'text/plain';
            default:
                return 'unknown';
        }
    } else if (fileOrUrl instanceof File) {
        return fileOrUrl.type || 'unknown';
    } else if ((fileOrUrl as FileInfo).mime_type) {
        return ((fileOrUrl as FileInfo).mime_type as string) || 'unknown';
    }
    return 'unknown';
};
