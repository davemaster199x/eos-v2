import React from 'react';

type Props = {
    variant?: 'ping' | 'spinner';
};

const Loader = ({ variant = 'spinner' }: Props) => {
    return (
        <div className="w-full h-[80vh] flex items-center justify-center">
            {variant === 'spinner' ? ( // <span className="animate-spin border-4 border-success border-l-transparent rounded-full w-12 h-12 inline-block align-middle m-auto mb-10"></span>
                <div className="spinner">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            ) : (
                <span className="w-5 h-5 m-auto mb-10">
                    <span className="animate-ping inline-flex h-full w-full rounded-full bg-info"></span>
                </span>
            )}
        </div>
    );
};

export default Loader;
