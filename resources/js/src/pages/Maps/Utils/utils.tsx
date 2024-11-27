export const updateCircle = (map, coordinates) => {
    console.log(coordinates);
    const radiusInKm = 30 * 1.60934; // Convert miles to kilometers
    if (map.getLayer('polygon')) {
        map.removeLayer('polygon');
    }
    if (map.getSource('polygon')) {
        map.removeSource('polygon');
    }

    map.addSource('polygon', createGeoJSONCircle(coordinates, radiusInKm));
    map.addLayer({
        id: 'polygon',
        type: 'fill',
        source: 'polygon',
        paint: {
            'fill-color': '#F1A70E',
            'fill-opacity': 0.3,
        },
    });
};

const createGeoJSONCircle = (center, radiusInKm, points = 64) => {
    const coords = { latitude: center[1], longitude: center[0] };
    const km = radiusInKm;
    const ret = [] as number[][];

    const distanceX = km / (111.32 * Math.cos((coords.latitude * Math.PI) / 180));
    const distanceY = km / 110.574;

    let theta, x, y;
    for (let i = 0; i < points; i++) {
        theta = (i / points) * (2 * Math.PI);
        x = distanceX * Math.cos(theta);
        y = distanceY * Math.sin(theta);
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
