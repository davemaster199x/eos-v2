import React, { useEffect, useRef, useState } from 'react';
import { cn } from '../utils/util';
import { UploadInstructions } from './UploadInstructions';
import { FileListItem } from './FileListItem';
import { ErrorIcon } from './Icons';

export const FileUpload: React.FC<FileUploadProps> = (props) => {
    const [files, setFiles] = useState<FileOrInfo[]>(props.multiple && Array.isArray(props.value) ? props.value : props.value ? ([props.value] as FileOrInfo[]) : []);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [errors, setErrors] = useState<string[]>([]);
    useEffect(() => {
        if (props.multiple && Array.isArray(props.value)) {
            if (!props.value?.length) {
                setFiles([]);
                if (fileInputRef.current) fileInputRef.current.value = '';
            }
        }
    }, [props.value?.length > 0]);

    useEffect(() => {
        if (!props.multiple && !Array.isArray(props.value)) {
            if (!props.value) {
                setFiles([]);
                if (fileInputRef.current) fileInputRef.current.value = '';
            }
        }
    }, [props.value]);

    useEffect(() => {
        if (props.onFileChange) {
            props.onFileChange(files);
        }
    }, [files]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLLabelElement>) => {
        let selectedFiles: FileList | null = null;
        if (e.type === 'drop') {
            e.preventDefault();
            selectedFiles = (e as React.DragEvent<HTMLLabelElement>).dataTransfer?.files;
            setIsDragging(false);
        } else {
            selectedFiles = (e.target as HTMLInputElement).files;
        }

        const maxSizeInBytes = (props.maxSizeInMB || 10) * 1024 * 1024;

        if (selectedFiles) {
            const newErrors: string[] = [];
            const newFiles: File[] = [];

            Array.from(selectedFiles).forEach((file) => {
                if (file.size > maxSizeInBytes) {
                    newErrors.push(`The file ${file.name} exceeds the maximum size limit of ${props.maxSizeInMB || 10}MB.`);
                } else {
                    newFiles.push(file);
                }
            });

            setErrors(newErrors);

            if (newFiles.length > 0) {
                setFiles((prevFiles) => (props.multiple ? [...prevFiles, ...newFiles] : newFiles));
            }
        }

        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleFileRemove = (fileToRemove: FileOrInfo) => {
        setFiles((prevFiles) => prevFiles.filter((file) => file !== fileToRemove));
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
            {files.length > 0 && (
                <div className="flex flex-col items-start justify-start gap-3 w-full mt-4">
                    {files.map((file, index) => (
                        <FileListItem key={index} index={index} file={file} handleFileRemove={handleFileRemove} />
                    ))}
                </div>
            )}
            {errors.length > 0 && (
                <div className="flex flex-col items-start justify-start gap-3 w-full mt-4">
                    {errors.map((error, index) => (
                        <div key={index} className="flex items-center justify-between px-4 py-2 border border-red-300 rounded-md w-full">
                            <div className="flex justify-center items-center gap-2 w-full">
                                <ErrorIcon />
                                <p className="text-red-500">{error}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
