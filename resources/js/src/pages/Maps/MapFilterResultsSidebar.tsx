import React, { useState, useEffect } from 'react';
import ModalComponent from '../../components/ModalComponent';
import SurgeryCenterForm from '../EliteForms/SurgeryCenterForm';
import ProviderOfficeForm from '../EliteForms/ProviderOfficeForm';
import MRIFacilityForm from '../EliteForms/MRIFacilityForm';
import { useQueryParamsContext } from '../../Providers/QueryParamsProvider';
import ToggleSwitch from '../../components/ToggleSwitch';
import Badge from '../../components/Badge';
import CopyToClipboardIcon from '../../components/CopyToClipboard';
import NoImage from '../../components/Images/ImagePlaceHolder';
import { cn } from '../../utils/util';
import { useQuery } from '@tanstack/react-query';
import { useMaps } from '../../Providers/MapsProviders';

import SkeletonLoader from '../../components/SkeletonLoader';
import NoFacilitiesFound from '../../components/Images/NoFacilitiesFound';
import Tippy from '@tippyjs/react';
import Pagination, { PaginationInfo } from '../../components/Pagination';
import PayStatus from '../../components/PayStatus';

const MapFilterResultsSidebar = () => {
    const { facilities, setFacilities, fetchFacilities, focusOnFacility } = useMaps();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentForm, setCurrentForm] = useState(null);

    const { queryParams, setQueryParams } = useQueryParamsContext();

    const { isLoading, error, data } = useQuery({
        queryKey: ['facilities', queryParams],
        queryFn: async () => {
            if (queryParams) {
                const data = (await fetchFacilities(queryParams)) as any;
                setFacilities(data.data);
                return data;
            }
        },
    });

    useEffect(() => {
        if (data) {
            setQueryParams({ ...queryParams, page: data.current_page > data.last_page ? data.last_page : data.current_page });
        }
    }, [queryParams.page, data]);

    const openModal = (formType) => {
        setCurrentForm(formType);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentForm(null);
    };

    const handleToggleShowActiveOnly = () => {
        setQueryParams({ ...queryParams, active: !queryParams.active ? '1' : '' });
    };

    const handlePageChange = (newPage) => {
        setQueryParams((prev) => ({ ...prev, page: newPage }));
    };

    return (
        <div className="panel w-1/4 min-w-[385px] max-w-[385px] p-4 relative">
            <button id="back-button" className="hidden absolute left-4 top-4 bg-blue-500 text-white px-2 py-1 rounded-md">
                Back
            </button>
            {/* <AllFacilitiesAlert facilitiesCount={facilities?.length} />
            <PaginatedFacilitiesAlert currentCount={facilities?.length} totalCount={facilities?.length} pageSize={facilities?.length} /> */}
            <div className="flex flex-col gap-2 border-b">
                <div className="">
                    <h2 className="text-lg font-semibold">Add Locations</h2>
                </div>
                <ModalComponent isOpen={isModalOpen} onClose={closeModal} size="4xl">
                    {currentForm === 'surgery' && <SurgeryCenterForm className="shadow-none m-0 p-0" />}
                    {currentForm === 'specialist' && <ProviderOfficeForm providerType="Specialist" className="shadow-none m-0 p-0" />}
                    {currentForm === 'therapist' && <ProviderOfficeForm providerType="Therapist" className="shadow-none m-0 p-0" />}
                    {currentForm === 'mri' && <MRIFacilityForm className="shadow-none m-0 p-0" />}
                </ModalComponent>
                <div id="facility-buttons" className="grid grid-cols-2 gap-1 mb-4">
                    <button onClick={() => openModal('specialist')} className="text-xs border-dashed add-facility-button bg-white border border-gray-300 rounded-md py-2 hover:bg-gray-100">
                        Specialist Office
                    </button>
                    <button onClick={() => openModal('therapist')} className="text-xs border-dashed add-facility-button bg-white border border-gray-300 rounded-md py-2 hover:bg-gray-100">
                        Therapist Office
                    </button>
                    <button onClick={() => openModal('mri')} className="text-xs border-dashed add-facility-button bg-white border border-gray-300 rounded-md py-2 hover:bg-gray-100">
                        MRI Facility
                    </button>
                    <button onClick={() => openModal('surgery')} className="text-xs border-dashed add-facility-button bg-white border border-gray-300 rounded-md py-2 hover:bg-gray-100">
                        Surgery Center
                    </button>
                </div>
            </div>

            <div className="flex justify-between items-center my-4 ">
                <PaginationInfo from={data?.from} to={data?.to} total={data?.total} />
                <div className="flex items-center">
                    <label className="switch flex items-center">
                        <span className="text-xs text-gray-500 font-normal mr-2 ">Show Active Only</span>
                        <ToggleSwitch checked={queryParams.active === '1'} onChange={handleToggleShowActiveOnly} />
                    </label>
                </div>
            </div>

            <Pagination
                paginationData={{
                    current_page: data?.current_page,
                    last_page: data?.last_page,
                    total: data?.total,
                    per_page: data?.per_page,
                }}
                onPageChange={handlePageChange}
                buttonSize="sm"
            />

            <div id="results-list " className="h-[calc(100vh-210px)] overflow-y-auto py-4 pr-2">
                {isLoading && Array.of(1, 2, 3, 4, 5).map((i) => <SkeletonLoader key={i} className="mb-4" />)}
                {error && <div>Error: {error.message}</div>}
                {facilities?.length ? (
                    facilities.map((facility, index) => {
                        return <FacilityCard key={facility.id} facility={facility} focusOnFacility={focusOnFacility} />;
                    })
                ) : (
                    <NoFacilitiesFound />
                )}
            </div>
        </div>
    );
};

export const FacilityCard = ({ facility, focusOnFacility, variant = 1, className }: { facility: any; focusOnFacility: any; variant?: number; className?: string }) => {
    const statuses = getPayStatuses();
    const handleClick = () => {
        focusOnFacility(facility.latitude, facility.longitude, facility.name, 10);
    };
    const handleCopyClick = (e) => {
        e.stopPropagation(); // This stops the event from bubbling up to the parent
    };

    const [imageError, setImageError] = useState(false);
    const handleImageError = () => {
        setImageError(true);
    };
    facility.image = facility.image_of_office || facility.photo_file;

    facility.name = facility.office_name || facility.facility_name || facility.name;
    return (
        <div
            className={cn(
                `facility-card flex gap-2  items-center ${variant === 1 ? 'flex-col' : 'flex-row h-full '} mb-4 p-4 shadow hover:shadow-md cursor-pointer border rounded-lg   transition-shadow`,
                className
            )}
            onClick={handleClick}
        >
            <div className="w-full">
                {!facility.photo_file || imageError ? (
                    <NoImage />
                ) : (
                    <img
                        src={`${facility?.photo_file?.preview_url}`}
                        alt={facility.photo_file}
                        className={`w-full ${variant === 1 ? 'h-28 ' : 'h-32'} rounded-md object-cover`}
                        onError={handleImageError}
                    />
                )}
            </div>
            <div className="facility-info w-full flex flex-col gap-2">
                <div className="flex flex-col ">
                    <h5 className={`facility-name text-lg font-semibold`}>{facility.name}</h5>

                    {/* {currentView === 'detailed' && ( */}
                    <div className={`flex flex-wrap gap-1 mt-1`}>
                        {['po_specialty_detail', 'po_therapies_provided'].map((key) =>
                            facility?.[key]?.map((item, index) => (
                                <Badge key={index} variant={key === 'po_specialty_detail' ? 'green' : 'blue'}>
                                    {item?.name}
                                </Badge>
                            ))
                        )}
                    </div>
                </div>
                {/* )} */}
                <p className={`facility-address text-xs text-gray-600`}>{facility.full_address}</p>
                {(facility?.provider?.pay_status || facility?.pay_status || facility?.distance) && (
                    <div className={`flex items-center ${facility?.distance ? 'justify-between' : 'justify-end'}  w-full`}>
                        {facility?.distance ? (
                            <div className="flex items-center gap-1">
                                <p className={`facility-distance text-xs text-gray-600`}>
                                    within <span className="font-bold">{facility.distance.toFixed(2)} miles</span>
                                </p>
                                <div onClick={handleCopyClick}>
                                    <CopyToClipboardIcon text={`${facility.name} - ${facility.distance.toFixed(2)} miles`} />
                                </div>
                            </div>
                        ) : null}
                        {facility?.provider_type === 'Therapist' ? (
                            <Tippy content={statuses[facility?.pay_status]?.description}>
                                <div>
                                    <PayStatus status={facility?.pay_status} />
                                </div>
                            </Tippy>
                        ) : (
                            facility?.provider_type === 'Specialist' && (
                                <Tippy content={statuses[facility?.provider?.pay_status]?.description}>
                                    <div>
                                        <PayStatus status={facility?.provider?.pay_status} />
                                    </div>
                                </Tippy>
                            )
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

function getPayStatuses() {
    return {
        'Not in Network': {
            label: 'Not in Network',
            description: 'Provider has been requested to add, for sales handoffs and needs confirmation before referrals can be given.',
        },
        'Is Paying': {
            label: 'Is Paying',
            description: 'Fully onboarded and can give referrals.',
        },
        'For Retention': {
            label: 'For Retention',
            description: 'Provider was paying before but has cancelled services; however, they are still being kept in the system for potential future re-engagement.',
        },
        'On Hold': {
            label: 'On Hold',
            description: 'For existing patients only, to offboard',
        },
        'Is Not Paying': {
            label: 'Is Not Paying',
            description: 'Fully offboarded',
        },
    };
}

export default MapFilterResultsSidebar;
