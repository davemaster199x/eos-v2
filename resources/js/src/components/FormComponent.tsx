import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Flatpickr from 'react-flatpickr';
import Select from 'react-select';
import 'flatpickr/dist/themes/material_blue.css'; // Import the desired theme
import { cn, getSelectStyles } from '../utils/util';
import { FileUpload } from './FileUpload';
import FormFieldSkeletonLoader from './FormFieldSkeletonLoader';
import Alert from './Alert';

// Type for a single option in select, radio, or checkbox fields
type OptionType = {
    value: string;
    label: string;
};

// Type for the card object used in some fields
type CardType = {
    title?: string;
    items: Array<{
        label: string;
        value: string;
        colSpan?: number;
        width?: string;
    }>;
    conditionalDisplay?: (formData: any) => boolean;
};

// Type for a single field
export type FieldType = {
    name: string;
    isLoading?: boolean;
    label?: string;
    type?: 'text' | 'email' | 'number' | 'select' | 'file' | 'date' | 'textarea' | 'radio' | 'checkbox' | 'time' | 'group';
    placeholder?: string;
    initialValue?: any;
    colSpan?: number;
    width?: string;
    className?: string;
    autoComplete?: string;
    customHandler?: boolean;
    onChange?: (params: {
        e?: React.ChangeEvent<HTMLInputElement>;
        selectedOption?: OptionType;
        reset: Function;
        resetRaw: Function;
        formData: any;
        setFormData: React.Dispatch<React.SetStateAction<any>>;
    }) => void;
    onAddressSelect?: (params: { street: string; city: string; state: string; zip: string; setFormData: React.Dispatch<React.SetStateAction<any>> }) => void;
    onFileChange?: (file: File | File[]) => void;
    options?: OptionType[];
    isMulti?: boolean;
    multiple?: boolean;
    rows?: number;
    heading?: {
        label: string;
        className?: string;
    };
    card?: CardType;
    conditionalDisplay?: (formData: any) => boolean;
    text?: string; // For 'group' type fields
};

// Type for the array of fields
export type FieldsType = FieldType[];

export const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
};

const hasFieldError = (formError, fieldName) => {
    if (!formError || !formError.errors) {
        return false;
    }
    return Object.keys(formError.errors).includes(fieldName);
};

/**
 * Get the error message for a field from the form error object.
 *
 * @param {Object} formError - The form error object
 * @param {string} fieldName - The name of the field
 * @returns {string|null} The error message if it exists, null otherwise
 */
const getFieldErrorMessage = (formError, fieldName) => {
    if (!formError || !formError.errors || !formError.errors[fieldName]) {
        return null;
    }
    return formError.errors[fieldName][0]; // Assuming the first error message is sufficient
};

// Usage example:
// const errorMessage = getFieldErrorMessage(formError, field.name);
// if (errorMessage) {
//   // Display error message
// }

function FormComponent({ fields, onSubmit, submitButtonText = 'Submit', formClassName = '', editViewClass = '', closemodal = () => {} }) {
    const [formData, setFormData] = useState(() => {
        return fields.reduce((acc, field) => {
            acc[field.name] = field.initialValue || '';
            return acc;
        }, {});
    });
    const [loading, setLoading] = useState(false);
    const [addressSuggestions, setAddressSuggestions] = useState<any[]>([]);
    const [formError, setFormError] = useState<any>(null);
    const themeConfig = useSelector((state: any) => state.themeConfig);
    const selectStyles = getSelectStyles(themeConfig.theme);
    // Functions --------------------------------------------------------------
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => {
            if (type === 'checkbox') {
                // Create a new array for the selected values
                const currentArray = prev[name] || [];

                if (checked) {
                    // If the checkbox is checked, add the value to the array
                    return { ...prev, [name]: [...currentArray, value] };
                } else {
                    // If the checkbox is unchecked, remove the value from the array
                    return { ...prev, [name]: currentArray.filter((item) => item !== value) };
                }
            } else {
                return { ...prev, [name]: value };
            }
        });
    };

    const handleDateChange = (date, name) => {
        setFormData((prev) => ({ ...prev, [name]: date[0] }));
    };

    const handleSelectChange = (selectedOption, fieldName) => {
        setFormData((prev) => ({ ...prev, [fieldName]: selectedOption }));
    };

    const handleFileChange = (field, files: File[]) => {
        field.onFileChange?.(field.multiple ? files : files[0]);
        setFormData((prev) =>
            field.multiple
                ? { ...prev, [field.name]: files || [] } // Convert FileList to array
                : { ...prev, [field.name]: files[0] }
        );
    };

    const resetRaw = (selectedFields) => {
        setFormData((prev) => {
            const resetFields = selectedFields.reduce((acc, fieldName) => {
                const field = fields.find((f) => f.name === fieldName);
                if (field) {
                    // Use initialValue if it exists, otherwise use an empty string
                    acc[fieldName] = '';
                }
                return acc;
            }, {});

            return {
                ...prev,
                ...resetFields,
            };
        });
    };

    const reset = (selectedFields) => {
        setFormData((prev) => {
            const resetFields = selectedFields.reduce((acc, fieldName) => {
                const field = fields.find((f) => f.name === fieldName);
                if (field) {
                    // Use initialValue if it exists, otherwise use an empty string
                    acc[fieldName] = field.initialValue ?? '';
                }
                return acc;
            }, {});

            return {
                ...prev,
                ...resetFields,
            };
        });
    };

    // VERSION 1
    // const reset = (selectedFields) => {
    //     console.log(fields); // this is the original fields with name, initialValue, etc..
    //     // selectedFields consist of an array of field names (string)
    //     setFormData((prev) => ({
    //         ...prev,
    //         ...selectedFields.reduce((acc, fieldName) => {
    //             console.log('field', fieldName);
    //             acc[fieldName] = fields?.[fieldName]?.initialValue ?? ''; // Use nullish coalescing
    //             return acc;
    //         }, {}),
    //     }));
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = await onSubmit(formData);
            // ValidationException
            if (data?.errors) {
                document.getElementById('form-error')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                setFormError(data);
                return;
            }

            // Exception
            if (data?.error) {
                document.getElementById('form-error')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                setFormError(data);
                return;
            }

            setFormData(
                fields.reduce((acc, field) => {
                    acc[field.name] = field.initialValue || '';
                    return acc;
                }, {})
            );
            setFormError(null);

            //scroll to form-error id
        } catch (error) {
            alert('Error! Your submission could not be completed.');
        } finally {
            setLoading(false);
        }
    };

    const handleAddressInput = async (e) => {
        const query = e.target.value;
        setFormData((prev) => ({ ...prev, full_address: query }));
        debouncedFetchSuggestions(query);
    };

    const debouncedFetchSuggestions = useRef(
        debounce(async (query) => {
            if (query.length < 3) {
                setAddressSuggestions([]);
                return;
            }

            try {
                const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ?? '';
                const response = await fetch(`/api/addressSuggestions?query=${query}`, {
                    headers: {
                        'X-CSRF-TOKEN': csrfToken,
                    },
                });

                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    const data = await response.json();
                    setAddressSuggestions(data.features || []);
                } else {
                    console.error('Received non-JSON response');
                }
            } catch (error) {
                console.error('Error fetching address suggestions:', error);
            }
        }, 300) // 300ms debounce delay
    ).current;

    const renderCard = (card) => {
        return (
            <div className="border rounded-md p-3 bg-gray-50 text-sm">
                <label className=" border-l-2 border-black font-bold pl-2">{card?.title || 'Info'}</label>
                <div className="grid grid-cols-1 md:grid-cols-6 gap-2 mt-3">
                    {card?.items.map((field, index) => (
                        <div key={index} className={`flex flex-col gap-1 col-span-${field?.colSpan || 6} ${field?.width || 'w-full'}`}>
                            <p className="font-bold">{field?.label}:</p>
                            <p className="">{field?.value}</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    };
    const renderInput = (field) => {
        if (field?.isLoading) {
            return <FormFieldSkeletonLoader />;
        }
        const inputHandler = (field.customHandler && handleAddressInput) || handleInputChange;
        switch (field.type) {
            case 'text':
            case 'email':
            case 'number':
                return (
                    <>
                        <input
                            id={field.name}
                            name={field.name}
                            type={field.type}
                            placeholder={field.placeholder}
                            className={`form-input`}
                            value={formData[field.name]}
                            onChange={(e) => {
                                inputHandler(e);
                                if (field.onChange) {
                                    field.onChange({ e, formData, reset, resetRaw }); // Call the custom onChange handler if provided
                                }
                            }}
                            autoComplete={field.autoComplete || 'on'}
                        />
                        {field.name === 'full_address' && addressSuggestions.length > 0 && (
                            <div className="suggestions-dropdown absolute border border-gray-300 bg-white w-full mt-1 z-10">
                                {addressSuggestions.map((suggestion, index) => (
                                    <div
                                        key={index}
                                        className="text-sm suggestion-item p-2 cursor-pointer hover:bg-gray-100"
                                        onClick={() => {
                                            handleAddressSelect(suggestion);

                                            const context = suggestion.context;
                                            let street = suggestion.place_name;
                                            let city = '';
                                            let state = '';
                                            let zip = '';
                                            context.forEach((part) => {
                                                if (part.id.includes('place')) {
                                                    city = part.text;
                                                } else if (part.id.includes('region')) {
                                                    state = part.text;
                                                } else if (part.id.includes('postcode')) {
                                                    zip = part.text;
                                                }
                                            });

                                            if (field.onAddressSelect) {
                                                field.onAddressSelect({ street, city, state, zip, setFormData });
                                            }
                                        }}
                                    >
                                        {suggestion.place_name}
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                );
            case 'select':
                return (
                    <Select
                        id={field.name}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={(selectedOption) => {
                            handleSelectChange(selectedOption, field.name);
                            if (field.onChange) {
                                field.onChange({ selectedOption, reset, resetRaw, formData, setFormData }); // Call the custom onChange handler if provided
                            }
                        }}
                        options={field.options}
                        isMulti={field.isMulti || false}
                        placeholder={field.placeholder}
                        isClearable={true}
                        styles={selectStyles}
                        className="text-sm"
                    />
                );
            case 'file':
                return (
                    <FileUpload
                        id={field.name}
                        name={field.name}
                        value={formData[field.name]}
                        type="file"
                        multiple={field.multiple || false}
                        onFileChange={(files: any) => handleFileChange(field, files)}
                    />
                );

            case 'date':
                return (
                    <Flatpickr
                        id={field.name}
                        name={field.name}
                        value={formData[field.name]}
                        className="form-input"
                        options={{ dateFormat: 'm-d-Y' }}
                        onChange={(date) => handleDateChange(date, field.name)}
                    />
                );
            case 'textarea':
                return (
                    <textarea id={field.name} name={field.name} placeholder={field.placeholder} className="form-textarea" value={formData[field.name]} onChange={inputHandler} rows={field.rows || 3} />
                );
            case 'radio':
                return (
                    <div className="flex-1">
                        {field.options.map((option) => (
                            <div className="mb-2" key={option.value}>
                                <label className="inline-flex cursor-pointer items-center">
                                    <input
                                        type="radio"
                                        name={field.name}
                                        value={option.value}
                                        className="form-radio"
                                        checked={formData[field.name] === option.value}
                                        onChange={(e) => {
                                            inputHandler(e); // Updates the form state
                                            if (field.onChange) {
                                                field.onChange({ value: option.value, label: option.label, reset, resetRaw }); // Pass the selected option to the handler
                                            }
                                        }}
                                    />
                                    <span className="text-sm text-white-dark">{option.label}</span>
                                </label>
                            </div>
                        ))}
                    </div>
                );
            case 'checkbox':
                return (
                    <div className="flex-1">
                        {field.options?.map((option) => {
                            return (
                                <div className="mb-2" key={option.value}>
                                    <label className="inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            name={field.name}
                                            value={option.value}
                                            className="form-checkbox"
                                            checked={formData[field.name]?.includes(String(option.value) || option.value)}
                                            onChange={(e) => {
                                                inputHandler(e);
                                                if (field.onChange) {
                                                    field.onChange({ option, reset, resetRaw }); // Pass the selected option to the handler
                                                }
                                            }}
                                        />
                                        <span className="text-sm text-white-dark">{option.label}</span>
                                    </label>
                                </div>
                            );
                        })}
                    </div>
                );
            case 'time':
                return <input id={field.name} name={field.name} type="time" className="form-input" value={formData[field.name]} onChange={inputHandler} />;
            case 'group': // This case is for the "Office Schedule" section with <hr> and <h1>
                return (
                    <>
                        <hr className="my-4 border-gray-300" /> {/* Break line */}
                        <h1 className="text-2xl font-bold mb-4">{field.text}</h1> {/* h1 label */}
                    </>
                );
            default:
                return null;
        }
    };

    const handleAddressSelect = (suggestion) => {
        const { place_name, geometry, context } = suggestion;
        const lat = geometry.coordinates[1];
        const lon = geometry.coordinates[0];

        let street = place_name;
        let city = '';
        let state = '';
        let zip = '';

        context.forEach((part) => {
            if (part.id.includes('place')) {
                city = part.text;
            } else if (part.id.includes('region')) {
                state = part.text;
            } else if (part.id.includes('postcode')) {
                zip = part.text;
            }
        });

        setFormData({
            ...formData,
            full_address: place_name,
            street_address: street.split(',')[0],
            city,
            state: {
                value: state,
                label: state,
            },
            zip,
            latitude: lat,
            longitude: lon,
        });
        setAddressSuggestions([]);
    };

    return (
        <div className={editViewClass ? editViewClass : cn('panel my-[20px] mx-[65px]', formClassName)}>
            {formError && (
                <div id="form-error" className="mb-4">
                    <Alert type="danger" title={formError?.message || 'Error'} message={formError?.errors} hasCloseButton={false} />
                </div>
            )}
            <form className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4" onSubmit={handleSubmit}>
                {fields.map((field, index) => {
                    // Check if the field should be conditionally displayed
                    const shouldDisplay = typeof field.conditionalDisplay === 'function' ? field.conditionalDisplay(formData) : true;
                    if (!shouldDisplay) {
                        return null;
                    }

                    const cardShouldDisplay = field.card && typeof field.card.conditionalDisplay === 'function' ? field.card.conditionalDisplay(formData) : false;

                    return (
                        <div key={index} className={cn(`col-span-${field.colSpan || 1} ${field.width || 'w-full'} `, field?.className)}>
                            {field?.heading && <h2 className={cn('text-lg font-semibold mb-4', field.heading.className)}>{field.heading.label}</h2>}
                            {field?.label && <label className="text-sm">{field.label}</label>}
                            {field?.renderItem ? field.renderItem(formData) : renderInput(field)}
                            {hasFieldError(formError, field.name) && (
                                <div className="mt-1">
                                    <span className="text-red-500 text-sm">{formError.errors[field.name][0]}</span>{' '}
                                </div>
                            )}
                            {cardShouldDisplay ? <div className="mt-2">{renderCard(field.card)}</div> : null}
                        </div>
                    );
                })}
                <div className="col-span-full flex justify-end space-x-2 mt-6">
                    {submitButtonText === 'Update' && (
                        <button type="button" className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 text-sm" onClick={closemodal}>
                            Cancel
                        </button>
                    )}
                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2  text-sm">
                        {loading ? (
                            <svg
                                viewBox="0 0 24 24"
                                width="24"
                                height="24"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="inline-block h-5 w-5 animate-spin"
                            >
                                <line x1="12" y1="2" x2="12" y2="6"></line>
                                <line x1="12" y1="18" x2="12" y2="22"></line>
                                <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                                <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                                <line x1="2" y1="12" x2="6" y2="12"></line>
                                <line x1="18" y1="12" x2="22" y2="12"></line>
                                <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                                <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
                            </svg>
                        ) : (
                            submitButtonText
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default FormComponent;
