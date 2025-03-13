import React from 'react'
import { useRouter } from 'next/navigation'
import { useState, useMemo } from 'react'
import { useTheme } from '@/context/ThemeContext';
import { BlogPostType } from '@/types/blogs-types';
import { Author } from './ProfileNew';

const useProfile = ({ authorPosts, author }: { authorPosts: BlogPostType[], author: Author }) => {
    const { isDarkMode, toggleDarkMode } = useTheme();
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortBy, setSortBy] = useState('recent');
    const [activeTab, setActiveTab] = useState('posts');
    const [isShareSheetOpen, setIsShareSheetOpen] = useState(false);

    const filteredAndSortedPosts = useMemo(() => {
        let filtered = authorPosts.filter(post =>
            post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
        );

        if (selectedCategory !== 'all') {
            filtered = filtered.filter(post => post.category === selectedCategory);
        }

        return filtered.sort((a, b) => {
            switch (sortBy) {
                case 'popular':
                    return (b.views || 0) - (a.views || 0);
                case 'liked':
                    return (b.likes || 0) - (a.likes || 0);
                case 'oldest':
                    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
                default:
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            }
        });
    }, [authorPosts, searchTerm, selectedCategory, sortBy]);

    const categories = useMemo(() =>
        ['all', ...new Set(authorPosts.map(post => post.category))],
        [authorPosts]
    );

    const totalStats = useMemo(() => {
        return authorPosts.reduce((acc, post) => {
            return {
                views: (acc.views || 0) + (post.views || 0),
                likes: (acc.likes || 0) + (post.likes || 0),
            };
        }, { views: 0, likes: 0 });
    }, [authorPosts]);

    const copyProfileLink = () => {
        const shareUrl = `${window.location.origin}/author/${author.username}`;
        navigator.clipboard.writeText(shareUrl)
            .then(() => alert('Profile link copied to clipboard!'))
            .catch(err => console.error('Could not copy text: ', err));
        setIsShareSheetOpen(false);
    };
    return {
        isDarkMode,
        toggleDarkMode,
        router,
        searchTerm,
        setSearchTerm,
        selectedCategory,
        setSelectedCategory,
        sortBy,
        setSortBy,
        activeTab,
        setActiveTab,
        isShareSheetOpen,
        setIsShareSheetOpen,
        filteredAndSortedPosts,
        categories,
        totalStats,
        copyProfileLink,
    }
}

export default useProfile
