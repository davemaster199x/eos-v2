import React from 'react';
import Tippy from '@tippyjs/react';
import { formatFileSize } from '../utils/util';

export const FileInfo: React.FC<{ file: FileOrInfo }> = ({ file }) => {
    const fileName = typeof file === 'string' ? file : (file as FileInfo).name || (file as File).name;
    const fileType = typeof file === 'string' ? '' : (file as FileInfo).mime_type || (file as File).type;
    const fileSize = typeof file === 'string' ? '' : (file as FileInfo).size || (file as File).size;

    return (
        <div className=" min-w-0">
            {fileName && (
                <Tippy content={fileName}>
                    <p className="m-0 text-sm font-medium truncate">{fileName}</p>
                </Tippy>
            )}
            <div className="flex gap-2 items-center text-xs text-gray-500">
                {fileType && <p className="flex-shrink-0">{fileType}</p>}
                {fileSize && <p className="flex-shrink-0">{typeof fileSize === 'number' ? formatFileSize(fileSize) : fileSize}</p>}
            </div>
        </div>
    );
};
