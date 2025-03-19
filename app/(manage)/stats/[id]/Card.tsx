import { ArrowUpRight } from 'react-feather';
import { Card, CardContent } from '@/components/ui/card';
import { UserType } from '@/types/blogs-types';
import { cleanMarkdown, isValidUrl } from '@/lib/common-function';
import { CldImage } from 'next-cloudinary';

const StatCard = ({ title, value, icon: Icon, trend, description }: any) => (
    <Card>
        <CardContent className="pt-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                        <Icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
                </div>
                {trend && (
                    <div className={`flex items-center space-x-1 ${Number(trend) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        <ArrowUpRight className={`h-4 w-4 ${Number(trend) < 0 ? 'rotate-90' : ''}`} />
                        <span className="text-sm">{Math.abs(Number(trend))}%</span>
                    </div>
                )}
            </div>
            <h3 className="text-2xl font-bold mt-2">{value}</h3>
            {description && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{description}</p>
            )}
        </CardContent>
    </Card>
);

const AuthorCard = ({ user }: { user: UserType }) => (
    <Card>
        <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
                {user.image ? (
                    isValidUrl(user.image) ? (
                        <img
                            src={user.image}
                            alt={user.name}
                            className="w-16 h-16 rounded-full"
                        />
                    ) : (
                        // if not valid url, it is Cloudinary image
                        <CldImage
                            src={user.image}
                            alt={user.name}
                            width={40}
                            height={40}
                            className="w-16 h-16 rounded-full"
                            loading="lazy"
                        />
                    )
                ) : (
                    <img
                        src="/default-profile.jpg"
                        alt={user.name}
                        className="w-16 h-16 rounded-full"
                    />
                )}
            </div>
            {/* <div className="flex flex-col justify-center"> */}
                <div>
                    <h3 className="font-semibold text-lg">{user.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{cleanMarkdown(user.bio).slice(0, 50)}...</p>
                    <div className="flex items-center space-x-4 mt-2">
                        <span className="text-sm">
                            <strong>{user.noOfBlogs}</strong> posts
                        </span>
                        <span className="text-sm">
                            <strong>{user.follower}</strong> followers
                        </span>
                    </div>
                </div>
            {/* </div> */}
        </CardContent>
    </Card>
);

const TIME_PERIODS = {
    '1M': 'This Month',
    '3M': 'Last 3 Months',
    '6M': 'Last 6 Months',
    '1Y': 'Last Year',
    'ALL': 'All Time'
};

export { StatCard, AuthorCard, TIME_PERIODS };