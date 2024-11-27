import { PassQueryParamsProvider } from '../Providers/QueryParamsProvider';

export const fetchPatients = async () => {
    const queryParams = PassQueryParamsProvider.queryParams;
    try {
        const response = await fetch('/api/patients' + `?${new URLSearchParams(queryParams as any).toString()}`);
        const data = await response.json();

        return data;
    } catch (error) {
        console.error('Error fetching patients:', error);
    }
};

export const fetchAllPatients = async () => {
    const queryParams = PassQueryParamsProvider.queryParams;
    try {
        const response = await fetch('/api/patients');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching patients:', error);
    }
};
