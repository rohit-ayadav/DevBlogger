import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SettingsSection } from './SettingsSection';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Moon, Sun } from 'lucide-react';

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

    return (
        <Card className={`${isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-800 border-gray-200'} transition-colors duration-200`}>
            <CardHeader className={`${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <CardTitle className={`${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Account Settings</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    <SettingsSection
                        title="Change Password"
                        description="Update your account password"
                        action={changePassword}
                        buttonText="Change"
                        isDarkMode={isDarkMode}
                    />
                    <SettingsSection
                        title="Linked Accounts"
                        description="Manage your linked social accounts"
                        action={manageLinkedAccounts}
                        buttonText="Manage"
                        isDarkMode={isDarkMode}
                    />

                    {/* Theme Settings with toggle */}
                    <div className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} pb-4`}>
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className={`text-lg font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Theme Settings</h3>
                                <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                    Customize your app appearance
                                </p>
                            </div>
                            <Button
                                variant={isDarkMode ? "default" : "secondary"}
                                size="sm"
                                onClick={updateThemeSettings}
                                className={`${isDarkMode ? 'border-gray-600 hover:bg-gray-700' : 'hover:bg-gray-200'}`}
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
                        <Link href="/signout">
                            <Button
                                variant="destructive"
                                className={`w-full ${isDarkMode ? 'bg-red-700 hover:bg-red-800' : ''}`}
                            >
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