import ShowProfileImage from '@/components/ShowProfileImage';
import { UserType } from '@/types/blogs-types';

const ProfileDisplay = ({ user }: { user: UserType | null }) => {

    if (!user) {
        return (
            <div className="flex items-center space-x-3 px-3 py-2">
                <div className="w-10 h-10 rounded-full border-2 border-indigo-500 animate-pulse bg-gray-200"></div>
                <div className="flex flex-col">
                    <div className="h-4 w-24 bg-gray-200 animate-pulse rounded"></div>
                    <div className="h-4 w-32 bg-gray-200 animate-pulse rounded mt-1"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center space-x-3 px-3 py-2">

            <ShowProfileImage className={"w-10 h-10 rounded-full border-2 border-indigo-500"} src={user.image} size={32} />
            <div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                    {user?.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    {user?.email}
                </p>
            </div>
        </div>
    );
};

export default ProfileDisplay;