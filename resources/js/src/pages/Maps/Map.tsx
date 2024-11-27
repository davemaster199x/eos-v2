import React, { useEffect, useRef, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useQueryParamsContext } from '../../Providers/QueryParamsProvider';
import { useMaps } from '../../Providers/MapsProviders';

const Map = () => {
    const { map, updateMarkers, updateCircle, facilities, addOrMovePatientMarker, patientMarker, recenterMap } = useMaps();

    const { queryParams, setQueryParams } = useQueryParamsContext();
    useEffect(() => {
        if (map) {
            updateMarkers(facilities);
            updateCircle([Number(queryParams.lng), Number(queryParams.lat)], queryParams?.radius ? Number(queryParams.radius) : 10);
            addOrMovePatientMarker([Number(queryParams.lng), Number(queryParams.lat)]);
            recenterMap({ lat: Number(queryParams.lat), lon: Number(queryParams.lng) });
        }
    }, [map, facilities, queryParams.lng, queryParams.lat, queryParams.address, queryParams.radius]);

    useEffect(() => {
        if (patientMarker) {
            patientMarker.on('dragend', () => {
                setQueryParams({
                    ...queryParams,
                    lat: String(patientMarker.getLngLat().lat),
                    lng: String(patientMarker.getLngLat().lng),
                });
            });
        }
    }, [patientMarker, queryParams]);

    return <div id="map" className="flex-1" />;
};

export default Map;
