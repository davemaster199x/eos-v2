import React from 'react';
import { lazy } from 'react';
import LawFirmForm from '../pages/EliteForms/LawFirmForm';
import ReferralSourceStaffForm from '../pages/EliteForms/ReferralSourceStaffForm';
import PatientIntakeForm from '../pages/EliteForms/PatientIntakeForm';
import AppointmentRequestForm from '../pages/EliteForms/AppointmentRequestForm';
import PatientAppointmentForm from '../pages/EliteForms/PatientAppointmentForm';
import SpecialistForm from '../pages/EliteForms/SpecialistForm';
import MRIFacilityForm from '../pages/EliteForms/MRIFacilityForm';
import MRIStaffForm from '../pages/EliteForms/MRIStaffForm';
import SurgeryCenterForm from '../pages/EliteForms/SurgeryCenterForm';
import SpecialistOfficeForm from '../pages/EliteForms/SpecialistOfficeForm';
import ClientMapsPage from '../pages/Maps/ClientMapsPage';
import MRiAppointmentRequestForm from '../pages/EliteForms/MRIAppointmentRequestForm';
import ProviderForm from '../pages/EliteForms/ProviderForm';
import MRIAppointment from '../pages/EliteForms/MRIAppointmentForm';
import SpecialistStaff from '../pages/EliteForms/SpecialistStaff';
import ProviderOfficeForm from '../pages/EliteForms/ProviderOfficeForm';
import ReferralSource from '../pages/EliteForms/ReferralSource';
import ProviderStaffForm from '../pages/EliteForms/ProviderStaffForm';
import PatientNotesForm from '../pages/EliteForms/PatientNotesForm';

// Elite View
import LawFirmsView from '../pages/EliteViews/LawFirms';
import ReferralSourceView from '../pages/EliteViews/ReferralSource';
import ReferralSourceStaffView from '../pages/EliteViews/ReferralSourceStaff';
import { MapsProvider } from '../Providers/MapsProviders';
import SpecialistView from '../pages/EliteViews/Specialist';
import TherapistView from '../pages/EliteViews/Therapist';
import MRIFacilityView from '../pages/EliteViews/MRIFacility';
import SurgeryCenterView from '../pages/EliteViews/SurgeryCenter';
import ProviderOfficeView from '../pages/EliteViews/ProviderOffice';
import DocumentForm from '../pages/EliteForms/DocumentForm';
import ProviderStaffView from '../pages/EliteViews/ProviderStaff';
import MRIStaffView from '../pages/EliteViews/MRIStaff';
import PatientIntakeView from '../pages/EliteViews/PatientIntake';
import { AppointmentRequestView } from '../pages/EliteViews/AppointementRequest';
import MRIAppointmentRequestView from '../pages/EliteViews/MRIAppointmentRequest';
import PatientAppointmentView from '../pages/EliteViews/PatientAppointment';
import MRIAppointmentView from '../pages/EliteViews/MRIAppointment';
import DocumentView from '../pages/EliteViews/Document';
import Error404 from '../pages/Other/Error404';
// END Elite View

// Lazy load your components
const Index = lazy(() => import('../pages/Index'));

const routes = [
    {
        path: '/',
        element: <Index />,
    },
    {
        path: '/document/create',
        element: <DocumentForm />,
    },
    // Law Firm
    {
        path: '/law-firm/create',
        element: <LawFirmForm />,
    },
    // Referral Source
    {
        path: '/referral-source/create',
        element: <ReferralSource />,
    },
    // Law Firm Staff
    {
        path: '/referral-source-staff/create',
        element: <ReferralSourceStaffForm />,
    },
    // Patient
    {
        path: '/patient/create',
        element: <PatientIntakeForm />,
    },
    // Appointment Request
    {
        path: '/appointment-request/create',
        element: <AppointmentRequestForm />,
    },
    // Patient Appointment
    {
        path: '/patient-appointment/create',
        element: <PatientAppointmentForm />,
    },

    // MRI Appointment
    {
        path: '/mri-appointment/create',
        element: <MRIAppointment />,
    },

    // MRI Appointment Request
    {
        path: '/mri-appointment-request/create',
        element: <MRiAppointmentRequestForm />,
    },

    // MRI Facility
    {
        path: '/mri-facility/create',
        element: <MRIFacilityForm />,
    },
    // MRI Staff
    {
        path: '/mri-staff/create',
        element: <MRIStaffForm />,
    },
    // Maps
    {
        path: '/maps',
        element: (
            <MapsProvider>
                <ClientMapsPage />
            </MapsProvider>
        ),
    },
    {
        path: '/provider/create',
        element: <ProviderForm />,
    },
    // Specialist Office
    {
        path: '/provider-office/create',
        element: <ProviderOfficeForm />,
    },
    // Provider Staff
    {
        path: '/provider-staff/create',
        element: <ProviderStaffForm />,
    },
    // Surgery Center
    {
        path: '/surgery-center/create',
        element: <SurgeryCenterForm />, // Add the route for SurgeryCenterForm
    },

    // Patient Notes
    {
        path: '/patient-notes/create',
        element: <PatientNotesForm />,
    },

    // Elite View ----------------------------------------------------------------------------------------
    // Law Firm
    {
        path: '/law-firm',
        element: <LawFirmsView />,
    },
    // Law Firm
    {
        path: '/referral-source',
        element: <ReferralSourceView />,
    },
    // Law Firm
    {
        path: '/referral-sources-staff',
        element: <ReferralSourceStaffView />,
    },
    // Specialists
    {
        path: '/specialists',
        element: <SpecialistView />,
    },
    // Therapists
    {
        path: '/therapists',
        element: <TherapistView />,
    },
    // MRI-facility
    {
        path: '/mri-facility',
        element: <MRIFacilityView />,
    },
    // Surgical Center
    {
        path: '/surgery-center',
        element: <SurgeryCenterView />,
    },
    // Provider Location
    {
        path: '/provider-location',
        element: <ProviderOfficeView />,
    },
    // Provider Staff
    {
        path: '/provider-staff',
        element: <ProviderStaffView />,
    },
    // MRI Staff
    {
        path: '/mri-staff',
        element: <MRIStaffView />,
    },
    // Patient Intake
    {
        path: '/patients',
        element: <PatientIntakeView />,
    },
    {
        path: '/patient-appointment',
        element: <PatientAppointmentView />,
    },
    {
        path: '/appointment-requests',
        element: <AppointmentRequestView />,
    },
    {
        path: '/mri-appointment-request',
        element: <MRIAppointmentRequestView />,
    },
    {
        path: '/mri-appointment',
        element: <MRIAppointmentView />,
    },
    {
        path: '/document',
        element: <DocumentView />,
    },
    {
        path: '*',
        element: <Error404 />,
    },
    // END Elite View ------------------------------------------------------------------------------------
];

export { routes };
