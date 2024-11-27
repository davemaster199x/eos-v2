import { PassQueryParamsProvider } from '../Providers/QueryParamsProvider';
/**
 * Fetches law firms from the API, taking into account any query parameters that
 * have been set using the QueryParamsProvider.
 *
 * @returns {Promise<object[]>} A promise that resolves with an array of law firm objects.
 */

export const fetchPatientAppointments = async (selectedProviderType = 'Specialist') => {
    const queryParams = PassQueryParamsProvider.queryParams;
    try {
        let url = `/api/patient-appointments?provider_type=${selectedProviderType}&${new URLSearchParams(queryParams as any).toString()}`;
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching appointment requests:', error);
    }
};
