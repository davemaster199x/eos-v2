import { PassQueryParamsProvider } from '../Providers/QueryParamsProvider';

export const fetchMRIAppointmentRequests = async () => {
    const queryParams = PassQueryParamsProvider.queryParams;
    try {
        let url = `/api/mri-appointment-requests?${new URLSearchParams(queryParams as any).toString()}`;
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching mri-appointment-requests:', error);
    }
};
