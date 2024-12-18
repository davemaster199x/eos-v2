import React from 'react';
import {
    AppointmentIcon,
    AppointmentRequestIcon,
    DashboardIcon,
    DocumentationIcon,
    LawFirmIcon,
    LiensIcon,
    MapsIcon,
    MissingDocumentIcon,
    MRIIcon,
    PatientIcon,
    ProviderOfficeIcon,
    ProviderStaffIcon,
    ReferralSourceIcon,
    ReferralSourceStaffIcon,
    SettlementsIcon,
    SpecialistIcon,
    TherapistIcon,
} from '../../../components/Icons';

export const EliteNavItems = [
    {
        header: 'General',
        links: [
            {
                href: '/dashboard',
                label: 'Dashboard',
                icon: <DashboardIcon />,
            },
        ],
    },
    {
        header: 'PATIENT',
        links: [
            {
                href: '/patients?page=1&limit=25',
                label: 'Patients',
                icon: <PatientIcon />,
            },
            {
                href: '/appointment-requests',
                label: 'Appt Requests',
                icon: <AppointmentRequestIcon />,
            },
            {
                href: '/patient-appointment?page=1&limit=25',
                label: 'Appointments',
                icon: <AppointmentIcon />,
            },
            {
                href: '/missing-documents?page=1&limit=25',
                label: 'Missing Documents',
                icon: <MissingDocumentIcon />,
            },
        ],
    },
    {
        header: 'PROVIDERS',
        links: [
            {
                href: '/specialists?page=1&limit=25',
                label: 'Specialists',
                icon: <SpecialistIcon />,
            },
            {
                href: '/therapists?page=1&limit=25',
                label: 'Therapists',
                icon: <TherapistIcon />,
            },
            {
                href: '/provider-staff?page=1&limit=25',
                label: 'Provider Staff',
                icon: <ProviderStaffIcon />,
            },
            {
                href: '/provider-location?page=1&limit=25&provider_type=Specialist',
                label: 'Provider Location',
                icon: <ProviderOfficeIcon />,
            },
            {
                href: '/maps?lat=33.788673&lng=-118.12329&facility_type=Specialist&active=1&show=all',
                label: 'Maps',
                icon: <MapsIcon />,
            },
            {
                href: '/liens?page=1&limit=25',
                label: 'Liens',
                icon: <LiensIcon />,
            },
        ],
    },
    {
        header: 'HUBS',
        links: [
            {
                href: '/mri-facility?page=1&limit=25',
                label: 'MRI',
                icon: <MRIIcon />,
            },
        ],
    },
    {
        header: 'LAW FIRM',
        links: [
            {
                href: '/law-firm?page=1&limit=25',
                label: 'Law Firms',
                icon: <LawFirmIcon />,
            },
            {
                href: '/referral-source?page=1&limit=25',
                label: 'Referral Source',
                icon: <ReferralSourceIcon />,
            },
            {
                href: '/referral-sources-staff?page=1&limit=25',
                label: 'RS Staff',
                icon: <ReferralSourceStaffIcon />,
            },
            {
                href: '/settlements?page=1&limit=25',
                label: 'Settlements',
                icon: <SettlementsIcon />,
            },
        ],
    },
    {
        header: 'SUPPORT',
        links: [
            {
                href: '/documentation?page=1&limit=25',
                label: 'Documentation',
                icon: <DocumentationIcon />,
            },
        ],
    },
];

export const ProvidersNavItems = [
    {
        header: 'General',
        links: [
            {
                href: '/dashboard?page=1&limit=25?page=1&limit=25',
                label: 'Dashboard',
                icon: <DashboardIcon />,
            },
        ],
    },
    {
        header: 'PATIENT',
        links: [
            {
                href: '/patients?page=1&limit=25',
                label: 'Patients',
                icon: <PatientIcon />,
            },
            {
                href: '/appointment-requests?page=1&limit=25',
                label: 'Appt Requests',
                icon: <AppointmentRequestIcon />,
            },
            {
                href: '/patient-appointment?page=1&limit=25',
                label: 'Appointments',
                icon: <AppointmentIcon />,
            },
            {
                href: '/missing-documents?page=1&limit=25',
                label: 'Missing Documents',
                icon: <MissingDocumentIcon />,
            },
        ],
    },
    {
        header: 'SPECIALIST',
        links: [
            {
                href: '/specialists?page=1&limit=25',
                label: 'Specialists',
                icon: <SpecialistIcon />,
            },
            {
                href: '/specialist-staff?page=1&limit=25',
                label: 'Specialist Staff',
                icon: <ProviderStaffIcon />,
            },
            {
                href: '/specialist-locations?page=1&limit=25',
                label: 'Specialist Locations',
                icon: <ProviderOfficeIcon />,
            },
            {
                href: '/specialist-liens?page=1&limit=25',
                label: 'Liens',
                icon: <LiensIcon />,
            },
            {
                href: '/specialist-settlements?page=1&limit=25',
                label: 'Settlements',
                icon: <SettlementsIcon />,
            },
        ],
    },
    {
        header: 'REPORTS',
        links: [
            {
                href: '/specialist-report?page=1&limit=25',
                label: 'Specialist Report',
                icon: (
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M1.34667 15C0.962778 15 0.6425 14.8556 0.385833 14.5669C0.129167 14.2781 0.000555556 13.9175 0 13.485V9.84375H5.83333V11.25H9.16667V9.84375H15V13.4859C15 13.9172 14.8717 14.2772 14.615 14.5659C14.3583 14.8547 14.0381 14.9994 13.6542 15H1.34667ZM6.66667 10.3125V8.4375H8.33333V10.3125H6.66667ZM0 8.90625V4.3275C0 3.89563 0.128611 3.53531 0.385833 3.24656C0.643056 2.95781 0.963055 2.81313 1.34583 2.8125H5V1.51406C5 1.08281 5.12861 0.722502 5.38583 0.433127C5.64306 0.143752 5.96333 -0.000622979 6.34667 2.02048e-06H8.65417C9.0375 2.02048e-06 9.35778 0.144377 9.615 0.433127C9.87222 0.721877 10.0006 1.08219 10 1.51406V2.8125H13.6542C14.0375 2.8125 14.3575 2.95719 14.6142 3.24656C14.8708 3.53594 14.9994 3.89625 15 4.3275V8.90625H9.16667V7.5H5.83333V8.90625H0ZM5.83333 2.8125H9.16667V1.51406C9.16667 1.37031 9.11333 1.23813 9.00667 1.1175C8.9 0.996877 8.7825 0.936877 8.65417 0.937502H6.34583C6.21806 0.937502 6.10056 0.997502 5.99333 1.1175C5.88611 1.2375 5.83278 1.36969 5.83333 1.51406V2.8125Z"
                            fill="#C3C5C8"
                        />
                    </svg>
                ),
            },
            {
                href: '/projected-settlement?page=1&limit=25',
                label: 'Projected Settlement',
                icon: (
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M4.0625 4.6875C4.6841 4.6875 5.28024 4.44057 5.71978 4.00103C6.15932 3.56149 6.40625 2.96535 6.40625 2.34375C6.40625 1.72215 6.15932 1.12601 5.71978 0.686468C5.28024 0.24693 4.6841 0 4.0625 0C3.4409 0 2.84476 0.24693 2.40522 0.686468C1.96568 1.12601 1.71875 1.72215 1.71875 2.34375C1.71875 2.96535 1.96568 3.56149 2.40522 4.00103C2.84476 4.44057 3.4409 4.6875 4.0625 4.6875ZM0 6.86375C0 6.17938 0.554375 5.625 1.23875 5.625H4.73875C4.46484 6.31607 4.46016 7.08475 4.72563 7.7791C4.99111 8.47345 5.50741 9.04294 6.1725 9.375H4.67687C4.30746 9.37478 3.94633 9.48441 3.63939 9.68997C3.33246 9.89552 3.09357 10.1877 2.95312 10.5294C1.7 10.2975 0.94875 9.67188 0.519375 8.97313C7.45058e-08 8.13125 0 7.26125 0 7.11125V6.86375ZM8.82687 9.375H10.3237C11.1019 9.375 11.7687 9.85188 12.0475 10.5294C13.3006 10.2975 14.0519 9.67188 14.4812 8.97313C15 8.13062 15 7.26062 15 7.11062V6.86375C15.0002 6.70103 14.9682 6.53987 14.906 6.38951C14.8438 6.23914 14.7526 6.10252 14.6375 5.98745C14.5225 5.87239 14.3859 5.78115 14.2355 5.71896C14.0851 5.65676 13.924 5.62484 13.7612 5.625H10.2612C10.5352 6.31607 10.5398 7.08475 10.2744 7.7791C10.0089 8.47345 9.49258 9.04294 8.8275 9.375M13.2812 2.34375C13.2812 2.96535 13.0343 3.56149 12.5948 4.00103C12.1552 4.44057 11.5591 4.6875 10.9375 4.6875C10.3159 4.6875 9.71976 4.44057 9.28022 4.00103C8.84068 3.56149 8.59375 2.96535 8.59375 2.34375C8.59375 1.72215 8.84068 1.12601 9.28022 0.686468C9.71976 0.24693 10.3159 0 10.9375 0C11.5591 0 12.1552 0.24693 12.5948 0.686468C13.0343 1.12601 13.2812 1.72215 13.2812 2.34375ZM3.4375 11.2388C3.4375 10.5544 3.99187 10 4.67625 10H10.3237C11.0081 10 11.5625 10.5544 11.5625 11.2388V11.4856C11.5625 11.6356 11.5625 12.5056 11.0437 13.3481C10.5 14.2331 9.44125 15 7.5 15C5.55875 15 4.5 14.2325 3.95625 13.3488C3.4375 12.5056 3.4375 11.6363 3.4375 11.4856V11.2388ZM7.5 9.0625C8.1216 9.0625 8.71774 8.81557 9.15728 8.37603C9.59682 7.93649 9.84375 7.34035 9.84375 6.71875C9.84375 6.09715 9.59682 5.50101 9.15728 5.06147C8.71774 4.62193 8.1216 4.375 7.5 4.375C6.8784 4.375 6.28226 4.62193 5.84272 5.06147C5.40318 5.50101 5.15625 6.09715 5.15625 6.71875C5.15625 7.34035 5.40318 7.93649 5.84272 8.37603C6.28226 8.81557 6.8784 9.0625 7.5 9.0625Z"
                            fill="#C3C5C8"
                        />
                    </svg>
                ),
            },
            {
                href: '/settlement-report?page=1&limit=25',
                label: 'Settlement Report',
                icon: (
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M14.4695 9.64406L10.8511 8.11009L9.32099 7.46139C9.98922 7.08725 10.532 6.5098 10.8871 5.81428C11.1836 5.23453 11.3369 4.60502 11.3365 3.96818C11.3365 3.59301 11.2695 3.23673 11.1762 2.89297C10.721 1.22717 9.25722 0 7.5 0C5.77606 0 4.33447 1.18343 3.85109 2.8018C3.73949 3.17307 3.66277 3.55913 3.66277 3.96818C3.66277 4.67849 3.84947 5.34074 4.16672 5.91675C4.53341 6.58496 5.0771 7.13591 5.73885 7.49014L4.27347 8.09654L0.537678 9.64283C0.213269 9.77795 0 10.1032 0 10.4665V14.1145C0 14.6035 0.38333 14.9998 0.856542 14.9998H6.405V12.2066C6.40599 12.1778 6.41547 12.1498 6.4325 12.1253L6.43019 12.1241L7.33895 10.7252L7.34126 10.7265C7.37361 10.6772 7.43114 10.6423 7.5 10.6423C7.56886 10.6423 7.62639 10.677 7.65874 10.7265L7.65966 10.7258L7.66798 10.7388L7.67168 10.7445L8.56842 12.1247L8.56727 12.1253C8.58433 12.1499 8.59382 12.178 8.59476 12.2068V15H14.1432C14.6164 15 15 14.6037 15 14.1147V10.4665C15.0007 10.1045 14.7909 9.78226 14.4695 9.64406ZM8.56796 8.70869L8.57027 8.70992L7.66128 10.1088L7.65897 10.1075C7.64312 10.1327 7.62012 10.1537 7.59225 10.1684C7.56439 10.1832 7.53265 10.1911 7.50023 10.1915C7.46781 10.1911 7.43607 10.1832 7.40821 10.1684C7.38035 10.1537 7.35734 10.1327 7.34149 10.1075L7.34034 10.1082L7.33109 10.094L7.32832 10.0899L6.43157 8.70931L6.4325 8.70869C6.41543 8.68413 6.40595 8.65601 6.405 8.62717C6.405 8.53578 6.48842 8.46165 6.59124 8.46165H8.40876C8.51158 8.46165 8.595 8.53578 8.595 8.62717C8.59464 8.65604 8.58529 8.68426 8.56796 8.70869Z"
                            fill="#C3C5C8"
                        />
                    </svg>
                ),
            },
        ],
    },
    {
        header: 'SUPPORT',
        links: [
            {
                href: '/documentation?page=1&limit=25',
                label: 'Documentation',
                icon: <DocumentationIcon />,
            },
        ],
    },
];

export const LawFirmsnavItems = [
    {
        header: 'GENERAL',
        links: [
            {
                href: '/dashboard',
                label: 'Dashboard',
                icon: <DashboardIcon />,
            },
            {
                href: '/referral-form?page=1&limit=25',
                label: 'Referral Form',
                icon: (
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M0.976667 0.879C-9.93411e-08 1.75725 0 3.17175 0 6V9C0 11.8282 -9.93411e-08 13.2427 0.976667 14.121C1.9525 15 3.52417 15 6.66667 15H8.33333C11.4758 15 13.0475 15 14.0233 14.121C15 13.2427 15 11.8282 15 9V6C15 3.17175 15 1.75725 14.0233 0.879C13.0475 -8.9407e-08 11.4758 0 8.33333 0H6.66667C3.52417 0 1.9525 -8.9407e-08 0.976667 0.879ZM4.16667 5.4375C4.00091 5.4375 3.84193 5.49676 3.72472 5.60225C3.60751 5.70774 3.54167 5.85082 3.54167 6C3.54167 6.14918 3.60751 6.29226 3.72472 6.39775C3.84193 6.50324 4.00091 6.5625 4.16667 6.5625H10.8333C10.9991 6.5625 11.1581 6.50324 11.2753 6.39775C11.3925 6.29226 11.4583 6.14918 11.4583 6C11.4583 5.85082 11.3925 5.70774 11.2753 5.60225C11.1581 5.49676 10.9991 5.4375 10.8333 5.4375H4.16667ZM4.16667 8.4375C4.00091 8.4375 3.84193 8.49676 3.72472 8.60225C3.60751 8.70774 3.54167 8.85082 3.54167 9C3.54167 9.14918 3.60751 9.29226 3.72472 9.39775C3.84193 9.50324 4.00091 9.5625 4.16667 9.5625H8.33333C8.49909 9.5625 8.65806 9.50324 8.77527 9.39775C8.89248 9.29226 8.95833 9.14918 8.95833 9C8.95833 8.85082 8.89248 8.70774 8.77527 8.60225C8.65806 8.49676 8.49909 8.4375 8.33333 8.4375H4.16667Z"
                            fill="#9B9B9B"
                        />
                    </svg>
                ),
            },
            {
                href: '/pending-recommendations?page=1&limit=25',
                label: 'Pending Recommendations',
                icon: (
                    <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M10.4625 14.2909L11.325 13.4545L10.125 12.2909L9.2625 13.1273C9.0875 13.297 9 13.4909 9 13.7091C9 13.9273 9.0875 14.1212 9.2625 14.2909C9.4375 14.4606 9.6375 14.5455 9.8625 14.5455C10.0875 14.5455 10.2875 14.4606 10.4625 14.2909ZM12.375 12.4364L13.2375 11.6C13.4125 11.4303 13.5 11.2364 13.5 11.0182C13.5 10.8 13.4125 10.6061 13.2375 10.4364C13.0625 10.2667 12.8625 10.1818 12.6375 10.1818C12.4125 10.1818 12.2125 10.2667 12.0375 10.4364L11.175 11.2727L12.375 12.4364ZM11.5312 15.3273C11.0688 15.7758 10.5125 16 9.8625 16C9.2125 16 8.65625 15.7758 8.19375 15.3273C7.73125 14.8788 7.5 14.3394 7.5 13.7091C7.5 13.0788 7.73125 12.5394 8.19375 12.0909L10.9688 9.4C11.4312 8.95152 11.9875 8.72727 12.6375 8.72727C13.2875 8.72727 13.8438 8.95152 14.3063 9.4C14.7688 9.84848 15 10.3879 15 11.0182C15 11.6485 14.7688 12.1879 14.3063 12.6364L11.5312 15.3273ZM6.09375 14.5455H0V1.45455H4.65C4.8125 1.01818 5.0845 0.666667 5.466 0.4C5.8475 0.133333 6.2755 0 6.75 0C7.2245 0 7.65275 0.133333 8.03475 0.4C8.41675 0.666667 8.6885 1.01818 8.85 1.45455H13.5V7.36364C13.25 7.30303 13 7.27273 12.75 7.27273C12.5 7.27273 12.25 7.29091 12 7.32727V2.90909H1.5V13.0909H6.05625C6.01875 13.3333 6 13.5758 6 13.8182C6 14.0606 6.03125 14.303 6.09375 14.5455ZM6.75 2.36364C6.9125 2.36364 7.047 2.312 7.1535 2.20873C7.26 2.10545 7.313 1.97527 7.3125 1.81818C7.312 1.66109 7.25875 1.53091 7.15275 1.42764C7.04675 1.32436 6.9125 1.27273 6.75 1.27273C6.5875 1.27273 6.45325 1.32436 6.34725 1.42764C6.24125 1.53091 6.188 1.66109 6.1875 1.81818C6.187 1.97527 6.24025 2.1057 6.34725 2.20945C6.45425 2.31321 6.5885 2.36461 6.75 2.36364ZM3 5.81818V4.36364H10.5V5.81818H3ZM3 8.72727V7.27273H10.5V7.89091C10.4 7.95152 10.3033 8.02133 10.2098 8.10036C10.1163 8.17939 10.0192 8.26715 9.91875 8.36364L9.54375 8.72727H3ZM3 11.6364V10.1818H8.04375L7.125 11.0727C7.025 11.1697 6.9345 11.2638 6.8535 11.3549C6.7725 11.4461 6.7005 11.5399 6.6375 11.6364H3Z"
                            fill="#C3C5C8"
                        />
                    </svg>
                ),
            },
            {
                href: '/clients?page=1&limit=25',
                label: 'Clients',
                icon: <LawFirmIcon />,
            },
            {
                href: '/client-appointments?page=1&limit=25',
                label: 'Client Appointments',
                icon: <AppointmentIcon />,
            },
            {
                href: '/liens?page=1&limit=25',
                label: 'Liens',
                icon: (
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M12.6811 8.175L8.81571 12.45H7.256V10.725L11.1214 6.45L12.6811 8.175ZM14.9867 7.575C14.9867 7.8 14.7833 8.025 14.5798 8.25L12.8845 10.125L12.2742 9.45L14.0373 7.5L13.6304 7.05L13.1557 7.575L11.596 5.85L13.0879 4.275C13.2236 4.125 13.4948 4.125 13.6982 4.275L14.6476 5.325C14.7833 5.475 14.7833 5.775 14.6476 6C14.512 6.15 14.3764 6.3 14.3764 6.45C14.3764 6.6 14.512 6.75 14.6476 6.9C14.8511 7.125 15.0545 7.35 14.9867 7.575ZM1.35626 13.5V1.5H6.10318V5.25H9.49384V6.375L10.8501 4.875V4.5L6.78131 0H1.35626C0.610318 0 0 0.675 0 1.5V13.5C0 14.325 0.610318 15 1.35626 15H9.49384C10.2398 15 10.8501 14.325 10.8501 13.5H1.35626ZM6.78131 11.325C6.64569 11.325 6.51006 11.4 6.44225 11.4L6.10318 9.75H5.08598L3.66191 11.025L4.06879 9H3.05159L2.37346 12.75H3.39066L5.35724 10.8L5.76411 12.525H6.44225L6.78131 12.45V11.325Z"
                            fill="#C3C5C8"
                        />
                    </svg>
                ),
            },
            {
                href: '/settlements?page=1&limit=25',
                label: 'Settlements',
                icon: (
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M14.4696 5.13824C15.3669 4.24106 14.9577 3.19316 14.4696 2.68356L12.3163 0.530341C11.4119 -0.366835 10.3711 0.0422775 9.86149 0.530341L8.64127 1.75768H6.78222C5.41844 1.75768 4.62889 2.47542 4.22693 3.30082L1.03999 6.48759V9.35856L0.530369 9.86097C-0.366854 10.7653 0.0422798 11.8061 0.530369 12.3156L2.68371 14.4689C3.07131 14.8565 3.48762 15 3.8824 15C4.39202 15 4.85857 14.7488 5.13851 14.4689L7.07651 12.5238H9.65334C10.8736 12.5238 11.4909 11.763 11.7134 11.0165C12.5245 10.8012 12.9695 10.184 13.1489 9.58105C14.2615 9.29396 14.6778 8.23888 14.6778 7.49961V5.34638H14.2543L14.4696 5.13824ZM13.2422 7.49961C13.2422 7.82259 13.1059 8.21735 12.5245 8.21735H11.8067V8.93509C11.8067 9.25807 11.6703 9.65283 11.0889 9.65283H10.3711V10.3706C10.3711 10.6936 10.2347 11.0883 9.65334 11.0883H6.48793L4.13362 13.4425C3.91111 13.6506 3.78191 13.5286 3.70295 13.4497L1.55679 11.3108C1.34864 11.0883 1.47066 10.9591 1.54962 10.8802L2.47555 9.9471V7.07614L3.91111 5.64066V6.78187C3.91111 7.65033 4.48533 8.93509 6.06444 8.93509C7.64356 8.93509 8.21778 7.65033 8.21778 6.78187H13.2422V7.49961ZM13.4504 4.11905L12.2302 5.34638H6.78222V6.78187C6.78222 7.10485 6.64584 7.49961 6.06444 7.49961C5.48304 7.49961 5.34666 7.10485 5.34666 6.78187V4.62864C5.34666 4.29848 5.46869 3.19316 6.78222 3.19316H9.22985L10.8664 1.55671C11.0889 1.34857 11.2181 1.47058 11.2971 1.54953L13.4432 3.6884C13.6514 3.9109 13.5293 4.04009 13.4504 4.11905Z"
                            fill="#C3C5C8"
                        />
                    </svg>
                ),
            },
        ],
    },
    {
        header: 'DIRECTORY',
        links: [
            {
                href: '/providers?page=1&limit=25',
                label: 'Providers',
                icon: (
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M4.56522 6.92308C3.70038 6.92308 2.87096 6.61916 2.25943 6.07819C1.6479 5.53722 1.30435 4.80351 1.30435 4.03846V1.73077C1.30435 1.57776 1.37306 1.43102 1.49536 1.32282C1.61767 1.21463 1.78355 1.15385 1.95652 1.15385H2.60869C2.78166 1.15385 2.94754 1.09306 3.06985 0.984869C3.19216 0.876675 3.26087 0.729933 3.26087 0.576923C3.26087 0.423914 3.19216 0.277171 3.06985 0.168977C2.94754 0.0607828 2.78166 0 2.60869 0H1.95652C1.43762 0 0.939971 0.182348 0.573052 0.506931C0.206133 0.831513 0 1.27174 0 1.73077V4.03846C0.000838317 4.69023 0.180503 5.33208 0.523565 5.90889C0.866626 6.4857 1.36283 6.98023 1.96956 7.35C2.5525 7.80463 3.02524 8.35904 3.35927 8.97976C3.6933 9.60048 3.88168 10.2746 3.91304 10.9615C3.91304 12.0326 4.39402 13.0598 5.25016 13.8172C6.10631 14.5745 7.26749 15 8.47826 15C9.68903 15 10.8502 14.5745 11.7064 13.8172C12.5625 13.0598 13.0435 12.0326 13.0435 10.9615V10.3038C13.6582 10.1634 14.194 9.82948 14.5504 9.36461C14.9067 8.89974 15.0592 8.33585 14.9792 7.77865C14.8992 7.22145 14.5922 6.70919 14.1158 6.33789C13.6394 5.96659 13.0262 5.76174 12.3913 5.76174C11.7564 5.76174 11.1432 5.96659 10.6668 6.33789C10.1904 6.70919 9.8834 7.22145 9.8034 7.77865C9.72339 8.33585 9.87586 8.89974 10.2322 9.36461C10.5886 9.82948 11.1243 10.1634 11.7391 10.3038V10.9615C11.7391 11.7266 11.3956 12.4603 10.784 13.0013C10.1725 13.5422 9.34309 13.8462 8.47826 13.8462C7.61342 13.8462 6.78401 13.5422 6.17248 13.0013C5.56094 12.4603 5.21739 11.7266 5.21739 10.9615C5.2504 10.2738 5.44082 9.59911 5.77712 8.97834C6.11341 8.35757 6.5886 7.80361 7.17391 7.35C7.77823 6.97894 8.2719 6.48386 8.61264 5.90713C8.95338 5.3304 9.13105 4.68921 9.13043 4.03846V1.73077C9.13043 1.27174 8.9243 0.831513 8.55738 0.506931C8.19046 0.182348 7.69281 0 7.17391 0H6.52174C6.34877 0 6.18289 0.0607828 6.06058 0.168977C5.93827 0.277171 5.86956 0.423914 5.86956 0.576923C5.86956 0.729933 5.93827 0.876675 6.06058 0.984869C6.18289 1.09306 6.34877 1.15385 6.52174 1.15385H7.17391C7.34688 1.15385 7.51276 1.21463 7.63507 1.32282C7.75737 1.43102 7.82608 1.57776 7.82608 1.73077V4.03846C7.82608 4.41727 7.74174 4.79238 7.57787 5.14236C7.41399 5.49233 7.1738 5.81033 6.871 6.07819C6.5682 6.34605 6.20872 6.55853 5.8131 6.7035C5.41747 6.84846 4.99344 6.92308 4.56522 6.92308ZM12.3913 9.23077C12.0454 9.23077 11.7136 9.1092 11.469 8.89282C11.2244 8.67643 11.087 8.38294 11.087 8.07692C11.087 7.7709 11.2244 7.47742 11.469 7.26103C11.7136 7.04464 12.0454 6.92308 12.3913 6.92308C12.7372 6.92308 13.069 7.04464 13.3136 7.26103C13.5582 7.47742 13.6956 7.7709 13.6956 8.07692C13.6956 8.38294 13.5582 8.67643 13.3136 8.89282C13.069 9.1092 12.7372 9.23077 12.3913 9.23077Z"
                            fill="#C3C5C8"
                        />
                    </svg>
                ),
            },
            {
                href: '/office-directory?page=1&limit=25',
                label: 'Office Directory',
                icon: (
                    <svg width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M11.75 10.75H14.75L17 16H2L4.25 10.75H7.25M10.25 5.5C10.25 5.69891 10.171 5.88968 10.0303 6.03033C9.88968 6.17098 9.69891 6.25 9.5 6.25C9.30109 6.25 9.11032 6.17098 8.96967 6.03033C8.82902 5.88968 8.75 5.69891 8.75 5.5C8.75 5.30109 8.82902 5.11032 8.96967 4.96967C9.11032 4.82902 9.30109 4.75 9.5 4.75C9.69891 4.75 9.88968 4.82902 10.0303 4.96967C10.171 5.11032 10.25 5.30109 10.25 5.5ZM5 5.5C5 9.25 9.5 13 9.5 13C9.5 13 14 9.25 14 5.5C14 2.93725 11.9855 1 9.5 1C7.0145 1 5 2.93725 5 5.5Z"
                            stroke="#C3C5C8"
                            strokeWidth="1.5"
                        />
                    </svg>
                ),
            },
        ],
    },
    {
        header: 'SUPPORT',
        links: [
            {
                href: '/documentation',
                label: 'Documentation',
                icon: <DocumentationIcon />,
            },
        ],
    },
];

export const TherapistNavItems = [
    {
        header: 'General',
        links: [
            {
                href: '/dashboard',
                label: 'Dashboard',
                icon: <DashboardIcon />,
            },
        ],
    },
    {
        header: 'PATIENT',
        links: [
            {
                href: '/patients?page=1&limit=25',
                label: 'Patients',
                icon: <PatientIcon />,
            },
            {
                href: '/appt-requests?page=1&limit=25',
                label: 'Appt Requests',
                icon: <AppointmentRequestIcon />,
            },
            {
                href: '/appointments?page=1&limit=25',
                label: 'Appointments',
                icon: <AppointmentIcon />,
            },
            {
                href: '/missing-documents?page=1&limit=25',
                label: 'Missing Documents',
                icon: <MissingDocumentIcon />,
            },
        ],
    },
    {
        header: 'THERAPIST',
        links: [
            {
                href: '/therapists?page=1&limit=25',
                label: 'Therapists',
                icon: <TherapistIcon />,
            },
            {
                href: '/therapist-staff',
                label: 'Therapist Staff',
                icon: <ProviderStaffIcon />,
            },
            {
                href: '/therapist-locations?page=1&limit=25',
                label: 'Therapist Locations',
                icon: <ProviderOfficeIcon />,
            },
            {
                href: '/therapist-liens?page=1&limit=25',
                label: 'Liens',
                icon: <LiensIcon />,
            },
            {
                href: '/therapist-settlements?page=1&limit=25',
                label: 'Settlements',
                icon: <SettlementsIcon />,
            },
        ],
    },
    {
        header: 'REPORTS',
        links: [
            {
                href: '/therapist-report?page=1&limit=25',
                label: 'Therapist Report',
                icon: (
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M1.34667 15C0.962778 15 0.6425 14.8556 0.385833 14.5669C0.129167 14.2781 0.000555556 13.9175 0 13.485V9.84375H5.83333V11.25H9.16667V9.84375H15V13.4859C15 13.9172 14.8717 14.2772 14.615 14.5659C14.3583 14.8547 14.0381 14.9994 13.6542 15H1.34667ZM6.66667 10.3125V8.4375H8.33333V10.3125H6.66667ZM0 8.90625V4.3275C0 3.89563 0.128611 3.53531 0.385833 3.24656C0.643056 2.95781 0.963055 2.81313 1.34583 2.8125H5V1.51406C5 1.08281 5.12861 0.722502 5.38583 0.433127C5.64306 0.143752 5.96333 -0.000622979 6.34667 2.02048e-06H8.65417C9.0375 2.02048e-06 9.35778 0.144377 9.615 0.433127C9.87222 0.721877 10.0006 1.08219 10 1.51406V2.8125H13.6542C14.0375 2.8125 14.3575 2.95719 14.6142 3.24656C14.8708 3.53594 14.9994 3.89625 15 4.3275V8.90625H9.16667V7.5H5.83333V8.90625H0ZM5.83333 2.8125H9.16667V1.51406C9.16667 1.37031 9.11333 1.23813 9.00667 1.1175C8.9 0.996877 8.7825 0.936877 8.65417 0.937502H6.34583C6.21806 0.937502 6.10056 0.997502 5.99333 1.1175C5.88611 1.2375 5.83278 1.36969 5.83333 1.51406V2.8125Z"
                            fill="#C3C5C8"
                        />
                    </svg>
                ),
            },
            {
                href: '/projected-settlement?page=1&limit=25',
                label: 'Projected Settlement',
                icon: (
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M4.0625 4.6875C4.6841 4.6875 5.28024 4.44057 5.71978 4.00103C6.15932 3.56149 6.40625 2.96535 6.40625 2.34375C6.40625 1.72215 6.15932 1.12601 5.71978 0.686468C5.28024 0.24693 4.6841 0 4.0625 0C3.4409 0 2.84476 0.24693 2.40522 0.686468C1.96568 1.12601 1.71875 1.72215 1.71875 2.34375C1.71875 2.96535 1.96568 3.56149 2.40522 4.00103C2.84476 4.44057 3.4409 4.6875 4.0625 4.6875ZM0 6.86375C0 6.17938 0.554375 5.625 1.23875 5.625H4.73875C4.46484 6.31607 4.46016 7.08475 4.72563 7.7791C4.99111 8.47345 5.50741 9.04294 6.1725 9.375H4.67687C4.30746 9.37478 3.94633 9.48441 3.63939 9.68997C3.33246 9.89552 3.09357 10.1877 2.95312 10.5294C1.7 10.2975 0.94875 9.67188 0.519375 8.97313C7.45058e-08 8.13125 0 7.26125 0 7.11125V6.86375ZM8.82687 9.375H10.3237C11.1019 9.375 11.7687 9.85188 12.0475 10.5294C13.3006 10.2975 14.0519 9.67188 14.4812 8.97313C15 8.13062 15 7.26062 15 7.11062V6.86375C15.0002 6.70103 14.9682 6.53987 14.906 6.38951C14.8438 6.23914 14.7526 6.10252 14.6375 5.98745C14.5225 5.87239 14.3859 5.78115 14.2355 5.71896C14.0851 5.65676 13.924 5.62484 13.7612 5.625H10.2612C10.5352 6.31607 10.5398 7.08475 10.2744 7.7791C10.0089 8.47345 9.49258 9.04294 8.8275 9.375M13.2812 2.34375C13.2812 2.96535 13.0343 3.56149 12.5948 4.00103C12.1552 4.44057 11.5591 4.6875 10.9375 4.6875C10.3159 4.6875 9.71976 4.44057 9.28022 4.00103C8.84068 3.56149 8.59375 2.96535 8.59375 2.34375C8.59375 1.72215 8.84068 1.12601 9.28022 0.686468C9.71976 0.24693 10.3159 0 10.9375 0C11.5591 0 12.1552 0.24693 12.5948 0.686468C13.0343 1.12601 13.2812 1.72215 13.2812 2.34375ZM3.4375 11.2388C3.4375 10.5544 3.99187 10 4.67625 10H10.3237C11.0081 10 11.5625 10.5544 11.5625 11.2388V11.4856C11.5625 11.6356 11.5625 12.5056 11.0437 13.3481C10.5 14.2331 9.44125 15 7.5 15C5.55875 15 4.5 14.2325 3.95625 13.3488C3.4375 12.5056 3.4375 11.6363 3.4375 11.4856V11.2388ZM7.5 9.0625C8.1216 9.0625 8.71774 8.81557 9.15728 8.37603C9.59682 7.93649 9.84375 7.34035 9.84375 6.71875C9.84375 6.09715 9.59682 5.50101 9.15728 5.06147C8.71774 4.62193 8.1216 4.375 7.5 4.375C6.8784 4.375 6.28226 4.62193 5.84272 5.06147C5.40318 5.50101 5.15625 6.09715 5.15625 6.71875C5.15625 7.34035 5.40318 7.93649 5.84272 8.37603C6.28226 8.81557 6.8784 9.0625 7.5 9.0625Z"
                            fill="#C3C5C8"
                        />
                    </svg>
                ),
            },
            {
                href: '/settlement-report?page=1&limit=25',
                label: 'Settlement Report',
                icon: (
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M14.4695 9.64406L10.8511 8.11009L9.32099 7.46139C9.98922 7.08725 10.532 6.5098 10.8871 5.81428C11.1836 5.23453 11.3369 4.60502 11.3365 3.96818C11.3365 3.59301 11.2695 3.23673 11.1762 2.89297C10.721 1.22717 9.25722 0 7.5 0C5.77606 0 4.33447 1.18343 3.85109 2.8018C3.73949 3.17307 3.66277 3.55913 3.66277 3.96818C3.66277 4.67849 3.84947 5.34074 4.16672 5.91675C4.53341 6.58496 5.0771 7.13591 5.73885 7.49014L4.27347 8.09654L0.537678 9.64283C0.213269 9.77795 0 10.1032 0 10.4665V14.1145C0 14.6035 0.38333 14.9998 0.856542 14.9998H6.405V12.2066C6.40599 12.1778 6.41547 12.1498 6.4325 12.1253L6.43019 12.1241L7.33895 10.7252L7.34126 10.7265C7.37361 10.6772 7.43114 10.6423 7.5 10.6423C7.56886 10.6423 7.62639 10.677 7.65874 10.7265L7.65966 10.7258L7.66798 10.7388L7.67168 10.7445L8.56842 12.1247L8.56727 12.1253C8.58433 12.1499 8.59382 12.178 8.59476 12.2068V15H14.1432C14.6164 15 15 14.6037 15 14.1147V10.4665C15.0007 10.1045 14.7909 9.78226 14.4695 9.64406ZM8.56796 8.70869L8.57027 8.70992L7.66128 10.1088L7.65897 10.1075C7.64312 10.1327 7.62012 10.1537 7.59225 10.1684C7.56439 10.1832 7.53265 10.1911 7.50023 10.1915C7.46781 10.1911 7.43607 10.1832 7.40821 10.1684C7.38035 10.1537 7.35734 10.1327 7.34149 10.1075L7.34034 10.1082L7.33109 10.094L7.32832 10.0899L6.43157 8.70931L6.4325 8.70869C6.41543 8.68413 6.40595 8.65601 6.405 8.62717C6.405 8.53578 6.48842 8.46165 6.59124 8.46165H8.40876C8.51158 8.46165 8.595 8.53578 8.595 8.62717C8.59464 8.65604 8.58529 8.68426 8.56796 8.70869Z"
                            fill="#C3C5C8"
                        />
                    </svg>
                ),
            },
        ],
    },
    {
        header: 'SUPPORT',
        links: [
            {
                href: '/documentation?page=1&limit=25',
                label: 'Documentation',
                icon: <DocumentationIcon />,
            },
        ],
    },
];
