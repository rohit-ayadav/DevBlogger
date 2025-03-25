"use client";
import { publishBlog } from '@/action/updateBlog';
import { useTheme } from '@/context/ThemeContext';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Toggle } from '@/components/ui/toggle';
import { Eye, EyeOff } from 'lucide-react';

const PreviewConfirmation = ({ id }: { id: string }) => {
    const { isDarkMode } = useTheme();
    const router = useRouter();
    const [mobileView, setMobileView] = React.useState(false);

    const goback = () => {
        router.push(`/edit/${id}`);
    };

    const publish = () => {
        publishBlog(id).then((res) => {
            if (res.error === "") {
                router.push(`/blogs/${id}`);
            } else {
                alert(res.error);
            }
        });
    };

    return (
        <div className={`flex flex-col items-center justify-center min-h-screen p-6 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
            <Card className="w-full max-w-2xl p-6 text-center">
                <h1 className="text-3xl font-bold">Preview Your Blog</h1>
                <p className="text-lg mt-2 text-gray-500">Check how your blog post looks before publishing.</p>

                <div className="flex justify-center gap-4 mt-4">
                    <Toggle pressed={mobileView} onPressedChange={setMobileView} className="flex items-center gap-2">
                        {mobileView ? <EyeOff size={16} /> : <Eye size={16} />} {mobileView ? 'Mobile View' : 'Desktop View'}
                    </Toggle>
                </div>

                <CardContent className={`mt-6 rounded-lg shadow-lg overflow-hidden border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}>
                    <iframe
                        src={`/blogs/${id}`}
                        className={`w-full ${mobileView ? 'h-[500px] max-w-sm' : 'h-[700px]'}`}
                        frameBorder="0"
                    ></iframe>
                </CardContent>

                <div className="mt-6 flex justify-between w-full">
                    <Button variant="outline" onClick={goback}>Go Back</Button>
                    <Button onClick={publish}>Publish</Button>
                </div>
            </Card>
        </div>
    );
};

export default PreviewConfirmation;
