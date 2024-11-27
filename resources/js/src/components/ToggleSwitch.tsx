import React from 'react';

const ToggleSwitch = ({ name, checked, onChange, disabled = false }: { name?: string; checked?: boolean; onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; disabled?: boolean }) => {
    return (
        <label className="inline-flex items-center cursor-pointer mb-0">
            <input type="checkbox" name={name} checked={checked} onChange={onChange} disabled={disabled} className="sr-only peer" />
            <div className="relative w-8 h-4 bg-gray-200 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[1.9px] after:start-[3px]  after:h-3 after:w-[13px]  after:bg-white after:border-gray-300 after:border after:rounded-full after:transition-all peer-checked:bg-[#4169e1]"></div>
        </label>
    );
};

export default ToggleSwitch;
