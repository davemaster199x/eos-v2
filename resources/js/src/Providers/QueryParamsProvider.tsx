import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export type QueryParams = {
    [key: string]: string | undefined;
};

export type SetQueryParamsArg = QueryParams | ((prevQueryParams: QueryParams) => QueryParams);

type QueryParamsContextType = {
    queryParams: QueryParams;
    setQueryParams: (arg: SetQueryParamsArg) => void;
};

export const QueryParamsContext = createContext<QueryParamsContextType | undefined>(undefined);

export const PassQueryParamsProvider: QueryParamsContextType = {
    queryParams: {},
    setQueryParams: () => {},
};

export const useQueryParamsContext = (): QueryParamsContextType => {
    const context = useContext(QueryParamsContext);
    if (!context) {
        throw new Error('useQueryParamsContext must be used within a QueryParamsProvider');
    }
    return context;
};

export const QueryParamsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();

    // Helper function to extract query parameters from URL
    const getQueryParams = (): URLSearchParams => {
        const urlParams = new URLSearchParams(location.search);

        return urlParams;
    };

    // Convert URLSearchParams to an object
    const queryParamsToObject = (queryParams: URLSearchParams): QueryParams => {
        const params: QueryParams = {};
        for (let [key, value] of queryParams.entries()) {
            params[key] = value;
        }
        return params;
    };

    // Initialize state from URL parameters
    const [queryParams, setQueryParamsState] = useState<QueryParams>(() => queryParamsToObject(getQueryParams()));

    // Updated setQueryParams to accept a callback or an object
    const setQueryParams = (arg: SetQueryParamsArg): void => {
        const currentQueryParams = getQueryParams();
        const newParams = typeof arg === 'function' ? arg(queryParamsToObject(currentQueryParams)) : arg;

        // Merge new params with existing ones
        Object.keys(newParams).forEach((key) => {
            const value = newParams[key];
            if (value !== undefined && value !== '') {
                currentQueryParams.set(key, value);
            } else {
                currentQueryParams.delete(key);
            }
        });

        // Update the URL without creating a new history entry
        navigate({ search: currentQueryParams.toString() }, { replace: true });

        // Update local state to reflect new query parameters
        setQueryParamsState(queryParamsToObject(currentQueryParams));
    };

    useEffect(() => {
        // Sync the local state with the current URL query parameters
        const updatedQueryParams = queryParamsToObject(getQueryParams());

        // Only update state if the query params are different
        if (JSON.stringify(updatedQueryParams) !== JSON.stringify(queryParams)) {
            setQueryParamsState(updatedQueryParams);
        }
    }, [location.search]);

    PassQueryParamsProvider.queryParams = queryParams;
    PassQueryParamsProvider.setQueryParams = setQueryParams;

    return <QueryParamsContext.Provider value={{ queryParams, setQueryParams }}>{children}</QueryParamsContext.Provider>;
};
