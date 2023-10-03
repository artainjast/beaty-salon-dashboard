import React, { CSSProperties } from 'react';
import { IconNameType } from './IconNameType';
import { SimpleFunction } from '@/types';

interface Props {
    name: IconNameType;
    size?: string | number;
    style?: CSSProperties;
    className?: string;
    onClick?: SimpleFunction
}

export function Icon ({name , className , size , style , onClick} : Props) {
    const componentClassName = `icon ${name} ${className}`
    return (
        <i onClick={onClick} className={componentClassName} style={{ fontSize: `${size}px`, ...(style || {}) }}>
        </i>
    );
};
