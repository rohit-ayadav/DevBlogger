import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { UserType } from '@/types/blogs-types';
import { useTheme } from '@/context/ThemeContext';

const SkeletonCard = () => {
    const { isDarkMode } = useTheme();

    return (
        <Card className="overflow-hidden animate-pulse">
            <div className={`h-48 sm:h-56 lg:h-64 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
            <CardHeader>
                <div className={`h-6 w-3/4 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
                <div className={`h-4 w-1/2 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    <div className={`h-4 w-full rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
                    <div className={`h-4 w-full rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
                    <div className={`h-4 w-3/4 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
                </div>
            </CardContent>
            <CardFooter>
                <div className={`h-10 w-full rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
            </CardFooter>
        </Card>
    );
};

export {  SkeletonCard };