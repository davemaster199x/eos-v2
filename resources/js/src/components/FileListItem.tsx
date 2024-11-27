import React from 'react';
import { FileIcon } from './Icons';
import { FileInfo } from './FileInfo';
import { FileActions } from './FileActions';

interface FileListItemProps {
    file: FileOrInfo;
    index: number;
    handleFileRemove?: (file: FileOrInfo) => void;
    hasRemoveButton?: boolean;
}

export const FileListItem: React.FC<FileListItemProps> = ({ file, index, handleFileRemove, hasRemoveButton = true }) => {
    if (file === 'undefined') return null;

    return (
        <div key={index} className="flex items-center justify-between px-4 py-2 border rounded-md w-full">
            <div className="flex items-center gap-2 flex-grow overflow-hidden">
                <div className="flex-shrink-0">
                    <FileIcon />
                </div>
                <FileInfo file={file} />
            </div>
            <div className="flex-shrink-0 ml-2">
                <FileActions file={file} onRemove={handleFileRemove} hasRemoveButton={hasRemoveButton} />
            </div>
        </div>
    );
};
