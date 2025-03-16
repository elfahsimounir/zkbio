import { Check, ChevronDown } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';
import Button from './Button';

interface CustomSelectProps {
    options: { value: string; label: string,icon?:React.ReactNode }[];
    value?: string;
    onChange: (value: string) => void;
    placeholder?: string;
    label?: string | React.ReactNode;
    icon?: React.ReactNode;
    width?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ options, value, onChange, placeholder, label, icon, width }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(value);
    const selectRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSelect = (value: string) => {
        setSelectedValue(value);
        onChange(value);
        setIsOpen(false);
        console.log(value);
    };

    return (
        <div className="relative" ref={selectRef}>
            <div className='flex items-center gap-2'>
                {label &&
                    <label className="block text-sm text-gray-600 mb-1">
                        {label}
                    </label>}

                <Button
                    onClick={() => setIsOpen(!isOpen)}
                    disabled={false}
                    className={'w-full flex items-center border-gray-200 justify-between px-1'}
                >
                    <label>{icon}</label>
                    <span className='text-sm text-neutral-400 capitalize'> {value ? value.slice(0, 6) : selectedValue?selectedValue:'select'}</span>
                    <ChevronDown size={14} />
                </Button>
            </div>
            {isOpen && (
                <div className={`absolute z-10 p-1 mt-1 bg-white border rounded-md shadow-lg ${width ? width : 'w-full'}`}>
                    {options.map(option => (
                        <div
                            key={option.value}
                            className={`px-2 py-1 flex gap-2 items-center cursor-pointer hover:bg-gray-200 `}
                            onClick={() => handleSelect(option.value)}
                        >
                            <span>{option.icon}</span>
                            <span className='text-sm w-full '>
                                {option.label}
                            </span>
                            {value === option.value &&
                                <Check size={14} className='text-neutral-400' />
                            }
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CustomSelect;