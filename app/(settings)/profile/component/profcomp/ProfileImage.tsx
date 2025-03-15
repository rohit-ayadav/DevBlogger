import React, { useState, useRef } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Pencil } from 'lucide-react';
import { CldImage } from 'next-cloudinary';
import { useTheme } from '@/context/ThemeContext';
import { useToast } from '@/hooks/use-toast';
import { saveEdit } from '@/action/my-profile-action';
import { ImageCropper } from './ImageCropper';
import { UserType } from '@/types/blogs-types';
import { isValidUrl } from '@/lib/common-function';

interface ProfileImageProps {
    userData: UserType;
    editMode: boolean;
    setEditMode: (editMode: boolean) => void;
}

const VALID_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
const MAX_FILE_SIZE = 2 * 1024 * 1024;

export const ProfileImage = ({ userData, editMode, setEditMode }: ProfileImageProps) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showCropper, setShowCropper] = useState(false);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { isDarkMode } = useTheme();
    const { toast } = useToast();

    const getAvatarImage = () => {
        if (!userData?.image) {
            return (
                <Avatar className="w-24 h-24 md:w-32 md:h-32 transition-all">
                    <AvatarImage
                        src="/default-profile.jpg"
                        alt={userData?.name ?? 'User'}
                    />
                    <AvatarFallback className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                        {userData?.name?.split(' ').map(n => n[0]).join('') ?? 'U'}
                    </AvatarFallback>
                </Avatar>
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
                    </AvatarFallback>
                </Avatar>
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

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
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

        // Create a URL for the image
        const url = URL.createObjectURL(file);
        setImageUrl(url);
        setShowCropper(true);
    };

    const handleCancelCrop = () => {
        setShowCropper(false);
        if (imageUrl) {
            URL.revokeObjectURL(imageUrl);
            setImageUrl(null);
        }
    };

    const handleCropComplete = async (croppedBlob: Blob) => {
        await handleUpload(croppedBlob);
    };

    const handleUpload = async (blob: Blob) => {
        setLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append("image", blob, "cropped-image.jpg");
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

            // Clean up old image if needed
            if (isValidUrl(publicId)) {
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
            setShowCropper(false);
            if (imageUrl) {
                URL.revokeObjectURL(imageUrl);
                setImageUrl(null);
            }
        }
    };

    return (
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
                onChange={handleFileSelect}
                accept={VALID_IMAGE_TYPES.join(',')}
                className="hidden"
                disabled={loading}
            />

            {/* Loading and error states */}
            {loading && (
                <p className={`text-sm mt-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                    Uploading image...
                </p>
            )}
            {error && (
                <p className="text-sm text-red-500 mt-2">{error}</p>
            )}

            {/* Image Cropper */}
            {showCropper && imageUrl && (
                <ImageCropper
                    imageUrl={imageUrl}
                    onCancel={handleCancelCrop}
                    onCropComplete={handleCropComplete}
                    loading={loading}
                />
            )}
        </div>
    );
};