import React, { useState } from 'react';
import { Copy, CheckSquare } from 'solar-icon-set';

const CopyToClipboardIcon = ({ text, className = '' }) => {
    const [isCopied, setIsCopied] = useState(false);

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    return (
        <button
            onClick={copyToClipboard}
            className={`px-1 py-1 flex items-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background
        ${isCopied ? 'text-green-500 bg-green-100' : 'text-gray-500 hover:bg-gray-100'}
        ${className}`}
            disabled={isCopied}
            title={isCopied ? 'Copied!' : 'Copy to clipboard'}
        >
            {isCopied ? <CheckSquare size={12} /> : <Copy size={12} />}
        </button>
    );
};

export default CopyToClipboardIcon;
