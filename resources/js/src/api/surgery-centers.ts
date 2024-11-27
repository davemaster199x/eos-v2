import { PassQueryParamsProvider } from '../Providers/QueryParamsProvider';

export const fetchSurgeryCenters = async () => {
    const queryParams = PassQueryParamsProvider.queryParams;
    try {
        const response = await fetch(`/api/surgery-centers?${new URLSearchParams(queryParams as any).toString()}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching surgery-centers:', error);
    }
};
