import { createBrowserRouter } from 'react-router-dom';
import BlankLayout from '../components/Layouts/BlankLayout';
import DefaultLayout from '../components/Layouts/DefaultLayout';
import { QueryParamsProvider } from '../Providers/QueryParamsProvider';
import { routes } from './routes';
import React from 'react';

const finalRoutes = routes.map((route) => {
    return {
        ...route,
        element: <QueryParamsProvider>{route.layout === 'blank' ? <BlankLayout>{route.element}</BlankLayout> : <DefaultLayout>{route.element}</DefaultLayout>}</QueryParamsProvider>,
    };
});

const router = createBrowserRouter(finalRoutes);

export default router;
