import React from 'react';
import { motion } from 'framer-motion';

interface Stage {
    date: string;
    title: string;
    description: string;
    startTime: string;
    endTime: string;
    isActive: boolean;
}

interface TimelineSectionProps {
    stages: Stage[];
    containerVariants: any;
    itemVariants: any;
}

const TimelineSection: React.FC<TimelineSectionProps> = ({ stages, containerVariants, itemVariants }) => {
    return (
        <section id="timeline" className="py-12 px-4 max-w-6xl mx-auto">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="relative"
            >
                <motion.h2
                    variants={itemVariants}
                    className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-900"
                >
                    Stages and Timeline
                </motion.h2>

                {/* Timeline connector */}
                <div className="absolute left-8 top-24 bottom-0 w-1 bg-indigo-200 hidden md:block"></div>

                <div className="space-y-8">
                    {stages.map((stage, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className={`relative ${index === stages.length - 1 ? 'pb-0' : 'pb-2'}`}
                        >
                            <div className="md:grid md:grid-cols-12 gap-6 items-start">
                                {/* Date column with connector dot */}
                                <div className="md:col-span-3 mb-4 md:mb-0 flex md:justify-end relative">
                                    <div className="bg-indigo-100 text-indigo-800 font-semibold px-4 py-3 rounded-lg text-center shadow-sm border border-indigo-200 w-full md:w-auto md:min-w-32">
                                        {stage.date}
                                    </div>
                                    <div className="absolute left-8 top-1/2 w-4 h-4 bg-indigo-500 rounded-full border-4 border-white hidden md:block"></div>
                                </div>

                                {/* Content column */}
                                <div className="md:col-span-9">
                                    <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-indigo-500 hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1">
                                        <div className="flex flex-col gap-4">
                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                                <h3 className="text-xl font-bold text-gray-800">{stage.title}</h3>
                                                {stage.isActive && (
                                                    <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full inline-flex items-center">
                                                        <span className="w-2 h-2 bg-green-600 rounded-full mr-2 animate-pulse"></span>
                                                        Active Now
                                                    </span>
                                                )}
                                            </div>

                                            <p className="text-gray-600">{stage.description}</p>

                                            <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-gray-100">
                                                <div className="flex items-center text-gray-700 text-sm">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <span className="font-medium">Start:</span> <span className="ml-1">{stage.startTime}</span>
                                                </div>
                                                <div className="flex items-center text-gray-700 text-sm">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <span className="font-medium">End:</span> <span className="ml-1">{stage.endTime}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default TimelineSection;