import Link from 'next/link';
import { Terminal } from 'lucide-react';
import { UserType } from '@/types/blogs-types';
import ShowProfileImage from '@/components/ShowProfileImage';

const DesktopNavProfile = ({ user }: { user: UserType | null }) => {
    return (
        <>
            {user ? (
                <div className="relative flex items-center">
                    <Link href="/profile">
                        <button className="flex items-center space-x-3 px-4 py-2 rounded-lg
                        bg-gradient-to-r from-indigo-500 to-purple-600 text-white
                        hover:from-indigo-600 hover:to-purple-700 transition-all duration-300
                        shadow-md hover:shadow-lg">
                            <ShowProfileImage className={"w-10 h-10 rounded-full border-2 border-indigo-500"} src={user.image} size={32} />
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