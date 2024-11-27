import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

const ModalComponent = ({ isOpen, onClose, children, size = 'md', enableClose = false }) => {
    const sizeClass = {
        sm: 'max-w-sm', // Small size
        md: 'max-w-md', // Medium size
        lg: 'max-w-lg', // Large size
        xl: 'max-w-xl', // Extra Large size
        '2xl': 'max-w-2xl', // 2 Extra Large size
        '3xl': 'max-w-3xl', // 3 Extra Large size
        '4xl': 'max-w-4xl', // 4 Extra Large size
        full: 'max-w-full', // Full width
    }[size];

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-[100]" onClose={onClose}>
                <Transition.Child as={Fragment} enter="duration-300 ease-out" enterFrom="opacity-0" enterTo="opacity-100" leave="duration-200 ease-in" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <div className="fixed inset-0 bg-black bg-opacity-50" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="duration-300 ease-out"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="duration-200 ease-in"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className={`w-full ${sizeClass} transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all`}>
                                {enableClose && (
                                    <button type="button" className="absolute z-10 top-4 right-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none" onClick={onClose}>
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
                                )}
                                <div>{children}</div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default ModalComponent;
