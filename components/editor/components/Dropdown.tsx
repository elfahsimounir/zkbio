import React, { useState, useRef, useEffect } from 'react';
import Button from './ui/Button';
type DropdownProps = {
    title: string | React.ReactNode;
    children: React.ReactNode;
    width?:string
};

const Dropdown = (props:DropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef:any = useRef(null);

    const handleBlur = (event: React.FocusEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.relatedTarget)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event:any) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative inline-block text-left" ref={dropdownRef} onBlur={handleBlur}>
            <Button
                onClick={() => setIsOpen(!isOpen)}
                disabled={false}
            >
                {props.title}
            </Button>
            {isOpen && (
                <div className={`origin-top-right absolute top-0  right-0 translate-y-[50%] rounded-md shadow-lg bg-white border  ${props.width?props.width:'w-24'}`}>
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        {props.children}
                    </div>
                </div>
            )}
        </div>  
    );
};

export default Dropdown;