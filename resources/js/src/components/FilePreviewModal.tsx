import React, { useState } from 'react';
import { Modal } from './Modal';
import { cn, getFileType } from '../utils/util';

interface FilePreviewModalProps {
    fileOrUrl: FileOrInfo;
    label?: string;
    className?: string;
}

export const FilePreviewModal: React.FC<FilePreviewModalProps> = ({ fileOrUrl: fileOrUrlProps, label, className }) => {
    const [isOpen, setIsOpen] = useState(false);
    const fileOrUrl = fileOrUrlProps instanceof File || typeof fileOrUrlProps === 'string' ? fileOrUrlProps : fileOrUrlProps.download_url || fileOrUrlProps.preview_url || fileOrUrlProps;
    const fileType = getFileType(fileOrUrl);

    const renderPreview = () => {
        if (!fileOrUrl) return <p>No preview available.</p>;

        let url: string;
        if (typeof fileOrUrl === 'string') {
            url = fileOrUrl;
        } else if (fileOrUrl instanceof File) {
            url = URL.createObjectURL(fileOrUrl);
        } else {
            url = fileOrUrl.preview_url || fileOrUrl.download_url;
        }

        switch (true) {
            case fileType === 'application/pdf':
                return <iframe src={url} width="100%" height="100%" title="PDF Preview" style={{ border: 'none' }}></iframe>;
            case fileType.startsWith('image/'):
                return <img src={url} alt="Preview" className="max-w-full h-auto" />;
            case fileType === 'text/plain':
                return <pre className="whitespace-pre-wrap">{url}</pre>;
            default:
                return <p>No preview available for this file type.</p>;
        }
    };

    return (
        <Modal
            title="Preview"
            trigger={
                <button type="button" className={cn('text-blue-500 hover:text-blue-700 btn-sm', className)} onClick={() => setIsOpen(true)}>
                    {label || 'Preview'}
                </button>
            }
            onOpen={() => setIsOpen(true)}
            modalClass="w-5xl max-w-5xl h-[90vh] max-h-[90vh] overflow-auto"
        >
            <div className="h-full">{isOpen && renderPreview()}</div>
        </Modal>
    );
};
