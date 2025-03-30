import React, { useState, useEffect } from 'react';
import { AlertCircle, Loader2, Mail, Globe, Check, X, Github } from 'lucide-react';
import { saveEdit } from '@/action/my-profile-action';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { checkUsernameAvailability } from '@/action/checkUserNameAvailability';
import { UserType } from '@/types/blogs-types';
import { Facebook, Instagram, Linkedin, Twitter } from 'react-feather';
import { sendEmailVerification } from '@/action/email/sendEmailVerification';
import { Toaster } from '@/components/ui/toaster';
interface CustomInputProps {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    error?: string;
    type?: string;
    icon?: React.ReactNode;
    rightElement?: React.ReactNode;
    isDarkMode?: boolean;
}

const CustomInput = ({
    label,
    value,
    onChange,
    disabled = false,
    error = "",
    type = "text",
    icon = null,
    rightElement = null,
    isDarkMode = false
}: CustomInputProps) => (
    <div className="mb-4">
        <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>{label}</label>
        <div className="relative">
            {icon && (
                <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {icon}
                </div>
            )}
            <input
                type={type}
                value={value}
                onChange={onChange}
                disabled={disabled}
                className={`
                    w-full px-3 py-2 
                    ${icon ? 'pl-10' : ''} 
                    ${rightElement ? 'pr-24' : ''}
                    rounded-lg border 
                    ${error ? 'border-red-300' : isDarkMode ? 'border-gray-600' : 'border-gray-300'}
                    ${isDarkMode ? 'bg-gray-800 text-white focus:ring-blue-600' : 'bg-white text-gray-900 focus:ring-blue-500'}
                    focus:outline-none focus:ring-2
                    ${isDarkMode && disabled ? 'disabled:bg-gray-800 disabled:text-gray-400' : 'disabled:bg-gray-50 disabled:text-gray-500'}
                    transition duration-150
                `}
            />
            {rightElement && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    {rightElement}
                </div>
            )}
        </div>
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
);

const SocialIcon = ({ platform }: { platform: string }) => {
    switch (platform) {
        case 'github':
            return <Github className="h-4 w-4" />;
        case 'linkedin':
            return <Linkedin className="h-4 w-4" />;
        case 'twitter':
            return <Twitter className="h-4 w-4" />;
        case 'facebook':
            return <Facebook className="h-4 w-4" />;
        case 'instagram':
            return <Instagram className="h-4 w-4" />;
        case 'website':
            return <Globe className="h-4 w-4" />;
        default:
            return null;
    }
};

interface ProfileInfoTabProps {
    userData: UserType;
    editMode: boolean;
    setEditMode: (mode: boolean) => void;
    isDarkMode?: boolean;
}

export const ProfileInfoTab = ({ userData, editMode, setEditMode, isDarkMode = false }: ProfileInfoTabProps) => {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: userData?.name || '',
        username: userData?.username || '',
        email: userData?.email || '',
        image: userData?.image || '',
        bio: userData?.bio || '',
        website: userData?.website || '',
        socialLinks: {
            github: userData?.socialLinks?.github || 'https://github.com/',
            linkedin: userData?.socialLinks?.linkedin || 'https://linkedin.com/in/',
            twitter: userData?.socialLinks?.twitter || 'https://x.com/',
            facebook: userData?.socialLinks?.facebook || 'https://facebook.com/',
            instagram: userData?.socialLinks?.instagram || 'https://instagram.com/'
        }
    });
    const [errors, setErrors] = useState<{ name?: string; username?: string }>({});
    const [isCheckingUsername, setIsCheckingUsername] = useState(false);
    const [isUsernameAvailable, setIsUsernameAvailable] = useState(true);

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));

        if (field === 'username') {
            setIsCheckingUsername(true);
            checkUsernameAvailability(value)
                .then((available) => {
                    setIsUsernameAvailable(available);
                })
                .finally(() => {
                    setIsCheckingUsername(false);
                });
        }
    };

    const handleSocialChange = (platform: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            socialLinks: {
                ...prev.socialLinks,
                [platform]: value
            }
        }));
    };

    const handleSendVerificationEmail = async () => {
        try {
            const response = await sendEmailVerification(userData.email);
            if (response.success) {
                toast({
                    title: "Success",
                    description: "Verification email sent successfully",
                });
            }
        } catch (error) {
            toast({
                title: "Error",
                description: (error instanceof Error ? error.message : "An unexpected error occurred"),
                variant: "destructive",
            });
        }
    };

    const validateForm = () => {
        const newErrors: { name?: string; username?: string } = {};
        if (formData.name.length < 2) newErrors.name = 'Name must be at least 2 characters';
        if (formData.username.length < 3) newErrors.username = 'Username must be at least 3 characters';
        if (!isUsernameAvailable) newErrors.username = 'Username is not available';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);
        try {
            const response = await saveEdit(formData);
            if (!response.success) {
                toast({
                    title: "Error",
                    description: response.message,
                    variant: "destructive",
                });
            } else {
                toast({
                    title: "Success",
                    description: "Profile updated successfully",
                });
                setEditMode(false);
            }
        } catch (error) {
            toast({
                title: "Error",
                description: (error instanceof Error ? error.message : "An unexpected error occurred"),
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Card className={`w-full max-w-2xl mx-auto p-6 ${isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-800 border-gray-200'} transition-colors duration-200`}>
            <Toaster />
            <div className="mb-6">
                <h2 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Profile Information</h2>
                {!userData.isEmailVerified && (
                    <div className={`${isDarkMode ? 'bg-amber-900/20 border-amber-600' : 'bg-amber-50 border-amber-400'} border-l-4 p-4 mb-6`}>
                        <div className="flex items-center">
                            <AlertCircle className={`h-5 w-5 ${isDarkMode ? 'text-amber-500' : 'text-amber-400'} mr-2`} />
                            <p className={`text-sm ${isDarkMode ? 'text-amber-300' : 'text-amber-700'}`}>
                                Please verify your email to make changes to your profile.
                                <button
                                    className={`ml-2 ${isDarkMode ? 'text-amber-400 hover:text-amber-300' : 'text-amber-600 hover:text-amber-500'} font-medium`}
                                    onClick={() => handleSendVerificationEmail()}
                                >
                                    Resend verification email
                                </button>
                            </p>
                        </div>
                    </div>
                )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                    <CustomInput
                        label="Full Name"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        disabled={!editMode || isSubmitting}
                        error={errors.name}
                        isDarkMode={isDarkMode}
                    />

                    <CustomInput
                        label="Username"
                        value={formData.username}
                        onChange={(e) => handleChange('username', e.target.value)}
                        disabled={!editMode || isSubmitting}
                        error={errors.username}
                        isDarkMode={isDarkMode}
                        rightElement={
                            formData.username !== userData.username && formData.username !== '' && (
                                isCheckingUsername ? (
                                    <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                                ) : isUsernameAvailable ? (
                                    <Check className="h-4 w-4 text-green-500" />
                                ) : (
                                    <X className="h-4 w-4 text-red-500" />
                                )
                            )
                        }
                    />
                </div>

                <CustomInput
                    label="Email"
                    value={formData.email}
                    type="email"
                    onChange={() => { }}
                    disabled={true}
                    icon={<Mail className="h-4 w-4" />}
                    isDarkMode={isDarkMode}
                    rightElement={
                        !userData.isEmailVerified && (
                            <Button
                                type="button"
                                variant={isDarkMode ? "outline" : "ghost"}
                                size="sm"
                                onClick={() => handleSendVerificationEmail()}
                                className={`${isDarkMode ? 'text-blue-400 hover:text-blue-300 border-gray-600' : 'text-blue-600 hover:text-blue-500'}`}
                            >
                                Verify
                            </Button>
                        )
                    }
                />

                User Bio 
                <div className="mb-4">
                    <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Bio</label>
                    <textarea
                        value={formData.bio}
                        onChange={(e) => handleChange('bio', e.target.value)}
                        disabled={!editMode || isSubmitting}
                        placeholder="Write a short bio about yourself... It will be shown on your public profile. Use markdown for better formatting. Keep it under 200 characters, with the first line as a tagline."
                        rows={7}
                        className={`w-full px-3 py-2 rounded-lg border ${isDarkMode ? 'bg-gray-800 text-white border-gray-600 focus:ring-blue-600' : 'bg-white text-gray-900 border-gray-300 focus:ring-blue-500'} focus:outline-none focus:ring-2 min-h-[100px] resize-y transition duration-150 ${isDarkMode && !editMode ? 'disabled:bg-gray-800 disabled:text-gray-400' : 'disabled:bg-gray-50 disabled:text-gray-500'}`}
                    />
                </div>
                {/* Website */}
                <CustomInput
                    label="Website (portfolio, blog, etc.)"
                    type="url"
                    value={formData.website}
                    onChange={(e) => handleChange('website', e.target.value)}
                    disabled={!editMode || isSubmitting}
                    icon={<Globe className="h-4 w-4" />}
                    isDarkMode={isDarkMode}
                />
                {/* Social Links */}

                <div className="space-y-4">
                    <h3 className={`text-lg font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Social Links</h3>
                    {Object.entries(formData.socialLinks).map(([platform, value]) => (
                        <CustomInput
                            key={platform}
                            label={platform.charAt(0).toUpperCase() + platform.slice(1)}
                            type='url'
                            value={value}
                            onChange={(e) => handleSocialChange(platform, e.target.value)}
                            disabled={!editMode || isSubmitting}
                            icon={<SocialIcon platform={platform} />}
                            isDarkMode={isDarkMode}
                        />
                    ))}
                </div>

                {/* Last Updated Info  */}
                <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Last updated: {new Date(userData.updatedAt).toLocaleDateString()}
                </div>

                {/* Buttons */}
                {editMode && (
                    <div className="flex justify-end space-x-3">
                        <Button
                            type="button"
                            variant={isDarkMode ? "secondary" : "outline"}
                            onClick={() => {
                                setFormData({
                                    name: userData?.name || '',
                                    username: userData?.username || '',
                                    email: userData?.email || '',
                                    image: userData?.image || '',
                                    bio: userData?.bio || '',
                                    website: userData?.website || '',
                                    socialLinks: {
                                        github: userData?.socialLinks?.github || '',
                                        linkedin: userData?.socialLinks?.linkedin || '',
                                        twitter: userData?.socialLinks?.twitter || '',
                                        facebook: userData?.socialLinks?.facebook || '',
                                        instagram: userData?.socialLinks?.instagram || ''
                                    }
                                });
                                setEditMode(false);
                            }}
                            disabled={isSubmitting}
                            className={`px-4 py-2 ${isDarkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600 border-gray-600' : ''}`}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className={`px-4 py-2 ${isDarkMode ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                'Save Changes'
                            )}
                        </Button>
                    </div>
                )}

                {/* {!editMode && (
                    <Button
                        type="button"
                        variant={isDarkMode ? "secondary" : "outline"}
                        onClick={() => setEditMode(true)}
                        className={`px-4 py-2 ${isDarkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600 border-gray-600' : ''}`}
                    >
                        Edit Profile
                    </Button>
                )}

                {!editMode && (
                    <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        You can edit your profile information here.
                    </div>
                )} */}

                {editMode && (
                    <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Make sure to save your changes before leaving this page.
                    </div>
                )}

            </form>
        </Card >
    );
};

export default ProfileInfoTab;