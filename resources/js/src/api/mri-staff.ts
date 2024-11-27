import { PassQueryParamsProvider } from '../Providers/QueryParamsProvider';

export const fetchMRIStaff = async () => {
    const queryParams = PassQueryParamsProvider.queryParams;
    try {
        const response = await fetch(`/api/mri-staffs?${new URLSearchParams(queryParams as any).toString()}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching provider staff:', error);
    }
};
