import { Dialog, Transition } from '@headlessui/react';
import React, { useState, Fragment, cloneElement, ReactElement, useEffect } from 'react';
import { cn } from '../utils/util';

export const Modal = ({ title, trigger, children, onOpen, modalClass }: { title: string; trigger: ReactElement; children: React.ReactNode; onOpen?: () => void; modalClass?: string }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    useEffect(() => {
        if (isOpen && onOpen) {
            onOpen(); // Trigger the onOpen callback when the modal opens
        }
    }, [isOpen]);

    const handleTriggerClick = () => {
        setIsOpen((prev) => !prev); // Toggle the modal open state
    };

    return (
        <div>
            <div className="flex items-center justify-center">{cloneElement(trigger, { onClick: handleTriggerClick })}</div>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" open={isOpen} onClose={() => setIsOpen(false)}>
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0" />
                    </Transition.Child>
                    <div className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
                        <div className="flex items-center justify-center min-h-screen px-4">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel as="div" className={cn('panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg my-8 text-black dark:text-white-dark', modalClass)}>
                                    <div className="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between px-5 py-3">
                                        <h5 className="font-bold text-lg">{title}</h5>
                                        <button type="button" className="text-white-dark hover:text-dark" onClick={() => setIsOpen(false)}>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                                <line x1="6" y1="6" x2="18" y2="18"></line>
                                            </svg>
                                        </button>
                                    </div>
                                    <div className="p-5 h-full">{children}</div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};
