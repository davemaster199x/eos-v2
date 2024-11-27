import React, { createContext, Dispatch, SetStateAction, useCallback, useContext, useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MRILogo, SpecialistLogo, SurgeryLogo, TherapistLogo } from '../components/Images/FacilitiesLogo';
import { createRoot } from 'react-dom/client';
import { QueryParams, useQueryParamsContext } from './QueryParamsProvider';
import { FacilityCard } from '../pages/Maps/MapFilterResultsSidebar';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { getAddress, getCoordinates } from '../utils/util';
import MapboxGeocoder from '@mapbox/mapbox-sdk/services/geocoding';
import { get } from 'http';

mapboxgl.accessToken = 'pk.eyJ1IjoiZWxpdGVtY2FyZSIsImEiOiJjbHk4d2hnYWMwbDhtMmtvajBvaWt2cjd2In0.gkNCaHLno7ByPjk2WiGCbQ';
interface MapsContextType {
    map: mapboxgl.Map | null;
    setMap: Dispatch<SetStateAction<mapboxgl.Map | null>>;
    facilities: any[];
    setFacilities: Dispatch<SetStateAction<any[]>>;
    hoveredMarker: mapboxgl.Marker | null;
    setHoveredMarker: Dispatch<SetStateAction<mapboxgl.Marker | null>>;
    markers: mapboxgl.Marker[];
    setMarkers: Dispatch<SetStateAction<mapboxgl.Marker[]>>;
    patientMarker: mapboxgl.Marker | null;
    setPatientMarker: Dispatch<SetStateAction<mapboxgl.Marker | null>>;
    isDraggingPatientMarker: boolean;
    setIsDraggingPatientMarker: Dispatch<SetStateAction<boolean>>;
    fetchFacilities: (queryParams: QueryParams) => Promise<any[]>;
    focusOnFacility: (lat: number, lng: number, name: string) => void;
    updateCircle: ([lon, lat]: [number, number], radius?: number) => void;
    recenterMap: ({ lat, lon }: { lat: number; lon: number }) => void;
    updateMarkers: (facilities: any) => void;
    addOrMovePatientMarker: (coordinates: [number, number]) => void;
}

// Create a context with a default value
const MapsContext = createContext<MapsContextType>({
    map: null,
    setMap: () => {},
    facilities: [],
    setFacilities: () => {},
    hoveredMarker: null,
    setHoveredMarker: () => {},
    markers: [],
    setMarkers: () => {},
    patientMarker: null,
    setPatientMarker: () => {},
    isDraggingPatientMarker: false,
    setIsDraggingPatientMarker: () => {},
    fetchFacilities: async () => [],
    focusOnFacility: () => {},
    updateCircle: () => {},
    recenterMap: () => {},
    updateMarkers: () => {},
    addOrMovePatientMarker: async () => {},
});

export const fetchFacilities = (queryParams) => {
    const url = `/api/maps?${new URLSearchParams(queryParams as any).toString()} `;

    return fetch(url) // return the fetch promise
        .then((response) => response.json())
        .then((data) => {
            return data; // return the fetched data
        });
};

// Create a provider component
export const MapsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [map, setMap] = useState<mapboxgl.Map | null>(null);
    const [facilities, setFacilities] = useState<any[]>([]);

    const [isDraggingPatientMarker, setIsDraggingPatientMarker] = useState(false);
    const { queryParams, setQueryParams } = useQueryParamsContext();
    const [coords, setCoords] = useState<number[]>([]);

    const [markers, setMarkers] = useState<mapboxgl.Marker[]>([]);
    const [patientMarker, setPatientMarker] = useState<mapboxgl.Marker | null>(null);
    const [hoveredMarker, setHoveredMarker] = useState<mapboxgl.Marker | null>(null);
    const [selectedMarker, setSelectedMarker] = useState<mapboxgl.Marker | null>(null);

    useEffect(() => {
        async function getCoords() {
            const coords = await getCoordinates(queryParams.address);
            if (!coords) {
                setCoords([Number(queryParams.lat) || 34.015399, Number(queryParams.lng) || -118.32709]);
                return;
            }
            setCoords([coords.latitude, coords.longitude]);
        }
        getCoords();
    }, []);

    useEffect(() => {
        if (coords.length) {
            setQueryParams({
                ...queryParams,
                lat: String(coords[0]),
                lng: String(coords[1]),
                facility_type: queryParams.facility_type || 'Specialist',
                active: queryParams.active || '1',
                limit: '15',
                radius: queryParams.radius || '10',
                page: queryParams.page || '1',
            });
            recenterMap({ lat: coords[0], lon: [coords[1]] });
        }
    }, [coords]);

    // useEffect(() => {
    //     if (!queryParams.address || !coords?.length) {
    //         set;
    //     }
    // }, []);

    // Recenter map when queryParams or patient coordinates change
    useEffect(() => {
        if (map) {
            recenterMap({ lat: queryParams.lat || 34.015399, lon: queryParams.lng || -118.32709 });
        }
    }, [map]);

    // Initialize the map
    useEffect(() => {
        if (!map) {
            const initializeMap = () => {
                const mapInstance = new mapboxgl.Map({
                    container: 'map',
                    style: 'mapbox://styles/mapbox/navigation-day-v1',
                    center: [Number(queryParams.lng) || -118.32709, Number(queryParams.lat) || 34.015399],
                    zoom: 6,
                });

                mapInstance.on('load', () => {
                    setMap(mapInstance);
                });

                return () => {
                    if (mapInstance) {
                        mapInstance.remove();
                    }
                };
            };

            initializeMap();
        }
    }, [map]);

    // Update opacity for all markers
    useEffect(() => {
        // Update opacity for all markers based on the hovered marker
        markers?.length &&
            markers.forEach((marker) => {
                if (marker === hoveredMarker || marker === selectedMarker) {
                    marker.getElement().style.opacity = '1'; // Full opacity for hovered marker
                } else {
                    marker.getElement().style.opacity = hoveredMarker || selectedMarker ? '0.3' : '1'; // Low opacity for others or reset
                }
            });
    }, [hoveredMarker, markers]);

    const recenterMap = ({ lat, lon, zoom = 10 }) => {
        if (map) {
            map.flyTo({ center: [lon, lat], zoom: zoom });
            // setQueryParams({ ...queryParams, lat: lat, lng: lon }); // Update patient coordinates
        }
    };

    // Helper
    const clearMapLayerAndSource = (layerId, sourceId) => {
        if (map) {
            if (map.getLayer(layerId)) map.removeLayer(layerId);
            if (map.getSource(sourceId)) map.removeSource(sourceId);
        }
    };

    const createMarkerElement = (className, icon, size = '24px') => {
        const el = document.createElement('div');
        el.className = className;
        const root = createRoot(el);
        root.render(icon);
        return el;
    };

    const updateCircle = (coordinates, radius = 10) => {
        const radiusInKm = radius * 1.60934; // Convert miles to kilometers
        clearMapLayerAndSource('polygon', 'polygon');

        if (map && queryParams.address) {
            map.addSource('polygon', createGeoJSONCircle(coordinates, radiusInKm) as any);
            map.addLayer({
                id: 'polygon',
                type: 'fill',
                source: 'polygon',
                paint: {
                    'fill-color': '#EE6856',
                    'fill-outline-color': '#ff3f34',
                    'fill-opacity': 0.25,
                },
            });
        }
    };

    const createGeoJSONCircle = (center, radiusInKm, points = 64) => {
        const coords = { latitude: center[1], longitude: center[0] };
        const km = radiusInKm;
        const ret = [] as number[][];

        const distanceX = km / (111.32 * Math.cos((coords.latitude * Math.PI) / 180));
        const distanceY = km / 110.574;

        for (let i = 0; i < points; i++) {
            const theta = (i / points) * (2 * Math.PI);
            const x = distanceX * Math.cos(theta);
            const y = distanceY * Math.sin(theta);
            ret.push([coords.longitude + x, coords.latitude + y]);
        }
        ret.push(ret[0]);

        return {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: [
                    {
                        type: 'Feature',
                        geometry: {
                            type: 'Polygon',
                            coordinates: [ret],
                        },
                    },
                ],
            },
        };
    };

    const updateMarkers = (facilities) => {
        markers?.forEach((marker) => marker.remove());
        setMarkers([]);

        if (facilities?.length) {
            const newMarkers = facilities?.filter((facility) => facility.latitude && facility.longitude).map((facility) => addMarker(facility));
            setMarkers(newMarkers);
        }
    };

    const addMarker = (facility) => {
        const el = createMarkerElement('mapboxgl-marker w-8 h-8 bg-contain bg-no-repeat bg-center cursor-pointer', getLogo(queryParams.facility_type));

        const popupNode = document.createElement('div');
        createRoot(popupNode).render(<FacilityCard facility={facility} focusOnFacility={focusOnFacility} variant={1} className="border-0 shadow-none p-0 mb-0" />);

        const popup = new mapboxgl.Popup({ closeButton: false, closeOnClick: true });

        if (map) {
            const marker = new mapboxgl.Marker(el).setLngLat([facility.longitude, facility.latitude]).addTo(map);

            el.addEventListener('mouseenter', () => {
                if (!isDraggingPatientMarker) {
                    setHoveredMarker(marker);
                    popup.setLngLat([facility.longitude, facility.latitude]).setDOMContent(popupNode).addTo(map);
                }
            });

            el.addEventListener('mouseleave', () => {
                if (!isDraggingPatientMarker) {
                    setHoveredMarker(null);
                    popup.remove();
                }
            });

            return marker;
        }
    };

    const addOrMovePatientMarker = (coordinates) => {
        // Check if map is available
        if (!map) return;

        // Helper function to clear circle from the map
        // If there is no address, remove the patient marker and circle if they exist
        if (!queryParams.address) {
            if (patientMarker) {
                patientMarker.remove(); // Properly remove the marker from the map
                setPatientMarker(null); // Reset state after removal
            }
            clearMapLayerAndSource('polygon', 'polygon'); // Clear the circle
            return;
        }

        // If patient marker already exists, update its position and circle
        if (patientMarker) {
            patientMarker.setLngLat(coordinates);
            if (queryParams?.radius) updateCircle(patientMarker.getLngLat().toArray(), +queryParams.radius); // Update the circle radius
        } else {
            // Create a new marker if it doesn't exist
            const el = createMarkerElement('patient-marker z-10', <FaMapMarkerAlt color="red" size="18px" />);
            const newMarker = new mapboxgl.Marker(el).setLngLat(coordinates).setDraggable(true).addTo(map);

            // Set up event listeners for dragging
            newMarker.on('dragstart', () => setIsDraggingPatientMarker(true));
            newMarker.on('dragend', () => setIsDraggingPatientMarker(false));

            // Add the new marker and update the circle
            setPatientMarker(newMarker);
            if (queryParams?.radius) updateCircle(newMarker.getLngLat().toArray(), +queryParams.radius);
        }
    };

    const focusOnFacility = (lat, lng, name, zoom = 7) => {
        if (map) {
            map.flyTo({ center: [lng, lat], zoom });
        }
    };

    const getLogo = (type) => {
        switch (type) {
            case 'Specialist':
                return <SpecialistLogo width={42} height={42} />;
            case 'Surgery Center':
                return <SurgeryLogo width={42} height={42} />;
            case 'Therapist':
                return <TherapistLogo width={42} height={42} />;
            case 'MRI':
                return <MRILogo width={42} height={42} />;
            default:
                return '';
        }
    };

    const value = {
        map,
        setMap,
        facilities,
        setFacilities,
        hoveredMarker,
        setHoveredMarker,
        markers,
        setMarkers,
        patientMarker,
        setPatientMarker,
        isDraggingPatientMarker,
        setIsDraggingPatientMarker,
        fetchFacilities,
        focusOnFacility,
        updateCircle,
        recenterMap,
        updateMarkers,
        addOrMovePatientMarker,
    };

    return <MapsContext.Provider value={value}>{children}</MapsContext.Provider>;
};

// Custom hook to use the context
export const useMaps = () => {
    const context = useContext(MapsContext);
    if (context === undefined) {
        throw new Error('useMaps must be used within a MapsProvider');
    }
    return context;
};
