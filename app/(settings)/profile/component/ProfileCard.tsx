import React from 'react';
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserType } from './types';
import { Calendar, Instagram, Link, Pencil } from 'lucide-react';
import { Facebook, GitHub, Linkedin, Twitter } from 'react-feather';
import { formatRelativeTime } from '@/utils/date-formatter';
import { useTheme } from '@/context/ThemeContext';
import { cleanMarkdown } from '@/lib/common-function';
import { ProfileImage } from './profcomp/ProfileImage';

interface ProfileCardProps {
    userData: UserType;
    editMode: boolean;
    setEditMode: (editMode: boolean) => void;
}

export const ProfileCard = ({ userData, editMode, setEditMode }: ProfileCardProps) => {
    const joinDate = formatRelativeTime(userData.createdAt);
    const length = 0;
    const { isDarkMode } = useTheme();
    return (
        <Card className={`${isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white'}`}>
            <CardHeader>
                <div className="flex flex-col items-center">
                    <ProfileImage userData={userData} editMode={editMode} setEditMode={setEditMode} />
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
        </Card >
    );
};