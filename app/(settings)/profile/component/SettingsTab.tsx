import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SettingsSection } from './SettingsSection';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Moon, Sun, LogOut } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import toast from 'react-hot-toast';

interface SettingsTabProps {
    changePassword: (oldPassword: string, newPassword: string) => Promise<any>;
    manageLinkedAccounts: () => void;
    updateThemeSettings: () => void;
    isDarkMode?: boolean;
    currentTheme?: string;
}

export const SettingsTab = ({
    changePassword,
    manageLinkedAccounts,
    updateThemeSettings,
    isDarkMode = false,
    currentTheme = isDarkMode ? "dark" : "light",
}: SettingsTabProps) => {
    const router = useRouter();
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();
        setPasswordError('');

        if (newPassword !== confirmPassword) {
            setPasswordError('New passwords do not match');
            return;
        }

        if (newPassword.length < 8) {
            setPasswordError('Password must be at least 8 characters');
            return;
        }

        try {
            setIsSubmitting(true);
            const message = await changePassword(oldPassword, newPassword);

            if (message.includes('Password updated successfully')) {
                toast.success(message);
                setIsChangingPassword(false);
                setOldPassword('');
                setNewPassword('');
                setConfirmPassword('');
            } else {
                setPasswordError(message);
                toast.error(message);
            }
        } catch (error) {
            setPasswordError(error instanceof Error ? error.message : 'Failed to change password');
            toast.error(error instanceof Error ? error.message : 'Failed to change password');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Card className={`w-full shadow-sm ${isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-800 border-gray-200'} transition-colors duration-200`}>
            <CardHeader className={`pb-4 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <CardTitle className={`text-xl ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Account Settings</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-8">
                    <div className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} pb-6`}>
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h3 className={`text-lg font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Change Password</h3>
                                <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                    Update your account password
                                </p>
                            </div>
                            {!isChangingPassword && (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setIsChangingPassword(true)}
                                    className={`${isDarkMode ? 'border-gray-600 hover:bg-gray-700 text-gray-200' : 'hover:bg-gray-100'}`}
                                >
                                    Change
                                </Button>
                            )}
                        </div>

                        {isChangingPassword && (
                            <form onSubmit={handlePasswordChange} className="space-y-4 mt-4">
                                <div className="space-y-2">
                                    <Label htmlFor="current-password" className={isDarkMode ? 'text-gray-200' : ''}>
                                        Current Password
                                    </Label>
                                    <Input
                                        id="current-password"
                                        type="password"
                                        value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                        required
                                        className={isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : ''}
                                        placeholder="Enter your current password"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="new-password" className={isDarkMode ? 'text-gray-200' : ''}>
                                        New Password
                                    </Label>
                                    <Input
                                        id="new-password"
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        required
                                        className={isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : ''}
                                        placeholder="Enter new password"
                                        minLength={8}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="confirm-password" className={isDarkMode ? 'text-gray-200' : ''}>
                                        Confirm New Password
                                    </Label>
                                    <Input
                                        id="confirm-password"
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                        className={isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : ''}
                                        placeholder="Confirm new password"
                                    />
                                </div>

                                {passwordError && (
                                    <p className="text-red-500 text-sm">{passwordError}</p>
                                )}

                                <div className="flex space-x-2 pt-2">
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={`${isDarkMode ? 'bg-blue-600 hover:bg-blue-700 text-white' : ''}`}
                                    >
                                        {isSubmitting ? 'Saving...' : 'Save Password'}
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => {
                                            setIsChangingPassword(false);
                                            setOldPassword('');
                                            setNewPassword('');
                                            setConfirmPassword('');
                                            setPasswordError('');
                                        }}
                                        className={`${isDarkMode ? 'border-gray-600 hover:bg-gray-700 text-gray-200' : ''}`}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        )}
                    </div>

                    <div className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} pb-6`}>
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className={`text-lg font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Linked Accounts</h3>
                                <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                    Manage your linked social accounts
                                </p>
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={manageLinkedAccounts}
                                className={`${isDarkMode ? 'border-gray-600 hover:bg-gray-700 text-gray-200' : 'hover:bg-gray-100'}`}
                            >
                                Manage
                            </Button>
                        </div>
                    </div>

                    <div className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} pb-6`}>
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className={`text-lg font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Theme Settings</h3>
                                <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                    Customize your app appearance
                                </p>
                            </div>
                            <Button
                                variant={isDarkMode ? "outline" : "outline"}
                                size="sm"
                                onClick={updateThemeSettings}
                                className={`${isDarkMode ? 'border-gray-600 hover:bg-gray-700 text-gray-200' : ''}`}
                                aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
                            >
                                {isDarkMode ? (
                                    <div className="flex items-center">
                                        <Sun className="h-4 w-4 mr-2" />
                                        <span>Light Mode</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center">
                                        <Moon className="h-4 w-4 mr-2" />
                                        <span>Dark Mode</span>
                                    </div>
                                )}
                            </Button>
                        </div>
                        <div className={`mt-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            Current theme: {currentTheme === "dark" ? "Dark" : "Light"}
                        </div>
                    </div>

                    <div className="pt-4">
                        <Link href="/signout" passHref>
                            <Button
                                variant="destructive"
                                className={`w-full flex items-center justify-center ${isDarkMode ? 'bg-red-700 hover:bg-red-800 text-white' : ''}`}
                            >
                                <LogOut className="h-4 w-4 mr-2" />
                                Log Out
                            </Button>
                        </Link>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default SettingsTab;