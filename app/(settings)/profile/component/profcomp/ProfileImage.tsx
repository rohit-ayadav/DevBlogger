// import React, { useState, useRef } from 'react';
// import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
// import { Pencil } from 'lucide-react';
// import { CldImage } from 'next-cloudinary';
// import { useTheme } from '@/context/ThemeContext';
// import { useToast } from '@/hooks/use-toast';
// import { saveEdit } from '@/action/my-profile-action';
// import { UserType } from './types';

// interface ProfileImageProps {
//     userData: UserType;
//     editMode: boolean;
//     setEditMode: (editMode: boolean) => void;
// }

// const VALID_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
// const MAX_FILE_SIZE = 2 * 1024 * 1024;

// export const ProfileImage = ({ userData, editMode, setEditMode }: ProfileImageProps) => {
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState<string | null>(null);
//     const [showCropper, setShowCropper] = useState(false);
//     const [imageFile, setImageFile] = useState<File | null>(null);
//     const fileInputRef = useRef<HTMLInputElement>(null);
//     const { isDarkMode } = useTheme();
//     const { toast } = useToast();

//     // Function to check if string is valid URL
//     const isValidUrl = (string: string) => {
//         try {
//             new URL(string);
//             return true;
//         } catch (_) {
//             return false;
//         }
//     };

//     // Get appropriate avatar image based on userData.image
//     const getAvatarImage = () => {
//         if (!userData?.image) {
//             return (
//                 <Avatar className="w-24 h-24 md:w-32 md:h-32 transition-all">
//                     <AvatarImage
//                         src="/default-profile.jpg"
//                         alt={userData?.name ?? 'User'}
//                     />
//                     <AvatarFallback className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
//                         {userData?.name?.split(' ').map(n => n[0]).join('') ?? 'U'}
//                     </AvatarFallback>
//                 </Avatar>
//             );
//         }

//         if (isValidUrl(userData.image)) {
//             return (
//                 <Avatar className="w-24 h-24 md:w-32 md:h-32 transition-all">
//                     <AvatarImage
//                         src={userData.image}
//                         alt={userData?.name ?? 'User'}
//                     />
//                     <AvatarFallback className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
//                         {userData?.name?.split(' ').map(n => n[0]).join('') ?? 'U'}
//                     </AvatarFallback>
//                 </Avatar>
//             );
//         } else {
//             // It's a Cloudinary public ID
//             return (
//                 <Avatar className="w-24 h-24 md:w-32 md:h-32 transition-all">
//                     <CldImage
//                         src={`/${userData.image}`}
//                         width={128}
//                         height={128}
//                         alt={userData?.name ?? 'User'}
//                         className="w-full h-full object-cover rounded-full"
//                     />
//                 </Avatar>
//             );
//         }
//     };

//     const triggerFileInput = () => {
//         if (fileInputRef.current) {
//             fileInputRef.current.click();
//         }
//     };

//     const validateImage = (file: File): string | null => {
//         if (!file) return "No file selected";

//         if (!VALID_IMAGE_TYPES.includes(file.type)) {
//             return "Invalid file type. Please upload a JPEG, PNG, GIF, or WebP image.";
//         }

//         if (file.size > MAX_FILE_SIZE) {
//             return `File too large. Maximum size is ${MAX_FILE_SIZE / (1024 * 1024)}MB.`;
//         }

//         return null;
//     };

//     const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const file = event.target.files?.[0];
//         if (!file) return;

//         // Validate the image file
//         const validationError = validateImage(file);
//         if (validationError) {
//             setError(validationError);
//             toast({
//                 title: "Error",
//                 description: validationError,
//                 variant: "destructive"
//             });
//             return;
//         }

//         // Store the file for cropping
//         setImageFile(file);
//         setShowCropper(true);
//     };

//     const handleUpload = async (file: File | Blob, croppedImage: boolean = false) => {
//         setLoading(true);
//         setError(null);

//         const formData = new FormData();
//         formData.append("image", file);
//         const publicId = userData.image;

//         try {
//             const response = await fetch("/api/uploadimages", {
//                 method: "POST",
//                 body: formData,
//             });

//             if (!response.ok) {
//                 throw new Error("Failed to upload image");
//             }

//             const data = await response.json();

//             // Save the public_id to the user data
//             await saveEdit({
//                 ...userData,
//                 image: data.public_id
//             });

//             toast({
//                 title: "Success",
//                 description: "Profile picture updated successfully",
//                 variant: "default"
//             });
//             setEditMode(false);
//             setError(null);

//             // Clean up old image if needed
//             if (isValidUrl(publicId)) {
//                 await fetch(`/api/uploadimages`, {
//                     method: "DELETE",
//                     body: JSON.stringify({ publicId }),
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                 });
//             }

//         } catch (error: any) {
//             console.error("Error uploading image:", error);
//             const errorMsg = error.message || "Something went wrong.";
//             setError(errorMsg);
//             toast({
//                 title: "Error",
//                 description: errorMsg,
//                 variant: "destructive"
//             });
//         } finally {
//             setLoading(false);
//             setShowCropper(false);
//             setImageFile(null);
//         }
//     };
//     const handleCrop = (croppedFile: File) => {
//         handleUpload(croppedFile, true);
//     };
//     const ImageCropper = () => {
//         if (!imageFile || !showCropper) return null;

//         // You can implement your cropping component here
//         return (
//             <div className={`fixed inset-0 z-50 flex items-center justify-center ${isDarkMode ? 'bg-black bg-opacity-70' : 'bg-black bg-opacity-50'}`}>
//                 <div className={`relative p-6 rounded-lg shadow-lg max-w-lg w-full mx-4 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
//                     <h3 className="text-lg font-medium mb-4">Crop Your Image</h3>

//                     {/* Here would go your actual cropping component */}
//                     <div className={`border-2 rounded-lg p-4 mb-4 flex items-