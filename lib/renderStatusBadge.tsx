import {
    FileClock,
    Eye,
    Archive,
    Lock,
    Clock,
    ShieldX,
    Trash2,
    CheckCircle,
    HelpCircle,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const renderStatusBadge = (status: string): React.ReactElement => {
    const map: Record<
        string,
        {
            label: string;
            icon: React.ElementType;
            colorClass: string;
            title: string;
        }
    > = {
        draft: {
            label: 'Draft',
            icon: FileClock,
            colorClass: 'text-yellow-600 dark:text-yellow-400',
            title: 'This post is a draft and will be deleted in 7 days if not published.',
        },
        published: {
            label: 'Public',
            icon: Eye,
            colorClass: 'text-green-600 dark:text-green-400',
            title: 'This post is public and visible on the platform.',
        },
        private: {
            label: 'Private',
            icon: Lock,
            colorClass: 'text-red-600 dark:text-red-400',
            title: 'This post is private. Only people with the link can view it.',
        },
        archived: {
            label: 'Archived',
            icon: Archive,
            colorClass: 'text-gray-600 dark:text-gray-400',
            title: 'This post is archived.',
        },
        pending_review: {
            label: 'Pending',
            icon: Clock,
            colorClass: 'text-blue-600 dark:text-blue-400',
            title: 'This post is waiting for review.',
        },
        rejected: {
            label: 'Rejected',
            icon: ShieldX,
            colorClass: 'text-red-600 dark:text-red-400',
            title: 'This post has been rejected.',
        },
        deleted: {
            label: 'Deleted',
            icon: Trash2,
            colorClass: 'text-gray-500 dark:text-gray-400',
            title: 'This post is deleted.',
        },
        approved: {
            label: 'Approved',
            icon: CheckCircle,
            colorClass: 'text-green-600 dark:text-green-400',
            title: 'This post is approved.',
        },
    };

    const fallback = {
        label: 'Unknown',
        icon: HelpCircle,
        colorClass: 'text-gray-400',
        title: 'Unknown status',
    };

    const { label, icon: Icon, colorClass, title } = map[status] || fallback;

    return (
        <Badge
            variant="outline"
            className={`text-xs sm:text-sm ${colorClass}`
            }
            title={title}
        >
            <Icon size={14} className="mr-1 shrink-0" />
            {label}
        </Badge>
    );
};
