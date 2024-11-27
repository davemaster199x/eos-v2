import { PassQueryParamsProvider } from '../Providers/QueryParamsProvider';
export const fetchMriFacility = async () => {
    const queryParams = PassQueryParamsProvider.queryParams;
    try {
        let url = `/api/mri-facilities?${new URLSearchParams(queryParams as any).toString()}`;
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching mri-facility:', error);
    }
};

export const fetchAllMriFacility = async () => {
    const queryParams = PassQueryParamsProvider.queryParams;
    try {
        const response = await fetch('/api/mri-facilities');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching mri-facility:', error);
    }
};
