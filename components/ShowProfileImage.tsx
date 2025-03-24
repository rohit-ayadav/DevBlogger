"use client";

import { isValidUrl } from '@/lib/common-function';
import React, { useState, useEffect } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { CldImage } from 'next-cloudinary';

type ShowProfileImageProps = {
    src?: string;
    className?: string;
    style?: React.CSSProperties;
    size?: number;
};

const ShowProfileImage = ({
    src,
    className = "w-12 h-12",
    style,
    size = 100
}: ShowProfileImageProps) => {
    const [imageType, setImageType] = useState<'url' | 'cloudinary' | 'default'>('default');
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        if (!src) {
            setImageType('default');
        } else if (isValidUrl(src)) {
            setImageType('url');
        } else {
            setImageType('cloudinary');
        }

        setHasError(false);
        setIsLoading(true);
    }, [src]);

    const handleImageError = () => {
        setHasError(true);
        setIsLoading(false);
    };

    const handleImageLoad = () => {
        setIsLoading(false);
    };

    return (
        <Avatar className={className}>
            {imageType === 'url' && !hasError && (
                <AvatarImage
                    src={src}
                    alt="Profile Image"
                    style={style}
                    onError={handleImageError}
                    onLoad={handleImageLoad}
                />
            )}

            {imageType === 'cloudinary' && !hasError && (
                <CldImage
                    src={src || ''}
                    alt="Profile Image"
                    width={size}
                    height={size}
                    crop="fill"
                    gravity="face"
                    quality={90}
                    loading="lazy"
                    onError={handleImageError}
                    onLoad={handleImageLoad}
                    className="w-full h-full object-cover rounded-full"
                />
            )}
            {imageType === 'default' && !hasError && (
                <AvatarImage
                    src="/default-profile.jpg"
                    alt="Default Profile"
                    style={style}
                    onError={handleImageError}
                    onLoad={handleImageLoad}
                />
            )}

            <AvatarFallback className="bg-muted">
                <img
                    src="/default-profile.jpg"
                    alt="Default Profile"
                    className="w-full h-full object-cover"
                />
            </AvatarFallback>
        </Avatar>
    );
};

export default ShowProfileImage;