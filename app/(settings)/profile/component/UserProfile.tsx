"use client";
import React, { useState, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, BookOpen, Settings, ExternalLink, LayoutDashboard } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
import { ProfileCard } from "./ProfileCard";
import { ProfileInfoTab } from "./ProfileInfoTab";
import { SettingsTab } from "./SettingsTab";
import { BlogPostType, UserType } from "@/types/blogs-types";
import { ErrorFallback } from "../id-omponent/ErrorFallback";
import toast from "react-hot-toast";
import changePassword from "@/action/changePassword";
import Link from "next/link";

interface UserProfileProps {
    userData: UserType;
}

const ProfileCTA = ({ username, isDarkMode }: { username: string, isDarkMode: boolean }) => {
    const router = useRouter();

    return (
        <div className={`mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            <div
                onClick={() => router.push('/dashboard')}
                className={`flex items-center justify-between p-4 rounded-lg cursor-pointer ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
                    } transition-colors duration-200`}
            >
                <div>
                    <h3 className="font-semibold text-lg">Manage Your Blogs</h3>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Edit, publish and track your blog posts
                    </p>
                </div>
                <LayoutDashboard className={`w-6 h-6 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            </div>

            <div
                onClick={() => router.push(`/author/${username}`)}
                className={`flex items-center justify-between p-4 rounded-lg cursor-pointer ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
                    } transition-colors duration-200`}
            >
                <div>
                    <h3 className="font-semibold text-lg">Public Profile</h3>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        View and share your public profile
                    </p>
                </div>
                <ExternalLink className={`w-6 h-6 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            </div>
        </div>
    );
};

export default function UserProfile({ userData }: UserProfileProps) {
    const { isDarkMode, toggleDarkMode } = useTheme();
    const { data: session } = useSession();
    const [error, setError] = useState<string | null>(null);
    const [editMode, setEditMode] = useState(false);
    const [activeTab, setActiveTab] = useState("profile");

    const manageLinkedAccounts = () => {
        toast.error('We are working on this feature. Please check back later.');
    };

    if (!userData) return <ErrorFallback error={new Error("User not found")} resetErrorBoundary={() => { window.location.reload() }} />;

    return (
        <div className={`w-full max-w-full px-4 py-8 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} transition-colors duration-200`}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8">
                <div className="md:col-span-1">
                    {userData && (
                        <ProfileCard
                            userData={userData as UserType}
                            editMode={editMode}
                            setEditMode={setEditMode}
                        />
                    )}
                </div>
                <div className="md:col-span-2">
                    <Tabs
                        value={activeTab}
                        onValueChange={setActiveTab}
                        className="w-full"
                    >
                        <TabsList className={`grid w-full grid-cols-2 gap-4 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                            <TabsTrigger
                                value="profile"
                                className={`flex items-center justify-center ${isDarkMode
                                    ? 'data-[state=active]:bg-gray-700 data-[state=active]:text-white data-[state=inactive]:text-gray-400'
                                    : 'data-[state=active]:bg-white'
                                    }`}
                            >
                                <User className="w-4 h-4 mr-2" /> Profile
                            </TabsTrigger>
                            <TabsTrigger
                                value="settings"
                                className={`flex items-center justify-center ${isDarkMode
                                    ? 'data-[state=active]:bg-gray-700 data-[state=active]:text-white data-[state=inactive]:text-gray-400'
                                    : 'data-[state=active]:bg-white'
                                    }`}
                            >
                                <Settings className="w-4 h-4 mr-2" /> Settings
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent
                            value="profile"
                            className={`w-full ${isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white'} p-4 rounded-lg mt-2`}
                        >
                            {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
                            <ProfileInfoTab
                                userData={userData as UserType}
                                editMode={editMode}
                                setEditMode={setEditMode}
                                isDarkMode={isDarkMode}
                            />
                        </TabsContent>
                        <TabsContent
                            value="settings"
                            className={`w-full ${isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white'} p-4 rounded-lg mt-2`}
                        >
                            <SettingsTab
                                changePassword={changePassword}
                                updateThemeSettings={toggleDarkMode}
                                manageLinkedAccounts={manageLinkedAccounts}
                                isDarkMode={isDarkMode}
                            />
                        </TabsContent>
                    </Tabs>
                    <ProfileCTA username={userData.username} isDarkMode={isDarkMode} />
                </div>
            </div>
        </div>
    );
}