// @ts-nocheck
import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY;

const Maps = ({ facilities }) => {
    const [map, setMap] = useState(null);
    const [markers, setMarkers] = useState([]);
    const [patientCoordinates, setPatientCoordinates] = useState([-74.006, 40.7128]); // Default to NYC
    const [currentView, setCurrentView] = useState('compact');
    const [currentPage, setCurrentPage] = useState(1);
    const [history, setHistory] = useState([]);
    const itemsPerPage = 10;

    useEffect(() => {
        const initializeMap = () => {
            const mapInstance = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/streets-v11',
                center: patientCoordinates,
                zoom: 9,
            });

            setMap(mapInstance);

            return () => mapInstance.remove();
        };

        const mapInstance = initializeMap();
        return () => mapInstance && mapInstance.remove();
    }, []);

    useEffect(() => {
        if (map) {
            updateMarkers(facilities);
        }
    }, [map, facilities]);

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Radius of the Earth in km
        const dLat = deg2rad(lat2 - lat1);
        const dLon = deg2rad(lon2 - lon1);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c; // Distance in km
        return distance * 0.621371; // Convert km to miles
    };

    const deg2rad = (deg) => deg * (Math.PI / 180);

    const placePatientMarker = (lat, lng) => {
        if (patientCoordinates) {
            setPatientCoordinates([lng, lat]);
            map.flyTo({ center: [lng, lat] });
        }
    };

    const updateMarkers = (facilities) => {
        markers.forEach((marker) => marker.remove());
        const newMarkers = facilities.map((facility, index) => addMarker(facility, index));
        setMarkers(newMarkers);
    };

    const addMarker = (facility, index) => {
        const el = document.createElement('div');
        el.className = 'mapboxgl-marker w-8 h-8 bg-cover bg-center cursor-pointer';

        if (facility.facilities.length === 1) {
            el.style.backgroundImage = `url('${getLogo(facility.facilities[0].type)}')`;
        } else {
            el.classList.add('multiple-facilities');
            const icon = document.createElement('i');
            icon.className = 'fas fa-layer-group text-white text-lg';
            el.appendChild(icon);
        }

        const popup = new mapboxgl.Popup({ closeButton: false, closeOnClick: false, className: 'custom-popup' });

        const marker = new mapboxgl.Marker(el).setLngLat([facility.lng, facility.lat]).addTo(map);

        el.addEventListener('mouseenter', () => {
            popup.setLngLat([facility.lng, facility.lat]).setHTML(createPopupContent(facility)).addTo(map);
        });

        el.addEventListener('mouseleave', () => {
            popup.remove();
        });

        marker.getElement().addEventListener('click', () => {
            showFacilityDetails(facility);
        });

        return marker;
    };

    const getLogo = (type) => {
        switch (type) {
            case 'office':
                return '/images/maps/offices.png';
            case 'surgery':
                return '/images/maps/surgery_centers.png';
            case 'pt':
                return '/images/maps/pt_chiro.png';
            case 'mri':
                return '/images/maps/mri.png';
            default:
                return '';
        }
    };

    const createPopupContent = (facility) =>
        `<div class="p-2 bg-white rounded shadow-md">
            <h3 class="text-xs font-bold">${facility.name}</h3>
            <p class="text-xs text-gray-600">${facility.address}</p>
            <div class="mt-2">
                ${facility.facilities
                    .map(
                        (f) =>
                            `<div class="border-t border-gray-200 pt-2">
                        <strong class="text-xs">${f.speciality || f.name}</strong><br>
                        <small class="text-xs text-gray-500">${f.type.charAt(0).toUpperCase() + f.type.slice(1)}</small><br>
                        <span class="text-xs text-gray-600">Doctors: ${f.doctors.join(', ')}</span>
                    </div>`
                    )
                    .join('')}
            </div>
        </div>`;

    const showFacilityDetails = (facility) => {
        // Simulate "Back" functionality by saving the current state
        const currentView = {
            title: 'Facilities',
            content: document.getElementById('results-list').innerHTML,
        };

        setHistory([...history, currentView]);

        // Display facility details
        setFacilityView(facility);
    };

    const setFacilityView = (facility) => {
        const backButton = document.getElementById('back-button');
        backButton.style.display = 'block';
        return (
            <>
                <button onClick={goBack} className="absolute left-4 top-4 bg-blue-500 text-white px-2 py-1 rounded-md">
                    Back
                </button>
                <div>{createFacilityCard(facility)}</div>
            </>
        );
    };

    const goBack = () => {
        const lastView = history.pop();
        setHistory([...history]);
        if (lastView) {
            // Restore previous view
            setPreviousView(lastView);
        }
    };

    const setPreviousView = (view) => {
        return (
            <>
                <h2 className="text-xl font-bold mb-4">{view.title}</h2>
                <div id="results-list" dangerouslySetInnerHTML={{ __html: view.content }} />
            </>
        );
    };

    const createFacilityCard = (facility) => {
        return (
            <div className="facility-card" onClick={() => focusOnFacility(facility.lat, facility.lng, facility.name)}>
                {facility.image && (
                    <div className="facility-image-container">
                        <img src={facility.image} alt={facility.name} className="facility-image" />
                    </div>
                )}
                <div className="facility-info p-4">
                    <h5 className="facility-name text-lg font-bold">{facility.name}</h5>
                    <p className="facility-address text-sm text-gray-600">{facility.address}</p>
                    <p className="facility-count text-sm text-gray-600">{facility.facilities.length} facilities</p>
                </div>
            </div>
        );
    };

    const updateResultsList = (filteredFacilities = facilities) => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedFacilities = filteredFacilities.slice(startIndex, endIndex);

        if (currentView === 'detailed') {
            return (
                paginatedFacilities.map((facility, index) => {
                    const distance = calculateDistance(patientCoordinates[1], patientCoordinates[0], facility.lat, facility.lng).toFixed(2);
                    return (
                        <div
                            className="result-item mb-4 p-2 bg-white shadow-md rounded-md"
                            id={`result-item-${startIndex + index}`}
                            onMouseEnter={() => highlightMarker(startIndex + index)}
                            onMouseLeave={() => removeHighlight(startIndex + index)}
                        >
                            {createFacilityCard(facility)}
                            <p className="text-gray-600 mt-2">Distance: {distance} miles</p>
                        </div>
                    );
                })
            );
        } else {
            return (
                paginatedFacilities.map((facility, facilityIndex) => {
                    const distance = calculateDistance(patientCoordinates[1], patientCoordinates[0], facility.lat, facility.lng).toFixed(2);

                    return (
                        <div className="facility-accordion border rounded-md shadow-sm" id={`result-item-${startIndex + facilityIndex}`}>
                            <button className="accordion-header p-2 bg-gray-100" onClick={() => toggleAccordion(facilityIndex)}>
                                <strong>{facility.name}</strong><br />
                                {facility.address}<br />
                                Distance: {distance} miles
                            </button>
                            <div className="accordion-content p-2 hidden">
                                {facility.facilities.map((f) => (
                                    <div className="result-card bg-white shadow rounded-lg p-4 mb-4">
                                        <div className="text-sm font-medium text-gray-900 mb-2"><strong>Type:</strong> {capitalizeFirstLetter(f.type)}</div>
                                        <div className="text-sm text-gray-900 mb-2"><strong>Speciality:</strong> {f.speciality || f.name || '-'}</div>
                                        <div className="text-sm text-gray-900 mb-2"><strong>Location:</strong> {facility.lat}, {facility.lng}</div>
                                        <div className="text-right">
                                            <button className="copy-button text-blue-500" onClick={() => copyFacilityInfo(f.type, f.speciality || f.name, facility.address)}>Copy Info</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })
            );
        }
    };

    const highlightMarker = (index) => {
        markers.forEach((marker, markerIndex) => {
            if (markerIndex === index) {
                marker.getElement().classList.add('marker-highlight');
                marker.getElement().classList.remove('marker-low-opacity');
            } else {
                marker.getElement().classList.add('marker-low-opacity');
                marker.getElement().classList.remove('marker-highlight');
            }
        });
    };

    const removeHighlight = (index) => {
        markers.forEach((marker) => {
            marker.getElement().classList.remove('marker-low-opacity', 'marker-highlight');
        });
    };

    const toggleAccordion = (index) => {
        const content = document.querySelectorAll('.accordion-content')[index];
        const isVisible = content.style.display === 'block';
        document.querySelectorAll('.accordion-content').forEach((c) => (c.style.display = 'none'));
        if (!isVisible) {
            content.style.display = 'block';
        }
    };

    const applySortingAndFilters = () => {
        const sortingMethod = document.getElementById('sorting-method').value;
        const query = document.getElementById('search').value.toLowerCase();
        const activeType = document.querySelector('.filter-button.active').dataset.type;
        const speciality = document.getElementById('office-speciality').value;

        let filteredFacilities = filterFacilities(facilities, query, activeType, speciality);

        filteredFacilities = sortFacilities(filteredFacilities, sortingMethod);

        setCurrentPage(1); // Reset to first page when searching
        updateResultsList(filteredFacilities);
        updateMarkers(filteredFacilities);
    };

    const filterFacilities = (facilities, query, activeType, speciality) => {
        return facilities.filter((facility) => {
            return facility.facilities.some((f) => {
                const specialityLower = f.speciality && typeof f.speciality === 'string' ? f.speciality.toLowerCase() : '';
                const nameLower = f.name && typeof f.name === 'string' ? f.name.toLowerCase() : '';
                const facilityNameLower = facility.name.toLowerCase();

                return (
                    (facilityNameLower.includes(query) || specialityLower.includes(query) || nameLower.includes(query) || f.doctors.some((doctor) => doctor.toLowerCase().includes(query))) &&
                    (!activeType || f.type === activeType) &&
                    (!speciality || (f.type === 'office' && specialityLower === speciality.toLowerCase()))
                );
            });
        });
    };

    const sortFacilities = (facilities, sortingMethod) => {
        switch (sortingMethod) {
            case 'nearest':
                return facilities.sort((a, b) => {
                    const distanceA = calculateDistance(patientCoordinates[1], patientCoordinates[0], a.lat, a.lng);
                    const distanceB = calculateDistance(patientCoordinates[1], patientCoordinates[0], b.lat, b.lng);
                    return distanceA - distanceB;
                });
            case 'name':
                return facilities.sort((a, b) => a.name.localeCompare(b.name));
            case 'facilities':
                return facilities.sort((a, b) => b.facilities.length - a.facilities.length);
            default:
                return facilities;
        }
    };

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const copyFacilityInfo = (type, speciality, address) => {
        const info = `${type}\n${speciality}\n${address}`;
        navigator.clipboard.writeText(info).then(() => {
            alert('Facility information copied to clipboard!');
        });
    };

    return (
        <div className="flex h-screen">
            <div id="left-sidebar" className="w-1/3 bg-gray-100 p-4 overflow-y-auto relative">
                <button id="back-button" className="hidden absolute left-4 top-4 bg-blue-500 text-white px-2 py-1 rounded-md">
                    Back
                </button>
                <h2 className="text-xl font-bold mb-4">Facilities</h2>
                <div id="facility-buttons" className="grid grid-cols-2 gap-4 mb-4">
                    <button className="add-facility-button bg-white border border-gray-300 rounded-md py-2 hover:bg-gray-100">Add Office</button>
                    <button className="add-facility-button bg-white border border-gray-300 rounded-md py-2 hover:bg-gray-100">Add Surgery Center</button>
                    <button className="add-facility-button bg-white border border-gray-300 rounded-md py-2 hover:bg-gray-100">Add MRI</button>
                    <button className="add-facility-button bg-white border border-gray-300 rounded-md py-2 hover:bg-gray-100">Add PT/Chiro Facility</button>
                </div>
                <div id="sorting-options" className="mb-4">
                    <label htmlFor="sorting-method" className="block text-gray-700">
                        Sort by:
                    </label>
                    <select id="sorting-method" className="w-full mt-1 p-2 border border-gray-300 rounded-md" onChange={applySortingAndFilters}>
                        <option value="nearest">Nearest to Farthest</option>
                        <option value="name">Name (A-Z)</option>
                        <option value="facilities">Number of Facilities</option>
                    </select>
                </div>
                <div id="results-info" className="mb-4"></div>
                <div id="view-toggle" className="flex space-x-2 mb-4">
                    <button id="detailed-view-btn" className="view-btn bg-white border border-gray-300 py-2 px-4 rounded-md hover:bg-gray-100" onClick={() => setCurrentView('detailed')}>
                        Detailed View
                    </button>
                    <button id="compact-view-btn" className="view-btn bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600" onClick={() => setCurrentView('compact')}>
                        Compact View
                    </button>
                </div>
                <div id="results-list">
                    {updateResultsList()}
                </div>
                <div id="pagination" className="pagination flex justify-center mt-4"></div>
            </div>
            <div id="map" className="flex-1"></div>
            <div id="right-sidebar" className="w-1/3 bg-gray-100 p-4 overflow-y-auto">
                <h1 className="text-xl font-bold mb-4">Filters</h1>
                <h3 className="text-lg font-semibold mb-2">Search by Patient Location</h3>
                <div className="relative mb-4">
                    <input id="full_address" name="full_address" type="text" placeholder="Enter address" className="w-full p-2 border border-gray-300 rounded-md" autoComplete="off" />
                    <div id="addressSuggestions" className="suggestions-dropdown absolute w-full bg-white border border-gray-300 rounded-md mt-1"></div>
                    <input id="latitude" name="latitude" type="hidden" />
                    <input id="longitude" name="longitude" type="hidden" />
                </div>
                <button id="recenter-button" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
                    Recenter on Patient
                </button>

                <h3 className="text-lg font-semibold mt-4 mb-2">Facility Type</h3>
                <div className="relative mb-4">
                    <input type="text" id="search" placeholder="Search facilities..." className="w-full p-2 border border-gray-300 rounded-md" />
                </div>
                <button id="all-types-button" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 mb-4">
                    All Types
                </button>
                <div className="filter-grid grid grid-cols-2 gap-2">
                    <button className="filter-button bg-white border border-gray-300 rounded-md py-2 hover:bg-gray-100 flex items-center">
                        <img src="/images/maps/offices.png" alt="Office" className="w-5 h-5 mr-2" />
                        Office
                    </button>
                    <button className="filter-button bg-white border border-gray-300 rounded-md py-2 hover:bg-gray-100 flex items-center">
                        <img src="/images/maps/surgery_centers.png" alt="Surgery Center" className="w-5 h-5 mr-2" />
                        Surgery
                    </button>
                    <button className="filter-button bg-white border border-gray-300 rounded-md py-2 hover:bg-gray-100 flex items-center">
                        <img src="/images/maps/mri.png" alt="MRI" className="w-5 h-5 mr-2" />
                        MRI
                    </button>
                    <button className="filter-button bg-white border border-gray-300 rounded-md py-2 hover:bg-gray-100 flex items-center">
                        <img src="/images/maps/pt_chiro.png" alt="PT/Chiro" className="w-5 h-5 mr-2" />
                        PT/Chiro
                    </button>
                </div>
                <select id="office-speciality" className="w-full mt-4 p-2 border border-gray-300 rounded-md hidden">
                    <option value="">All Specialities</option>
                    <option value="Pain Management">Pain Management</option>
                    <option value="Orthopedic Surgeon">Orthopedic Surgeon</option>
                    <option value="Neurosurgeon">Neurosurgeon</option>
                    <option value="Neurologist">Neurologist</option>
                    <option value="Orthospine">Orthospine</option>
                    <option value="MRI">MRI</option>
                    <option value="Podiatrist">Podiatrist</option>
                    <option value="Internal Medicine">Internal Medicine</option>
                </select>
            </div>
        </div>
    );
};

export default Maps;
