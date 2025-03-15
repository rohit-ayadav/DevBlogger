import { useState, useEffect } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { FaUserCircle } from 'react-icons/fa';
import { CldImage } from 'next-cloudinary';
import { cleanMarkdown, isValidUrl } from '@/lib/common-function';
import { UserType } from '@/types/blogs-types';
import Link from 'next/link';
import React from 'react';


const UserAvatar = ({
    user,
    isDarkMode
}: {
    user: UserType | undefined;
    isDarkMode: boolean;
}) => {
    const [imageError, setImageError] = useState(false);
    const [cldImageError, setCldImageError] = useState(false);


    useEffect(() => {
        if (user?.image) {
            setImageError(false);
            setCldImageError(false);
        }
    }, [user?.image]);


    const getImageSource = () => {
        if (!user?.image || imageError) {
            return null;
        }

        if (isValidUrl(user.image)) {
            return user.image;
        }


        return cldImageError ? null : null;
    };

    return (
        <Link href={`/author/${user?.username ? user.username : user?._id}`} className="flex items-center space-x-3 w-full sm:w-auto">

            <div className="flex items-center space-x-3 w-full sm:w-auto">
                <Avatar className={`
                w-10 h-10 ring-2 ring-offset-2 overflow-hidden
                ${isDarkMode ? 'ring-blue-900' : 'ring-blue-100'}
            `}>
                    {/* Case 1: Regular URL image */}
                    {user?.image && isValidUrl(user.image) && !imageError && (
                        <>
                            <AvatarImage
                                src={user.image}
                                alt={user?.name || 'User'}
                                className="object-cover"
                                onError={() => setImageError(true)}
                            />
                            <AvatarFallback>
                                <FaUserCircle className="w-full h-full text-gray-400" />
                            </AvatarFallback>
                        </>
                    )}

                    {/* Case 2: Cloudinary image */}
                    {user?.image && !isValidUrl(user.image) && !cldImageError && (
                        <div className="w-full h-full">
                            <CldImage
                                src={user.image}
                                alt={user?.name || 'User'}
                                width={40}
                                height={40}
                                className="w-full h-full object-cover"
                                onError={() => setCldImageError(true)}
                            />
                        </div>
                    )}
                </Avatar>

                <div className="flex flex-col">
                    <span className={`
                    text-sm font-semibold
                    ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}
                `}>
                        {user?.name || 'Anonymous'}
                    </span>
                    <span className={`
                    text-xs
                    ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}
                `}>
                        {user?.bio && cleanMarkdown(user?.bio).split("\n")[0].slice(0, 30) || 'No bio available'}
                        {/* {cleanMarkdown(user?.bio).split("\n")[0].slice(0, 30) || 'No bio available'} */}
                        {/* {user?.bio?.slice(0, 30) || 'No bio available'} */}
                        {/* {user?.bio && user.bio.length > 30 ? '...' : ''} */}
                        {user?.bio && cleanMarkdown(user?.bio).split("\n")[0].length > 30 ? '...' : ''}
                        {/* {cleanMarkdown(user?.bio).split("\n")[0].length > 30 ? '...' : ''} */}
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default UserAvatar;