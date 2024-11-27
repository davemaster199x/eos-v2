import React, { ReactElement, useState } from 'react';
import ModalComponent from '../components/ModalComponent';

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: ReactElement;
    [key: string]: any; // For any additional props the ModalComponent might accept
};

type ModalComponent = (props: ModalProps) => ReactElement;

const useModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [modalContent, setModalContent] = useState<ReactElement | null>(null);
    const [ModalComponent, setModalComponent] = useState<ModalComponent | null>(null);
    const [modalSize, setModalSize] = useState('4xl');

    const openModal = (content: ReactElement, ModalComp: ModalComponent, modalSize = '4xl') => {
        setModalSize(modalSize);
        setModalContent(content);
        setModalComponent(() => ModalComp);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setModalContent(null);
        setModalComponent(null);
    };

    const ModalWrapper = () => {
        if (!isOpen || !ModalComponent || !modalContent) return null;

        return (
            <ModalComponent size={modalSize} isOpen={isOpen} onClose={closeModal}>
                {modalContent}
            </ModalComponent>
        );
    };

    return {
        isOpen,
        openModal,
        closeModal,
        ModalWrapper,
    };
};

export default useModal;
