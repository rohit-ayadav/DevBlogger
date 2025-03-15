import React from 'react';
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { UserType } from './types';
import { Calendar, Instagram, Link, Pencil } from 'lucide-react';
import { Facebook, GitHub, Linkedin, Twitter } from 'react-feather';
import { formatRelativeTime } from '@/utils/date-formatter';
import { saveEdit } from '@/action/my-profile-action';
import { CldImage } from 'next-cloudinary';
import { useTheme } from '@/context/ThemeContext';
import { useToast } from '@/hooks/use-toast';
import { cleanMarkdown } from '@/lib/common-function';

interface ProfileCardProps {
    userData: UserType;
    editMode: boolean;
    setEditMode: (editMode: boolean) => void;
}
const VALID_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
const MAX_FILE_SIZE = 2 * 1024 * 1024;

export const ProfileCard = ({ userData, editMode, setEditMode }: ProfileCardProps) => {
    const joinDate = formatRelativeTime(userData.createdAt);
    const length = 0;
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const { isDarkMode } = useTheme();
    const { toast } = useToast();

    // Function to check if string is valid URL
    const isValidUrl = (string: string) => {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    };

    // Get appropriate avatar image based on userData.image
    const getAvatarImage = () => {
        if (!userData?.image) {
            return (<Avatar className="w-24 h-24 md:w-32 md:h-32 transition-all">

                <AvatarImage
                    src="/default-profile.jpg"
                    alt={userData?.name ?? 'User'}
                />
                <AvatarFallback className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    {userData?.name?.split(' ').map(n => n[0]).join('') ?? 'U'}
                </AvatarFallback></Avatar>
            );
        }

        if (isValidUrl(userData.image)) {
            return (
                <Avatar className="w-24 h-24 md:w-32 md:h-32 transition-all">
                    <AvatarImage
                        src={userData.image}
                        alt={userData?.name ?? 'User'}
                    />
                    <AvatarFallback className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                        {userData?.name?.split(' ').map(n => n[0]).join('') ?? 'U'}
                    </AvatarFallback></Avatar>
            );
        } else {
            // It's a Cloudinary public ID
            return (
                <Avatar className="w-24 h-24 md:w-32 md:h-32 transition-all">
                    <CldImage
                        src={`/${userData.image}`}
                        width={128}
                        height={128}
                        alt={userData?.name ?? 'User'}
                        className="w-full h-full object-cover rounded-full"
                    />
                </Avatar>
            );
        }
    };

    const triggerFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const validateImage = (file: File): string | null => {
        if (!file) return "No file selected";

        if (!VALID_IMAGE_TYPES.includes(file.type)) {
            return "Invalid file type. Please upload a JPEG, PNG, GIF, or WebP image.";
        }

        if (file.size > MAX_FILE_SIZE) {
            return `File too large. Maximum size is ${MAX_FILE_SIZE / (1024 * 1024)}MB.`;
        }

        return null;
    };

    const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // Validate the image file
        const validationError = validateImage(file);
        if (validationError) {
            setError(validationError);
            toast({
                title: "Error",
                description: validationError,
                variant: "destructive"
            });
            return;
        }

        setLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append("image", file);
        const publicId = userData.image;

        try {
            const response = await fetch("/api/uploadimages", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Failed to upload image");
            }

            const data = await response.json();

            // Save the public_id to the user data
            await saveEdit({
                ...userData,
                image: data.public_id
            });

            toast({
                title: "Success",
                description: "Profile picture updated successfully",
                variant: "default"
            });
            setEditMode(false);
            setError(null);
            if (isValidUrl(publicId)) {
                // Remove the old image from Cloudinary
                await fetch(`/api/uploadimages`, {
                    method: "DELETE",
                    body: JSON.stringify({ publicId }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

            }

        } catch (error: any) {
            console.error("Error uploading image:", error);
            const errorMsg = error.message || "Something went wrong.";
            setError(errorMsg);
            toast({
                title: "Error",
                description: errorMsg,
                variant: "destructive"
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className={`${isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white'}`}>
            <CardHeader>
                <div className="flex flex-col items-center">
                    <div className="relative">
                        {getAvatarImage()}

                        {editMode && (
                            <div
                                className={`
                                    absolute bottom-0 right-0 
                                    p-1 md:p-2 
                                    rounded-full 
                                    cursor-pointer 
                                    transition-colors 
                                    ${loading ? 'opacity-50 cursor-not-allowed' : ''} 
                                    ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700 text-gray-100 shadow-md' : 'bg-primary hover:bg-primary/80 text-white'}
                                `}
                                onClick={!loading ? triggerFileInput : undefined}
                                aria-label="Change profile picture"
                            >
                                <Pencil className="w-3 h-3 md:w-4 md:h-4" />
                            </div>
                        )}

                        {/* Hidden file input */}
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleUpload}
                            accept={VALID_IMAGE_TYPES.join(',')}
                            className="hidden"
                            disabled={loading}
                        />
                    </div>

                    {/* Loading and error states */}
                    {loading && (
                        <p className={`text-sm mt-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                            Uploading image...
                        </p>
                    )}
                    {error && (
                        <p className="text-sm text-red-500 mt-2">{error}</p>
                    )}

                    <CardTitle className="mt-4 text-xl md:text-2xl font-bold">
                        {userData?.name}
                    </CardTitle>
                    <CardDescription className={`text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                        @{userData?.username}
                    </CardDescription>

                    {userData?.bio && (
                        <span className={`mt-2 text-center text-sm max-w-md ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            {/* {userData.bio} */}
                            {/* {userData.bio.split('\n')[0]} */}
                            {cleanMarkdown(userData.bio).split("\n")[0]}
                        </span>
                    )}

                    <div className={`mt-4 flex items-center gap-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                        <Calendar className="w-4 h-4" />
                        <span>Joined {joinDate}</span>
                    </div>

                    {userData?.website && (
                        <div className={`mt-2 flex items-center gap-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                            <Link className="w-4 h-4" />
                            <a
                                href={userData.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`hover:underline ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}
                            >
                                {userData.website}
                            </a>
                        </div>
                    )}
                </div>
            </CardHeader>

            <CardContent>
                <div className="grid grid-cols-3 gap-2 md:gap-4 text-center">
                    <div className={`p-2 md:p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                        <p className="text-xl md:text-2xl font-bold">{userData?.follower ?? 0}</p>
                        <p className={`text-xs md:text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>Followers</p>
                    </div>
                    <div className={`p-2 md:p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                        <p className="text-xl md:text-2xl font-bold">{userData?.following ?? 0}</p>
                        <p className={`text-xs md:text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>Following</p>
                    </div>
                    <div className={`p-2 md:p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                        <p className="text-xl md:text-2xl font-bold">{length}</p>
                        <p className={`text-xs md:text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>Blogs</p>
                    </div>
                </div>
                <div>
                    {/* User Social Links */}
                    {userData?.socialLinks && (
                        <div className="mt-4 flex flex-wrap justify-center items-center gap-4">
                            {userData.socialLinks.linkedin && (
                                <a
                                    href={userData.socialLinks.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}
                                    aria-label="LinkedIn Profile"
                                >
                                    <Linkedin className="w-5 h-5" />
                                </a>
                            )}
                            {userData.socialLinks.github && (
                                <a
                                    href={userData.socialLinks.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black'}`}
                                    aria-label="GitHub Profile"
                                >
                                    <GitHub className="w-5 h-5" />
                                </a>
                            )}
                            {userData.socialLinks.twitter && (
                                <a
                                    href={userData.socialLinks.twitter}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}
                                    aria-label="Twitter Profile"
                                >
                                    <Twitter className="w-5 h-5" />
                                </a>
                            )}
                            {userData.socialLinks.instagram && (
                                <a
                                    href={userData.socialLinks.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`${isDarkMode ? 'text-pink-400 hover:text-pink-300' : 'text-pink-600 hover:text-pink-800'}`}
                                    aria-label="Instagram Profile"
                                >
                                    <Instagram className="w-5 h-5" />
                                </a>
                            )}
                            {userData.socialLinks.facebook && (
                                <a
                                    href={userData.socialLinks.facebook}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}
                                    aria-label="Facebook Profile"
                                >
                                    <Facebook className="w-5 h-5" />
                                </a>
                            )}
                        </div>
                    )}
                </div>
            </CardContent>

            <CardFooter>
                <Button
                    className="w-full"
                    onClick={() => setEditMode(true)}
                    variant={isDarkMode ? "ghost" : "default"}
                >
                    Edit Profile
                </Button>
            </CardFooter>
        </Card>
    );
};