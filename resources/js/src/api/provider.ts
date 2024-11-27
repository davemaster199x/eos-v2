import { PassQueryParamsProvider, QueryParams } from './../Providers/QueryParamsProvider';
import { useContext } from 'react';
import { QueryParamsContext } from '../Providers/QueryParamsProvider';

export const fetchProviders = async (selectedProviderType = 'Specialist') => {
    const queryParams = PassQueryParamsProvider.queryParams;
    try {
        const response = await fetch(`/api/providers?provider_type=${selectedProviderType}` + `&${new URLSearchParams(queryParams as any).toString()}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching providers:', error);
    }
};

export const fetchAllProviders = async (selectedProviderType = 'Specialist') => {
    const queryParams = PassQueryParamsProvider.queryParams;
    try {
        const response = await fetch(`/api/providers?provider_type=${selectedProviderType}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching providers:', error);
    }
};

export const fetchProviderOffices = async (selectedProviderType = 'Specialist') => {
    const queryParams = PassQueryParamsProvider.queryParams;
    try {
        const response = await fetch('/api/provider-offices?provider_type=' + selectedProviderType + '&' + new URLSearchParams(queryParams as any).toString());
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching provider offices:', error);
    }
};

export const fetchAllProviderOffices = async (selectedProviderType = 'Specialist') => {
    const queryParams = PassQueryParamsProvider.queryParams;
    try {
        const response = await fetch('/api/provider-offices?provider_type=' + selectedProviderType);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching provider offices:', error);
    }
};
