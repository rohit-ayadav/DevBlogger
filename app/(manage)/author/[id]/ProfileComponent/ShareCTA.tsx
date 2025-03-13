import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Author } from './ProfileNew'
import { Share2 } from 'lucide-react'
import { SiFacebook, SiLinkedin } from 'react-icons/si'
import { Twitter } from 'react-feather'

const ShareCTA = ({ author, copyProfileLink }: { author: Author; copyProfileLink: () => void }) => {
    return (
        <div>
            <Card className="border-0 shadow-lg dark:bg-gray-800 dark:border-gray-700 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30">
                <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Share This Profile</h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                                If you found {author.name}'s content valuable, consider sharing their profile with others.
                            </p>
                            <div className="flex gap-3">
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
                                    onClick={copyProfileLink}
                                    variant="outline"
                                    className="bg-transparent"
                                >
                                    Copy Link
                                </Button>
                            </div>
                        </div>
                        <div className="hidden md:block">
                            <Share2 className="h-24 w-24 text-purple-600 dark:text-purple-400 opacity-80" />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default ShareCTA
