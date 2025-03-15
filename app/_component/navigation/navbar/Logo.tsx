import { isValidUrl } from '@/lib/common-function';
import { UserType } from '@/types/blogs-types';
import { useSession } from 'next-auth/react';
import { CldImage } from 'next-cloudinary';
import { useState } from 'react';

const ProfileDisplay = ({ user }: { user: UserType | null }) => {
    const [imageError, setImageError] = useState(false);
    const [cldImageError, setCldImageError] = useState(false);

    if (!user) {
        return (
            <div className="flex items-center space-x-3 px-3 py-2">
                <div className="w-10 h-10 rounded-full border-2 border-indigo-500 animate-pulse bg-gray-200"></div>
                <div className="flex flex-col">
                    <div className="h-4 w-24 bg-gray-200 animate-pulse rounded"></div>
                    <div className="h-4 w-32 bg-gray-200 animate-pulse rounded mt-1"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center space-x-3 px-3 py-2">

            {user?.image ? (
                // Check if the image is a valid URL
                isValidUrl(user.image) ? (
                    // Case 1: Valid URL image (external image)
                    <img
                        src={user.image}
                        alt="Profile"
                        className="w-10 h-10 rounded-full border-2 border-indigo-500"
                        onError={() => setImageError(true)}
                    />
                ) : !cldImageError ? (
                    // Case 2: Cloudinary image (needs CldImage component)
                    <CldImage
                        src={user.image}
                        alt="Profile"
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full border-2 border-indigo-500"
                        onError={() => setCldImageError(true)}
                    />
                ) : (
                    // Fallback when Cloudinary image fails
                    <img
                        src="/default-profile.jpg"
                        alt="Profile"
                        className="w-10 h-10 rounded-full border-2 border-indigo-500"
                    />
                )
            ) : (
                // Case 3: Default fallback image when no user image exists or loading fails
                <img
                    src="/default-profile.jpg"
                    alt="Profile"
                    className="w-10 h-10 rounded-full border-2 border-indigo-500"
                />
            )}
            <div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                    {user?.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    {user?.email}
                </p>
            </div>
        </div>
    );
};

export default ProfileDisplay;