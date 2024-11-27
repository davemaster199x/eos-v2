import React, { useEffect, useRef, useState } from 'react';
import { cn, formatFileSize } from '../utils/util';
import { Modal } from './Modal.tsx';

/**
 * Renders a file upload component with the ability to handle file selection, file removal,
 * and file size validation. It also renders a list of selected files with their information
 * and actions.
 *
 * @param {React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
 *     onFileChange?: (files: File[]) => void;
 *     maxSizeInMB?: number;
 * }} props - The component props.
 *
 * NOTE: Use the `onFileChange` prop to handle file selection.
 * @param {Function} [props.onFileChange] - The callback function to handle file selection.
 * @param {number} [props.maxSizeInMB] - The maximum file size in megabytes.
 * @return {JSX.Element} The rendered file upload component.
 *
 */
export const FileUpload = (
    props: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
        onFileChange?: (files: File[]) => void;
        maxSizeInMB?: number;
    }
) => {
    const [files, setFiles] = React.useState<File[]>([]);
    const [isDragging, setIsDragging] = React.useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    // errors
    const [errors, setErrors] = React.useState<string[]>([]);

    useEffect(() => {
        if (props.onFileChange) {
            props.onFileChange(files);
        }
    }, [files]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLLabelElement>) => {
        let selectedFiles;
        if (e.type === 'drop') {
            e.preventDefault();
            selectedFiles = (e as React.DragEvent<HTMLLabelElement>).dataTransfer?.files;
            setIsDragging(false);
        } else {
            selectedFiles = (e as React.ChangeEvent<HTMLInputElement>).target.files;
        }

        const maxSizeInBytes = (props.maxSizeInMB || 10) * 1024 * 1024; // Default to 10MB if not specified

        if (selectedFiles) {
            for (let file of Array.from(selectedFiles) as File[]) {
                if (file.size > maxSizeInBytes) {
                    setErrors((prev) => [...prev, `The file ${file.name} exceeds the maximum size limit of ${props.maxSizeInMB || 10}MB.`]);
                    return;
                }
            }

            setErrors([]);
            setFiles((prevFiles) => {
                const newFiles = Array.from(selectedFiles) as File[];

                // Multiple file upload
                if (props.multiple) {
                    // props.onFileChange?.([...prevFiles, ...newFiles]);
                    return [...prevFiles, ...newFiles];
                }

                // Single file upload
                // props.onFileChange?.(newFiles);

                return newFiles;
            });
        }
    };

    const handleFileRemove = (fileToRemove: File) => {
        setFiles((prevFiles) => prevFiles.filter((file) => file !== fileToRemove));
        fileInputRef.current!.value = '';
    };

    const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
        handleFileChange(e);
    };

    const renderFileList = () => {
        return files.map((file, index) => (
            <div key={index} className="flex items-center justify-between px-4 py-2 border rounded-md w-full">
                <div className="flex justify-center items-center gap-2 w-full">
                    <FileIcon />
                    <div className="flex items-center justify-between w-full gap-2">
                        <FileInfo file={file} />
                        <FileActions file={file} onRemove={handleFileRemove} />
                    </div>
                </div>
            </div>
        ));
    };

    const renderErrors = () => {
        return errors.map((error, index) => (
            <div key={index} className="flex items-center justify-between px-4 py-2 border border-red-300 rounded-md w-full">
                <div className="flex justify-center items-center gap-2 w-full">
                    <ErrorIcon />
                    <p className="text-red-500">{error}</p>
                </div>
            </div>
        ));
    };

    return (
        <div className="flex flex-col items-start justify-center w-full">
            <label
                htmlFor={props.name}
                className={cn(
                    `form-input border-dashed cursor-pointer hover:bg-gray-50 dark:hover:bg-primary-dark-light/10 ${isDragging ? 'bg-gray-50 dark:bg-primary-dark-light/10' : ''}`,
                    props.className
                )}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <UploadInstructions multiple={props.multiple} maxSizeInMB={props.maxSizeInMB} />
                <input type="file" id={props.name} name={props.name} multiple={props.multiple} className={cn('hidden', props.className)} onChange={handleFileChange} ref={fileInputRef} />
            </label>
            {files.length ? <div className="flex flex-col items-start justify-start gap-3 w-full mt-4">{renderFileList()}</div> : null}
            {errors.length ? <div className="flex flex-col items-start justify-start gap-3 w-full mt-4">{renderErrors()}</div> : null}
        </div>
    );
};

const ErrorIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            opacity="0.5"
            d="M22 14V11.7979C22 9.16554 22 7.84935 21.2305 6.99383C21.1598 6.91514 21.0849 6.84024 21.0062 6.76946C20.1506 6 18.8345 6 16.2021 6H15.8284C14.6747 6 14.0979 6 13.5604 5.84678C13.2651 5.7626 12.9804 5.64471 12.7121 5.49543C12.2237 5.22367 11.8158 4.81578 11 4L10.4497 3.44975C10.1763 3.17633 10.0396 3.03961 9.89594 2.92051C9.27652 2.40704 8.51665 2.09229 7.71557 2.01738C7.52976 2 7.33642 2 6.94975 2C6.06722 2 5.62595 2 5.25839 2.06935C3.64031 2.37464 2.37464 3.64031 2.06935 5.25839C2 5.62595 2 6.06722 2 6.94975V14C2 17.7712 2 19.6569 3.17157 20.8284C4.34315 22 6.22876 22 10 22H14C17.7712 22 19.6569 22 20.8284 20.8284C22 19.6569 22 17.7712 22 14Z"
            fill=" #ef4444"
        />
        <path
            d="M9.96967 11.4697C10.2626 11.1768 10.7374 11.1768 11.0303 11.4697L12 12.4393L12.9697 11.4697C13.2626 11.1768 13.7374 11.1768 14.0303 11.4697C14.3232 11.7626 14.3232 12.2374 14.0303 12.5303L13.0607 13.5L14.0303 14.4697C14.3232 14.7626 14.3232 15.2374 14.0303 15.5303C13.7374 15.8232 13.2626 15.8232 12.9697 15.5303L12 14.5607L11.0303 15.5303C10.7374 15.8232 10.2626 15.8232 9.96967 15.5303C9.67678 15.2374 9.67678 14.7626 9.96967 14.4697L10.9393 13.5L9.96967 12.5303C9.67678 12.2374 9.67678 11.7626 9.96967 11.4697Z"
            fill=" #ef4444"
        />
    </svg>
);

const FileIcon = () => (
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

const FileInfo = ({ file }: { file: File }) => (
    <div>
        <label className="m-0">{file.name}</label>
        <div className="flex gap-2 items-center">
            <p className="text-xs">{file.type}</p>
            <p className="text-xs">{formatFileSize(file.size)}</p>
        </div>
    </div>
);

const FileActions = ({ file, onRemove }: { file: File; onRemove: (file: File) => void }) => (
    <div className="flex gap-2">
        <FilePreviewModal file={file} />
        <button type="button" className="text-red-500 hover:text-red-700" onClick={() => onRemove(file)}>
            Remove
        </button>
    </div>
);

const UploadInstructions = ({ multiple, maxSizeInMB }: { multiple?: boolean; maxSizeInMB?: number }) => (
    <div className="flex flex-col items-center justify-center pt-5 pb-6">
        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
        </svg>
        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and drop
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
            Any {multiple ? 'files' : 'file'} up to {maxSizeInMB || 10} MB
        </p>
    </div>
);

const FilePreviewModal = ({ file }: { file: File }) => {
    const [fileUrl, setFileUrl] = useState<string | null>(null);

    useEffect(() => {
        return () => {
            if (fileUrl) {
                URL.revokeObjectURL(fileUrl); // Clean up the Blob URL when the component unmounts
            }
        };
    }, [fileUrl]);

    const onPreview = (file: File) => {
        if (file.type === 'application/pdf' || file.type.startsWith('image/') || file.type.startsWith('text/')) {
            const url = URL.createObjectURL(file);
            setFileUrl(url);
        } else {
            setFileUrl(null); // Handle unsupported file types as needed
        }
    };

    return (
        <Modal
            title="Preview"
            trigger={
                <button type="button" className="text-blue-500 hover:text-blue-700">
                    Preview
                </button>
            }
            onOpen={() => onPreview(file)}
            modalClass="w-5xl max-w-5xl h-[90vh] max-h-[90vh]"
        >
            <div className="h-full">
                {fileUrl ? (
                    file.type === 'application/pdf' ? (
                        <iframe src={fileUrl} width="100%" height="100%" title="PDF Preview" style={{ border: 'none' }}></iframe>
                    ) : file.type.startsWith('image/') ? (
                        <img src={fileUrl} alt="Preview" className="max-w-full h-auto" />
                    ) : file.type.startsWith('text/') ? (
                        <pre className="whitespace-pre-wrap">{fileUrl}</pre>
                    ) : (
                        <p>No preview available for this file type.</p>
                    )
                ) : (
                    <p>No preview available.</p>
                )}
            </div>
        </Modal>
    );
};
