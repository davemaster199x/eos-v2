import React from 'react';
import { FilePreviewModal } from './FilePreviewModal';

interface FileActionsProps {
    file: FileOrInfo;
    hasRemoveButton?: boolean;
    onRemove?: (file: FileOrInfo) => void;
}

export const FileActions: React.FC<FileActionsProps> = ({ file, onRemove, hasRemoveButton = true }) => {
    return (
        <div className="flex gap-1 items-center">
            <FilePreviewModal fileOrUrl={file} />
            {hasRemoveButton && (
                <button type="button" className="text-red-500 hover:text-red-700 btn-sm" onClick={() => onRemove(file)}>
                    Remove
                </button>
            )}
        </div>
    );
};
