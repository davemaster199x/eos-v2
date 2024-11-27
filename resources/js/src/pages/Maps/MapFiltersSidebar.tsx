import React, { useState, useEffect, useLayoutEffect, cloneElement, useRef, useCallback } from 'react';
import Select from 'react-select';
import axios from 'axios';
import { specialty_name, therapist_provided } from '../../utils/util';
import { useQueryParamsContext } from '../../Providers/QueryParamsProvider';
import { useMaps } from '../../Providers/MapsProviders';
import { MRILogo, SpecialistLogo, SurgeryLogo, TherapistLogo } from '../../components/Images/FacilitiesLogo';
import Slider from 'rc-slider';
import type { SliderProps } from 'rc-slider';
import 'rc-slider/assets/index.css';
import { debounce } from '../../components/FormComponent';
import { useQuery } from '@tanstack/react-query';
import { fetchAllProviders, fetchProviders } from '../../api/provider';

interface HandleProps {
    value: number;
    dragging: boolean;
    index: number;
    restProps: any;
}

const CustomHandle: React.FC<HandleProps> = ({ value, dragging, index, ...restProps }) => {
    const [inputValue, setInputValue] = useState(value);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setInputValue(value);
    }, [value]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseFloat(e.target.value);
        setInputValue(newValue);
        // You might want to trigger the slider's onChange here if you want immediate updates
    };

    const handleInputBlur = () => {
        if (restProps.onAfterChange) {
            restProps.onAfterChange(inputValue);
        }
    };

    return (
        <div
            {...restProps}
            onClick={(e) => {
                e.stopPropagation();
                inputRef.current?.focus();
            }}
            style={{
                ...restProps.style,
                width: '40px',
                height: '40px',
                background: '#fff',
                border: '2px solid #1890ff',
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: dragging ? 'grabbing' : 'grab',
            }}
        >
            <input
                ref={inputRef}
                type="number"
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                style={{
                    width: '30px',
                    border: 'none',
                    background: 'transparent',
                    textAlign: 'center',
                    fontSize: '12px',
                }}
            />
        </div>
    );
};

const MapFiltersSidebar = () => {
    const { updateCircle, recenterMap: onRecenter, facilities } = useMaps();

    const { queryParams, setQueryParams } = useQueryParamsContext();

    const [addressSuggestions, setAddressSuggestions] = useState([]); // To hold the address suggestions
    const { isLoading, error, data } = useQuery({
        queryKey: ['providers', queryParams.facility_type],
        queryFn: () => fetchAllProviders(queryParams.facility_type),
    });
    const providers = data?.map((provider) => ({
        value: provider.id,
        label: `${provider.first_name} ${provider.last_name}`,
    }));

    // Filter states
    const [address, setAddress] = useState(queryParams.address || '');
    const [provider, setProvider] = useState(queryParams.provider_id || null) as any;
    const [city, setCity] = useState(queryParams.city || '');
    const [zipcode, setZipcode] = useState(queryParams.zipcode || '');
    const [specialties, setSpecialties] = useState(queryParams.specialties ? queryParams.specialties.split(',') : []);
    const [therapies, setTherapies] = useState(queryParams.therapies ? queryParams.therapies.split(',') : []);
    const [radius, setRadius] = useState(queryParams.radius || 10);
    const radiusInputRef = useRef<HTMLInputElement>(null);
    const [radiusDragging, setRadiusDragging] = useState(false);
    const [q, setQ] = useState(queryParams.q || '');

    const debouncedSetQueryParams = debounce((params) => setQueryParams(params), 500);

    useEffect(() => {
        setQueryParams({
            ...queryParams,
            show: address ? 'distance' : 'all',
            city: city,
            zipcode: zipcode,
            specialties: specialties.join(','),
            therapies: therapies.join(','),
            address: address,
            provider_id: typeof provider === 'object' ? provider?.value : provider,
            radius: String(radius),
            q: q,
        });
    }, [city, zipcode, specialties, therapies, provider, address, radius, q]);

    // clear filters
    // useEffect(() => {
    //     handleClearFilters();
    // }, []);

    // Function to handle city input
    const handleCityInput = async (e) => {
        const query = e.target.value;
        setCity(query);
    };

    // Function to handle ZIP code input
    const handleZipInput = async (e) => {
        const query = e.target.value;
        setZipcode(query);
    };

    const handleProviderChange = (selectedOption) => {
        setProvider(selectedOption);
    };

    const handleSpecialityChange = (e) => {
        const { value } = e.target;
        setSpecialties((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]));
    };

    const handleTherapiesChange = (e) => {
        const value = e.target.value;
        setTherapies((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]));
    };

    const handleRadiusChange = (e) => {
        setRadiusDragging(true);
        setRadius(e);
    };

    const handleFacilityTypeClick = (type) => {
        setQueryParams({ ...queryParams, facility_type: type, specialties: '' });

        setProvider(null);
        setTherapies([]);
        setSpecialties([]);
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
        }, 200) // 200ms debounce delay
    ).current;

    // Address input handling
    const handleAddressInput = useCallback((e) => {
        const query = e.target.value;
        setAddress(query);

        // Immediate check for short queries
        if (query.length < 3) {
            setAddressSuggestions([]);
            return;
        }

        // Debounced API call
        debouncedFetchSuggestions(query);
    }, []);

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

        updateCircle([lon, lat]);
        onRecenter({ lat, lon }); // Recenter the map on the selected address and place the marker
        setQueryParams({ ...queryParams, lat: lat, lng: lon });
        setAddress(street);
        setAddressSuggestions([]); // Clear suggestions after selection
    };

    const handleClearFilters = () => {
        setZipcode('');
        setCity('');
        setSpecialties([]);
        setTherapies([]);
        setProvider(null);
        setAddress('');
        setAddressSuggestions([]);
        setRadius(10);
        setQueryParams({ ...queryParams, lat: '33.788673', lng: '-118.12329', facility_type: 'Specialist', active: '1', show: 'all', radius: '10', page: '1' });
    };

    const handleSearchChange = (e) => {
        setQ(e.target.value);
    };
    return (
        <div id="right-sidebar" className="panel w-1/5 min-w-[400px] p-4 overflow-y-auto">
            <div className="mb-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold ">Filters</h2>
                    {(!!queryParams.address ||
                        !!queryParams.provider ||
                        !!queryParams.city ||
                        !!queryParams.zipcode ||
                        !!queryParams.specialties ||
                        !!queryParams.therapies ||
                        queryParams.radius !== '10') && (
                        <a id="clear-filters-button" className="text-xs text-blue-500 px-4 rounded-md cursor-pointer" onClick={handleClearFilters}>
                            Clear All
                        </a>
                    )}
                </div>
            </div>

            <div className="mb-2 relative">
                <h3 className="text-sm font-semibold mb-2">Search by Patient Location</h3>
                <input
                    id="full_address"
                    name="full_address"
                    type="text"
                    placeholder="Search by Full Address, Street, City, State, Zipcode"
                    className="text-xs w-full p-2 border border-gray-300 rounded-md mb-4"
                    autoComplete="off"
                    value={address}
                    onPaste={handleAddressInput}
                    onChange={handleAddressInput}
                />
                {addressSuggestions.length > 0 && (
                    <div className="suggestions-dropdown absolute border border-gray-300 bg-white w-full mt-1 z-10">
                        {addressSuggestions.map((suggestion: any, index) => (
                            <div key={index} className="suggestion-item p-2 cursor-pointer hover:bg-gray-100" onClick={() => handleAddressSelect(suggestion)}>
                                {suggestion.place_name}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="mb-4">
                <h3 className="text-sm font-semibold mb-2">Search by City / ZIP Code</h3>
                <div className="flex space-x-2 relative">
                    <div className="w-1/2">
                        <input type="text" id="city" placeholder="Filter by City" className="text-xs w-full p-2 border border-gray-300 rounded-md" value={city} onChange={handleCityInput} />
                    </div>
                    <div className="w-1/2">
                        <input type="text" id="zipcode" placeholder="Filter by Zipcode" className="text-xs w-full p-2 border border-gray-300 rounded-md" value={zipcode} onChange={handleZipInput} />
                    </div>
                </div>
            </div>

            {address && (
                <div>
                    <h3 className="text-sm font-semibold mb-2">Mile Radius</h3>

                    <Slider
                        step={5}
                        min={0}
                        max={100}
                        value={radius as number}
                        onChange={handleRadiusChange}
                        onChangeComplete={() => setRadiusDragging(false)}
                        styles={{
                            rail: {
                                background: `#D5D7DD`,
                            },
                            track: {
                                background: '#5919B6',
                            },
                            handle: {
                                boxShadow: 'none',
                                opacity: 1,
                            },
                        }}
                        handleRender={(node, props) =>
                            cloneElement(node, {
                                children: (
                                    <div className="absolute  -top-[7px] -left-2 w-7 h-7 flex items-center justify-center bg-white opacity-100 rounded-full border-[1.5px] border-[#D5D7DD]">
                                        {radiusDragging ? (
                                            <span className="text-xs">{props.value}</span>
                                        ) : (
                                            <input
                                                type="text"
                                                className="w-4 h-4 text-xs text-center focus:outline-0 hover:cursor-grab text-[#5919B6] bg-white"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    radiusInputRef.current!.focus();
                                                }}
                                                value={radius}
                                                onChange={(e) => setRadius(e.target.value)}
                                                ref={radiusInputRef}
                                            />
                                        )}
                                    </div>
                                ),
                            })
                        }
                    />
                </div>
            )}

            <div className="my-4">
                <div className="grid grid-cols-2 gap-2">
                    {[
                        { type: 'Specialist', label: 'Specialist', logo: <SpecialistLogo width={24} height={24} type="square" /> },
                        { type: 'Therapist', label: 'Therapist', logo: <TherapistLogo width={24} height={24} type="square" /> },
                        { type: 'MRI', label: 'MRI Facilities', logo: <MRILogo width={24} height={24} type="square" /> },
                        { type: 'Surgery Center', label: 'Surgery Center', logo: <SurgeryLogo width={24} height={24} type="square" /> },
                    ].map((facility) => (
                        <button
                            key={facility.type}
                            className={`text-xs py-2 px-2 gap-2 flex items-center justify-start rounded-md ${
                                queryParams.facility_type === facility.type ? 'border-2 border-blue-500' : 'border border-gray-300'
                            } hover:bg-gray-100`}
                            onClick={() => handleFacilityTypeClick(facility.type)}
                        >
                            <div>{facility.logo}</div>
                            <span>{facility.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="mb-4">
                <h3 className="text-sm font-semibold mb-2">
                    {queryParams.facility_type === 'MRI' || queryParams.facility_type === 'Surgery Center' ? 'Search:' : queryParams.facility_type === 'Therapist' ? 'Therapist:' : 'Specialist:'}
                </h3>
                <div className="mb-4">
                    {(queryParams.facility_type === 'MRI' || queryParams.facility_type === 'Surgery Center') && (
                        <input
                            type="text"
                            id="search"
                            name="search"
                            value={queryParams.search}
                            onChange={handleSearchChange}
                            placeholder="Filter by Facility Name, Address, Phone"
                            className="form-input text-xs w-full p-2 border border-gray-300 rounded-md"
                        />
                    )}
                    {queryParams.facility_type !== 'MRI' && queryParams.facility_type !== 'Surgery Center' && (
                        <Select
                            id="provider"
                            name="provider"
                            value={typeof provider === 'string' && providers.length ? providers.find((p: any) => p.value === Number(provider)) : provider}
                            onChange={handleProviderChange}
                            options={providers}
                            placeholder={`Filter by ${queryParams.facility_type === 'Therapist' ? 'Therapist' : 'Specialist'}`}
                            isClearable
                            className="mt-1 text-xs"
                        />
                    )}
                </div>
            </div>

            {queryParams.facility_type === 'Specialist' && (
                <div className="mb-4">
                    <h3 className="text-sm font-semibold mb-2">Specialties</h3>
                    {specialty_name.map((specialty) => (
                        <div className="mb-2" key={specialty.value}>
                            <label className="inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="specialties"
                                    value={specialty.value}
                                    checked={specialties.includes(specialty.value)}
                                    onChange={handleSpecialityChange}
                                    className="form-checkbox"
                                />
                                <span className="ml-2 text-gray-700 font-normal">{specialty.label}</span>
                            </label>
                        </div>
                    ))}
                </div>
            )}

            {queryParams.facility_type === 'Therapist' && (
                <div className="mb-4">
                    <h3 className="text-sm font-semibold mb-2">Therapies</h3>
                    {therapist_provided.map((therapy) => (
                        <div className="mb-2" key={therapy.value}>
                            <label className="inline-flex items-center cursor-pointer">
                                <input type="checkbox" name="therapies" value={therapy.value} checked={therapies.includes(therapy.value)} onChange={handleTherapiesChange} className="form-checkbox" />
                                <span className="ml-2 text-gray-700 font-normal">{therapy.label}</span>
                            </label>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MapFiltersSidebar;
