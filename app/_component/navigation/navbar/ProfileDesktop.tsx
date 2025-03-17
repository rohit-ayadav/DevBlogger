import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Terminal } from 'lucide-react';
import { CldImage } from 'next-cloudinary';
import { isValidUrl } from '@/lib/common-function';
import { UserType } from '@/types/blogs-types';

const DesktopNavProfile = ({ user }: { user: UserType | null }) => {
    const [imageError, setImageError] = useState(false);
    const [cldImageError, setCldImageError] = useState(false);

    // Reset error states when user changes
    useEffect(() => {
        if (user) {
            setImageError(false);
            setCldImageError(false);
        }
    }, [user]);

    // Loading state - matched dimensions and styling with actual button
    // if (!user) {
    //     return (
    //         <div className="relative flex items-center">
    //             <div className="flex items-center space-x-3 px-4 py-2 rounded-lg 
    //                  bg-gradient-to-r from-indigo-500/30 to-purple-600/30 
    //                  shadow-md">
    //                 <div className="w-8 h-8 rounded-full border-2 border-white/50 animate-pulse bg-white/20"></div>
    //                 <div className="h-5 w-24 bg-white/20 animate-pulse rounded"></div>
    //             </div>
    //         </div>
    //     );
    // }

    // Render profile or login button
    return (
        <>
            {user ? (
                <div className="relative flex items-center">
                    <Link href="/profile">
                        <button className="flex items-center space-x-3 px-4 py-2 rounded-lg
                        bg-gradient-to-r from-indigo-500 to-purple-600 text-white
                        hover:from-indigo-600 hover:to-purple-700 transition-all duration-300
                        shadow-md hover:shadow-lg">
                            {user.image ? (
                                isValidUrl(user.image) && !imageError ? (
                                    <img
                                        src={user.image}
                                        alt="Profile"
                                        className="w-8 h-8 rounded-full border-2 border-white/50 object-cover"
                                        onError={() => setImageError(true)}
                                    />
                                ) : !cldImageError ? (
                                    <CldImage
                                        src={user.image}
                                        alt="Profile"
                                        width={32}
                                        height={32}
                                        className="w-8 h-8 rounded-full border-2 border-white/50 object-cover"
                                        onError={() => setCldImageError(true)}
                                    />
                                ) : (
                                    <img
                                        src="/default-profile.jpg"
                                        alt="Default Profile"
                                        className="w-8 h-8 rounded-full border-2 border-white/50 object-cover"
                                    />
                                )
                            ) : (
                                <img
                                    src="/default-profile.jpg"
                                    alt="Default Profile"
                                    className="w-8 h-8 rounded-full border-2 border-white/50 object-cover"
                                />
                            )}
                            <span className="font-medium">{user.name}</span>
                        </button>
                    </Link>
                </div>
            ) : (
                <Link
                    href="/login"
                    className="px-6 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600
                    text-white hover:from-indigo-600 hover:to-purple-700 transition-all duration-300
                    shadow-md hover:shadow-lg font-medium flex items-center gap-2"
                >
                    <Terminal size={18} />
                    Get Started
                </Link>
            )}
        </>
    );
};

export default DesktopNavProfile;