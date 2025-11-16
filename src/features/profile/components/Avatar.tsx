import React from 'react';
import { AvatarProps } from '@/types';
import Image from 'next/image';

export const Avatar: React.FC<AvatarProps> = ({
                                                  src,
                                                  alt,
                                                  size = 'md',
                                                  verified = false
                                              }) => {

    const generateAvatarRandomColor = () => {
        const colors = ['bg-red-500', 'bg-green-500', 'bg-blue-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500', 'bg-indigo-500'];
        // eslint-disable-next-line react-hooks/purity
        return colors[Math.floor(Math.random() * colors.length)];
    }

    const sizes = {
        sm: 'w-8 h-8',
        md: 'w-10 h-10',
        lg: 'w-12 h-12'
    };

    return (
        <div className="relative flex-shrink-0">
            <div className={`${sizes[size]} rounded-full overflow-hidden ${generateAvatarRandomColor()}`}>
                {src ? (
                    <Image src={src} alt={alt} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#121212]">
                        {alt?.[0]?.toUpperCase()}
                    </div>
                )}
            </div>
        </div>
    );
};
