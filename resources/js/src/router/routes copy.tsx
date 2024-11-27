import React from 'react';
import { lazy } from 'react';
import LawFirmForm from '../pages/EliteForms/LawFirmForm';

// Lazy load your components
const Index = lazy(() => import('../pages/Index'));
const Login = lazy(() => import('../pages/Authentication/Login'));
// const ReferralsDashboard = lazy(() => import('../pages/Dashboard/ReferralsDashboard'));
// const UploadsDashboard = lazy(() => import('../pages/Dashboard/UploadsDashboard'));
// const PatientCreate = lazy(() => import('../pages/Patients/PatientCreate'));
// const LawFirmCreate = lazy(() => import('../pages/LawFirms/LawFirmCreate'));
// const SpecialistCreate = lazy(() => import('../pages/Specialists/SpecialistCreate'));
// const SpecialistOfficeCreate = lazy(() => import('../pages/Specialists/SpecialistOfficeCreate'));
// const MapView = lazy(() => import('../pages/Map/MapView'));
// Other components...

const routes = [
    {
        path: '/',
        element: <Index />,
    },
    // {
    //     path: '/login',
    //     element: <Login />,
    // },
    // {
    //     path: '/elite/dashboard',
    //     element: <EliteDashboard />,
    // },
    // {
    //     path: '/referrals/dashboard',
    //     element: <ReferralsDashboard />,
    // },
    // {
    //     path: '/uploads/dashboard',
    //     element: <UploadsDashboard />,
    // },
    // {
    //     path: '/patient/create',
    //     element: <PatientCreate />,
    // },
    {
        path: '/law-firm/create',
        element: <LawFirmForm />,
    },
    // {
    //     path: '/specialist/create',
    //     element: <SpecialistCreate />,
    // },
    // {
    //     path: '/specialist-office/create',
    //     element: <SpecialistOfficeCreate />,
    // },
    // {
    //     path: '/map',
    //     element: <MapView />,
    // },
    // {
    //     path: '*',
    //     element: <Error />,
    //     layout: 'blank',
    // },
];

export { routes };
