// components/EventTabs.tsx
import React from 'react';

interface EventTabsProps {
    activeTab: string;
    scrollToSection: (sectionId: string) => void;
}

const EventTabs: React.FC<EventTabsProps> = ({ activeTab, scrollToSection }) => {
    return (
        <div className="hidden md:block border-b border-gray-200 sticky top-0 bg-white z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <nav className="flex overflow-x-auto hide-scrollbar">
                    {['details', 'timeline', 'dates', 'prizes', 'reviews', 'faqs'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => scrollToSection(tab)}
                            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm mr-8 ${activeTab === tab
                                ? 'border-indigo-500 text-indigo-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            {tab === 'details' && 'Details'}
                            {tab === 'timeline' && 'Stages & Timeline'}
                            {tab === 'dates' && 'Dates & Deadlines'}
                            {tab === 'prizes' && '🏆 Cash Prizes'}
                            {tab === 'reviews' && 'Reviews'}
                            {tab === 'faqs' && 'FAQs & Discussions'}
                        </button>
                    ))}
                </nav>
            </div>
        </div>
    );
};
export default EventTabs;