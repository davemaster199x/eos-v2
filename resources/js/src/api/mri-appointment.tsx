import { PassQueryParamsProvider } from '../Providers/QueryParamsProvider';

export const fetchMRIAppointments = async () => {
    const queryParams = PassQueryParamsProvider.queryParams;
    try {
        let url = `/api/mri-appointments?${new URLSearchParams(queryParams as any).toString()}`;
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching mri-appointments:', error);
    }
};
