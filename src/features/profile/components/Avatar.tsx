import React from 'react';
import { AvatarProps } from '@/features/profile/types';
import Image from 'next/image';

export const Avatar: React.FC<AvatarProps> = ({
                                                  src,
                                                  alt,
                                                  size = 'md',
                                              }) => {

    const sizes = {
        sm: 'w-8 h-8',
        md: 'w-10 h-10',
        lg: 'w-12 h-12'
    };

    return (
        <div className="relative flex-shrink-0">
            <div className={`${sizes[size]} rounded-full overflow-hidden bg-gray-500`}>
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
