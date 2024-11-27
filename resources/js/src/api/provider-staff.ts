import { PassQueryParamsProvider } from '../Providers/QueryParamsProvider';

export const fetchProviderStaff = async () => {
    const queryParams = PassQueryParamsProvider.queryParams;
    try {
        const response = await fetch(`/api/provider-staff?${new URLSearchParams(queryParams as any).toString()}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching provider staff:', error);
    }
};
