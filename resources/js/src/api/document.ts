import { PassQueryParamsProvider } from '../Providers/QueryParamsProvider';
/**
 * Fetches documents from the API, taking into account any query parameters that
 * have been set using the QueryParamsProvider.
 *
 * @returns {Promise<object[]>} A promise that resolves with an array of law firm objects.
 */

export const fetchDocuments = async () => {
    const queryParams = PassQueryParamsProvider.queryParams;
    try {
        let url = `/api/documents?${new URLSearchParams(queryParams as any).toString()}`;
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching documents:', error);
    }
};
