import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Share2, Twitter } from 'react-feather'
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { SiFacebook, SiLinkedin, SiReddit, SiWhatsapp } from 'react-icons/si'
import { Input } from '@/components/ui/input'
import { Moon, Sun } from 'react-feather'
import { Author } from './ProfileNew'

interface HeaderProps {
    author: Author;
    isDarkMode: boolean;
    toggleDarkMode: () => void;
    isShareSheetOpen: boolean;
    setIsShareSheetOpen: (open: boolean) => void;
    copyProfileLink: () => void;
};

const Header = ({ author, isDarkMode, toggleDarkMode, isShareSheetOpen, setIsShareSheetOpen, copyProfileLink }: HeaderProps) => {
    const handleShareProfile = () => {
        const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/author/${author.username}` : '';

        if (navigator.share) {
            navigator.share({
                title: `${author.name}'s Developer Profile`,
                text: `Check out ${author.name}'s developer profile on DevBlogger`,
                url: shareUrl,
            }).catch((error) => console.log('Error sharing', error));
        } else {
            navigator.clipboard.writeText(shareUrl)
                .then(() => alert('Profile link copied to clipboard!'))
                .catch(err => console.error('Could not copy text: ', err));
        }
    };

    return (
        <header className="flex justify-between items-center gap-2 mb-3 sm:mb-6">
            <nav className="flex items-center gap-1 sm:gap-4 overflow-hidden">
                <Link href="/blogs">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-gray-200 dark:hover:bg-gray-800 h-8 w-8 sm:h-10 sm:w-10"
                    >
                        <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                    </Button>
                </Link>
                <div className="breadcrumbs text-xs sm:text-sm flex overflow-hidden whitespace-nowrap">
                    <Link href="/blogs" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 flex-shrink-0">
                        Blogs
                    </Link>
                    <span className="mx-1 sm:mx-2 text-gray-400 flex-shrink-0">/</span>
                    <Link href="/author" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 flex-shrink-0">
                        Authors
                    </Link>
                    <span className="mx-1 sm:mx-2 text-gray-400 flex-shrink-0">/</span>
                    <span className="text-gray-900 dark:text-gray-200 font-medium truncate max-w-[100px] sm:max-w-[200px] flex-shrink-0" title={author.name}>{author.name}</span>
                </div>
            </nav>
            <div className="flex items-center gap-2">
                <Sheet open={isShareSheetOpen} onOpenChange={setIsShareSheetOpen}>
                    <SheetTrigger asChild>
                        <Button
                            variant="outline"
                            size="sm"
                            className="flex gap-1 bg-transparent text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950 h-8 text-xs sm:text-sm px-2 sm:px-3"
                        >
                            <Share2 className="h-3 w-3 sm:h-4 sm:w-4" />
                            <span className="hidden sm:inline">Share Profile</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent className="dark:bg-gray-900 dark:border-gray-800">
                        <SheetHeader>
                            <SheetTitle className="text-gray-900 dark:text-gray-100">Share {author.name}'s Profile</SheetTitle>
                        </SheetHeader>
                        <div className="grid gap-6 py-6">
                            <div className="flex flex-col gap-4">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Share on social media</h3>
                                <div className="flex gap-4 mt-2">
                                    <Button
                                        onClick={() => window.open(`https://twitter.com/intent/tweet?text=Check out ${author.name}'s developer profile&url=${encodeURIComponent(`${window.location.origin}/author/${author.username}`)}`, '_blank')}
                                        variant="outline"
                                        size="icon"
                                        className="bg-transparent text-[#1DA1F2] border-[#1DA1F2] hover:bg-[#1DA1F2]/10"
                                    >
                                        <Twitter className="h-5 w-5" />
                                    </Button>
                                    <Button
                                        onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${window.location.origin}/author/${author.username}`)}`, '_blank')}
                                        variant="outline"
                                        size="icon"
                                        className="bg-transparent text-[#1877F2] border-[#1877F2] hover:bg-[#1877F2]/10"
                                    >
                                        <SiFacebook className="h-5 w-5" />
                                    </Button>
                                    <Button
                                        onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${window.location.origin}/author/${author.username}`)}`, '_blank')}
                                        variant="outline"
                                        size="icon"
                                        className="bg-transparent text-[#0A66C2] border-[#0A66C2] hover:bg-[#0A66C2]/10"
                                    >
                                        <SiLinkedin className="h-5 w-5" />
                                    </Button>
                                    <Button
                                        onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(`🚀 Check out this amazing author on DevBlogger! 📖\n\n${window.location.origin}/author/${author.username}\n\nThey write insightful blogs on various topics. Have a look! 🔥`)}`, '_blank')}
                                        variant="outline"
                                        size="icon"
                                        className="bg-transparent text-[#25D366] border-[#25D366] hover:bg-[#25D366]/10"
                                    >
                                        <SiWhatsapp className="h-5 w-5" />
                                    </Button>
                                    <Button
                                        onClick={() => window.open(`https://www.reddit.com/submit?url=${encodeURIComponent(`${window.location.origin}/author/${author.username}`)}&title=Check%20out%20this%20author%20profile!`, '_blank')}
                                        variant="outline"
                                        size="icon"
                                        className="bg-transparent text-[#FF4500] border-[#FF4500] hover:bg-[#FF4500]/10"
                                    >
                                        <SiReddit className="h-5 w-5" />
                                    </Button>
                                </div>
                            </div>
                            <div className="flex flex-col gap-4">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Or copy the link</h3>
                                <div className="flex items-center gap-2">
                                    <Input
                                        className="flex-1 bg-transparent"
                                        value={typeof window !== 'undefined' ? `${window.location.origin}/author/${author.username}` : ''}
                                        readOnly
                                    />
                                    <Button variant="secondary" onClick={copyProfileLink}>Copy</Button>
                                </div>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
                <Button
                    onClick={toggleDarkMode}
                    variant="ghost"
                    size="icon"
                    className="hidden sm:flex bg-transparent hover:bg-gray-200 dark:hover:bg-gray-800"
                >
                    {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
            </div>
        </header>
    )
}

export default Header