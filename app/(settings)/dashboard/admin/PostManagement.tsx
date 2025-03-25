import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Search, Save, Loader2, Edit, Delete, Trash2 } from 'lucide-react'
import { CATEGORIES } from '@/types/blogs-types'
interface BlogPostType {
    _id: string
    title: string
    createdAt: string
    category?: string
    views?: number
    likes?: number
    createdBy: string
}


interface PostManagementProps {
    posts: BlogPostType[];
    loading: boolean;
    searchTerm: string;
    handleSearch: (value: string) => void;
}

const PostManagement: React.FC<PostManagementProps> = ({ posts, loading, searchTerm, handleSearch }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Post Management</CardTitle>
                <CardDescription>Update categories for individual posts</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center mb-4">
                    <Search className="h-4 w-4 mr-2 text-muted-foreground" />
                    <Input
                        placeholder="Search posts..."
                        value={searchTerm}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="max-w-sm"
                    />
                </div>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Sr. No.</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Created</TableHead>
                                <TableHead>Author</TableHead>
                                <TableHead>Views</TableHead>
                                <TableHead>Likes</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center py-10">
                                        <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                                    </TableCell>
                                </TableRow>
                            ) : (
                                posts.map((post) => (
                                    <TableRow key={post._id}>
                                        <TableCell className="font-medium"></TableCell>
                                        <TableCell className="font-medium">{post.title}</TableCell>
                                        <TableCell>{new Date(post.createdAt).toLocaleDateString()}</TableCell>
                                        <TableCell>{post.createdBy}</TableCell>
                                        <TableCell>{post.views || 0}</TableCell>
                                        <TableCell>{post.likes || 0}</TableCell>
                                        <TableCell className="text-right">
                                            {/* Edit Delete buttons */}
                                            <div className='flex items-center space-x-2'>
                                                <Edit className="h-4 w-4 text-blue-500 cursor-pointer" />
                                                <Trash2 className="h-4 w-4 text-red-500 cursor-pointer" />
                                            </div>
                                        </TableCell>

                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    )
}

export default PostManagement