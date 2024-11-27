import React from 'react';
import Tippy from '@tippyjs/react';
import { cn } from '../utils/util';
import { FilePreviewModal } from './FilePreviewModal';

interface FileInfo {
    download_url: string;
    last_modified: number;
    mime_type: string | false;
    name: string;
    preview_url: string | null;
    size: number;
}

interface FilePreviewWithTooltipProps {
    fileUrl: string | FileInfo | (string | FileInfo)[];
    tooltipContent?: string;
    className?: string;
    renderItem?: (file: string | FileInfo) => React.ReactNode;
}

const FilePreviewWithTooltip: React.FC<FilePreviewWithTooltipProps> = ({ fileUrl, tooltipContent, className = '', renderItem }) => {
    if (!fileUrl) return null;
    const isFileInfo = (file: any): file is FileInfo => {
        return typeof file === 'object' && 'download_url' in file;
    };

    const defaultRender = (file: string | FileInfo) => {
        const fileName = isFileInfo(file) ? file.name : file;
        const fileUrl = isFileInfo(file) ? file.download_url : file;
        return <FilePreviewModal label={fileName || 'No File'} fileOrUrl={fileUrl} className={cn('text-ellipsis truncate max-w-[150px] text-red-500 hover:text-red-700', className)} />;
    };

    const renderFiles = () => {
        const files = Array.isArray(fileUrl) ? fileUrl : [fileUrl];
        if (!files.length) return 'No Files';
        return files.map((file, index) => (
            <React.Fragment key={index}>
                {renderItem ? renderItem(file) : defaultRender(file)}
                {index < files.length - 1 && <span className="mx-1">,</span>}
            </React.Fragment>
        ));
    };

    const getTooltipContent = () => {
        const files = Array.isArray(fileUrl) ? fileUrl : [fileUrl];
        if (files.length === 0) return 'No Files';
        return files.map((file) => (isFileInfo(file) ? file.name : file)).join(', ');
    };

    return (
        <div className="flex justify-start items-start flex-col gap-1">
            <Tippy content={tooltipContent || getTooltipContent()}>
                <div className="flex items-center gap-2 flex-wrap">{renderFiles()}</div>
            </Tippy>
        </div>
    );
};

export default FilePreviewWithTooltip;
