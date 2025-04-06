import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { CalendarIcon, TrendingUpIcon } from 'lucide-react'
import { UserType } from '@/types/blogs-types'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import ShowProfileImage from '@/components/ShowProfileImage'
import toast from 'react-hot-toast'

const Header = ({ user }: { user: UserType }) => {
    const router = useRouter();
    return (
        <header className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <ShowProfileImage src={user.image} className="w-16 h-16 border-4 border-blue-100 dark:border-blue-900" size={16} />
                    <div>
                        <h1 className="text-3xl font-bold">{user.name}'s Dashboard</h1>
                        <p className="text-gray-600 dark:text-gray-400">Manage and track your blog performance</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" size="sm" onClick={() => toast.success("Currently not available")}>
                        <CalendarIcon className="h-4 w-4 mr-2" />
                        Export Report
                    </Button>
                    {/* <Link href="/create">
                        <Button size="sm">
                            <TrendingUpIcon className="h-4 w-4 mr-2" />
                            Create New Blog
                        </Button>
                    </Link> */}
                    <Link href="/profile">
                        <Button size="sm">
                            <TrendingUpIcon className="h-4 w-4 mr-2" />
                            Update Profile/Settings
                        </Button>
                    </Link>
                </div>
            </div>
        </header>
    )
}

export default Header
