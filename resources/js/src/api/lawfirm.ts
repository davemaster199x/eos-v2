import { PassQueryParamsProvider } from '../Providers/QueryParamsProvider';
/**
 * Fetches law firms from the API, taking into account any query parameters that
 * have been set using the QueryParamsProvider.
 *
 * @returns {Promise<object[]>} A promise that resolves with an array of law firm objects.
 */

export const fetchLawfirms = async () => {
    const queryParams = PassQueryParamsProvider.queryParams;
    try {
        let url = `/api/law-firms?${new URLSearchParams(queryParams as any).toString()}`;
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching mri-facility:', error);
    }
};

export const fetchAllLawFirms = async () => {
    try {
        const response = await fetch('/api/law-firms');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching lawfirms:', error);
    }
};
