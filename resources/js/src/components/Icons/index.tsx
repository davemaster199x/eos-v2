import React from 'react';
import {
    Book2,
    BoxMinimalistic,
    CalendarAdd,
    City,
    HandHeart,
    HeartPulse,
    Hospital,
    MapPointWave,
    MedicalKit,
    Note,
    Notes,
    Sledgehammer,
    Stethoscope,
    User,
    UserHeart,
    UsersGroupTwoRounded,
    WalletMoney,
    Widget5,
} from 'solar-icon-set';
import { cn } from '../../utils/util';
export type IconProps = {
    color?: string;
    size?: number;
    autoSize?: boolean;
    svgProps?: React.SVGProps<SVGSVGElement>;
    iconStyle?: `Broken` | `LineDuotone` | `Linear` | `Outline` | `Bold` | `BoldDuotone`;
} & Omit<React.HTMLProps<HTMLSpanElement>, 'color' | 'size'>;

const defs: IconProps = {
    color: 'currentColor',
    size: 20,
    autoSize: true,
    iconStyle: 'BoldDuotone',
    svgProps: {},
};

export const DashboardIcon = (props: IconProps) => {
    return (
        <Widget5
            iconStyle={defs.iconStyle}
            size={defs.size}
            autoSize={defs.autoSize}
            svgProps={{ className: 'group-hover:!text-primary transition duration-300' }}
            {...props}
            className={cn(``, props.className)}
        />
    );
};

export const PatientIcon = (props: IconProps) => {
    return (
        <HeartPulse
            iconStyle={defs.iconStyle}
            size={defs.size}
            autoSize={defs.autoSize}
            svgProps={{ className: 'group-hover:!text-primary transition duration-300' }}
            {...props}
            className={cn(``, props.className)}
        />
    );
};
export const AppointmentRequestIcon = (props: IconProps) => {
    return (
        <CalendarAdd
            iconStyle={defs.iconStyle}
            size={defs.size}
            autoSize={defs.autoSize}
            svgProps={{ className: 'group-hover:!text-primary transition duration-300' }}
            {...props}
            className={cn(``, props.className)}
        />
    );
};

export const AppointmentIcon = (props: IconProps) => {
    return (
        <MedicalKit
            iconStyle={defs.iconStyle}
            size={defs.size}
            autoSize={defs.autoSize}
            svgProps={{ className: 'group-hover:!text-primary transition duration-300' }}
            {...props}
            className={cn(``, props.className)}
        />
    );
};
export const MissingDocumentIcon = (props: IconProps) => {
    return (
        <Notes
            iconStyle={defs.iconStyle}
            size={defs.size}
            autoSize={defs.autoSize}
            svgProps={{ className: 'group-hover:!text-primary transition duration-300' }}
            {...props}
            className={cn(``, props.className)}
        />
    );
};
export const SpecialistIcon = (props: IconProps) => {
    return (
        <Stethoscope
            iconStyle={defs.iconStyle}
            size={defs.size}
            autoSize={defs.autoSize}
            svgProps={{ className: 'group-hover:!text-primary transition duration-300' }}
            {...props}
            className={cn(``, props.className)}
        />
    );
};
export const TherapistIcon = (props: IconProps) => {
    return (
        <HandHeart
            iconStyle={defs.iconStyle}
            size={defs.size}
            autoSize={defs.autoSize}
            svgProps={{ className: 'group-hover:!text-primary transition duration-300' }}
            {...props}
            className={cn(``, props.className)}
        />
    );
};
export const ProviderStaffIcon = (props: IconProps) => {
    return (
        <UserHeart
            iconStyle={defs.iconStyle}
            size={defs.size}
            autoSize={defs.autoSize}
            svgProps={{ className: 'group-hover:!text-primary transition duration-300' }}
            {...props}
            className={cn(``, props.className)}
        />
    );
};

export const ProviderOfficeIcon = (props: IconProps) => {
    return (
        <Hospital
            iconStyle={defs.iconStyle}
            size={defs.size}
            autoSize={defs.autoSize}
            svgProps={{ className: 'group-hover:!text-primary transition duration-300' }}
            {...props}
            className={cn(``, props.className)}
        />
    );
};
export const MapsIcon = (props: IconProps) => {
    return (
        <MapPointWave
            iconStyle={defs.iconStyle}
            size={defs.size}
            autoSize={defs.autoSize}
            svgProps={{ className: 'group-hover:!text-primary transition duration-300' }}
            {...props}
            className={cn(``, props.className)}
        />
    );
};
export const LiensIcon = (props: IconProps) => {
    return (
        <Notes
            iconStyle={defs.iconStyle}
            size={defs.size}
            autoSize={defs.autoSize}
            svgProps={{ className: 'group-hover:!text-primary transition duration-300' }}
            {...props}
            className={cn(``, props.className)}
        />
    );
};
export const MRIIcon = (props: IconProps) => {
    return (
        <City
            iconStyle={defs.iconStyle}
            size={defs.size}
            autoSize={defs.autoSize}
            svgProps={{ className: 'group-hover:!text-primary transition duration-300' }}
            {...props}
            className={cn(``, props.className)}
        />
    );
};
export const LawFirmIcon = (props: IconProps) => {
    return (
        <Sledgehammer
            iconStyle={defs.iconStyle}
            size={defs.size}
            autoSize={defs.autoSize}
            svgProps={{ className: 'group-hover:!text-primary transition duration-300' }}
            {...props}
            className={cn(``, props.className)}
        />
    );
};

export const ReferralSourceIcon = (props: IconProps) => {
    return (
        <BoxMinimalistic
            iconStyle={defs.iconStyle}
            size={defs.size}
            autoSize={defs.autoSize}
            svgProps={{ className: 'group-hover:!text-primary transition duration-300' }}
            {...props}
            className={cn(``, props.className)}
        />
    );
};
export const ReferralSourceStaffIcon = (props: IconProps) => {
    return (
        <UsersGroupTwoRounded
            iconStyle={defs.iconStyle}
            size={defs.size}
            autoSize={defs.autoSize}
            svgProps={{ className: 'group-hover:!text-primary transition duration-300' }}
            {...props}
            className={cn(``, props.className)}
        />
    );
};
export const SettlementsIcon = (props: IconProps) => {
    return (
        <WalletMoney
            iconStyle={defs.iconStyle}
            size={defs.size}
            autoSize={defs.autoSize}
            svgProps={{ className: 'group-hover:!text-primary transition duration-300' }}
            {...props}
            className={cn(``, props.className)}
        />
    );
};
export const UserIcon = (props: IconProps) => {
    return (
        <User
            iconStyle={defs.iconStyle}
            size={defs.size}
            autoSize={defs.autoSize}
            svgProps={{ className: 'group-hover:!text-primary transition duration-300' }}
            {...props}
            className={cn(``, props.className)}
        />
    );
};
export const DocumentationIcon = (props: IconProps) => {
    return (
        <Book2
            iconStyle={defs.iconStyle}
            size={defs.size}
            autoSize={defs.autoSize}
            svgProps={{ className: 'group-hover:!text-primary transition duration-300' }}
            {...props}
            className={cn(``, props.className)}
        />
    );
};

export const ErrorIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            opacity="0.5"
            d="M22 14V11.7979C22 9.16554 22 7.84935 21.2305 6.99383C21.1598 6.91514 21.0849 6.84024 21.0062 6.76946C20.1506 6 18.8345 6 16.2021 6H15.8284C14.6747 6 14.0979 6 13.5604 5.84678C13.2651 5.7626 12.9804 5.64471 12.7121 5.49543C12.2237 5.22367 11.8158 4.81578 11 4L10.4497 3.44975C10.1763 3.17633 10.0396 3.03961 9.89594 2.92051C9.27652 2.40704 8.51665 2.09229 7.71557 2.01738C7.52976 2 7.33642 2 6.94975 2C6.06722 2 5.62595 2 5.25839 2.06935C3.64031 2.37464 2.37464 3.64031 2.06935 5.25839C2 5.62595 2 6.06722 2 6.94975V14C2 17.7712 2 19.6569 3.17157 20.8284C4.34315 22 6.22876 22 10 22H14C17.7712 22 19.6569 22 20.8284 20.8284C22 19.6569 22 17.7712 22 14Z"
            fill="#ef4444"
        />
        <path
            d="M9.96967 11.4697C10.2626 11.1768 10.7374 11.1768 11.0303 11.4697L12 12.4393L12.9697 11.4697C13.2626 11.1768 13.7374 11.1768 14.0303 11.4697C14.3232 11.7626 14.3232 12.2374 14.0303 12.5303L13.0607 13.5L14.0303 14.4697C14.3232 14.7626 14.3232 15.2374 14.0303 15.5303C13.7374 15.8232 13.2626 15.8232 12.9697 15.5303L12 14.5607L11.0303 15.5303C10.7374 15.8232 10.2626 15.8232 9.96967 15.5303C9.67678 15.2374 9.67678 14.7626 9.96967 14.4697L10.9393 13.5L9.96967 12.5303C9.67678 12.2374 9.67678 11.7626 9.96967 11.4697Z"
            fill="#ef4444"
        />
    </svg>
);
export const FileIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            opacity="0.5"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10 22H14C17.7712 22 19.6569 22 20.8284 20.8284C22 19.6569 22 17.7712 22 14V13.5629C22 12.6901 22 12.0344 21.9574 11.5001H18L17.9051 11.5001C16.808 11.5002 15.8385 11.5003 15.0569 11.3952C14.2098 11.2813 13.3628 11.0198 12.6716 10.3285C11.9803 9.63726 11.7188 8.79028 11.6049 7.94316C11.4998 7.16164 11.4999 6.19207 11.5 5.09497L11.5092 2.26057C11.5095 2.17813 11.5166 2.09659 11.53 2.01666C11.1214 2 10.6358 2 10.0298 2C6.23869 2 4.34315 2 3.17157 3.17157C2 4.34315 2 6.22876 2 10V14C2 17.7712 2 19.6569 3.17157 20.8284C4.34315 22 6.22876 22 10 22Z"
            fill="#1C274C"
        />
        <path
            d="M7.98705 12.9528C8.27554 12.6824 8.72446 12.6824 9.01296 12.9528L11.013 14.8278C11.3151 15.1111 11.3305 15.5858 11.0472 15.888C10.7639 16.1901 10.2892 16.2054 9.98705 15.9222L9.25 15.2312L9.25 18.5C9.25 18.9142 8.91422 19.25 8.5 19.25C8.08579 19.25 7.75 18.9142 7.75 18.5L7.75 15.2312L7.01296 15.9222C6.71077 16.2055 6.23615 16.1901 5.95285 15.888C5.66955 15.5858 5.68486 15.1111 5.98705 14.8278L7.98705 12.9528Z"
            fill="#1C274C"
        />
        <path
            d="M11.5092 2.2601L11.5 5.0945C11.4999 6.1916 11.4998 7.16117 11.6049 7.94269C11.7188 8.78981 11.9803 9.6368 12.6716 10.3281C13.3629 11.0193 14.2098 11.2808 15.057 11.3947C15.8385 11.4998 16.808 11.4997 17.9051 11.4996L21.9574 11.4996C21.9698 11.6552 21.9786 11.821 21.9848 11.9995H22C22 11.732 22 11.5983 21.9901 11.4408C21.9335 10.5463 21.5617 9.52125 21.0315 8.79853C20.9382 8.6713 20.8743 8.59493 20.7467 8.44218C19.9542 7.49359 18.911 6.31193 18 5.49953C17.1892 4.77645 16.0787 3.98536 15.1101 3.3385C14.2781 2.78275 13.862 2.50487 13.2915 2.29834C13.1403 2.24359 12.9408 2.18311 12.7846 2.14466C12.4006 2.05013 12.0268 2.01725 11.5 2.00586L11.5092 2.2601Z"
            fill="#1C274C"
        />
    </svg>
);
