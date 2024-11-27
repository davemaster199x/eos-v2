import { PassQueryParamsProvider } from '../Providers/QueryParamsProvider';

export const fetchReferralSource = async () => {
    const queryParams = PassQueryParamsProvider.queryParams;
    try {
        const response = await fetch('/api/referral-source' + `?${new URLSearchParams(queryParams as any).toString()}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching referral-source:', error);
    }
};

export const fetchAllReferralSource = async () => {
    try {
        const response = await fetch('/api/referral-source');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching referral-source:', error);
    }
};
export const fetchReferralSourceStaff = async () => {
    const queryParams = PassQueryParamsProvider.queryParams;
    try {
        const response = await fetch('/api/referral-source-staff' + `?${new URLSearchParams(queryParams as any).toString()}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching referral-source:', error);
    }
};
