'use client'

import React, { useState } from 'react';
interface StarRatingProps {
    onChange?: (value: number) => void;
    initialValue?: number;
    color?: string;
    size?: number;
  }

function StarRating({ onChange, initialValue = 0, color = 'yellow', size = 6 }: StarRatingProps) {
    const [rating, setRating] = useState(initialValue);

    const handleStarClick = (index : number) => {
        const newRating = index + 1;
        setRating(newRating);
        if (onChange) {
            onChange(newRating); 
        }
    };

    return (
        <div className="flex items-center">
            {[...Array(5)].map((_, index) => {
                return (
                    <svg
                        key={index}
                        className={`w-${size} h-${size}`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill={index < rating ? color : 'gray'}
                        viewBox="0 0 22 20"
                        onClick={onChange ? () => handleStarClick(index) : undefined}
                        style={{ cursor: onChange ? 'pointer' : 'default' }}
                    >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                    </svg>
                );
            })}
        </div>
    );
}

export default StarRating;
