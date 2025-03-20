import React from 'react';
import { motion } from 'framer-motion';

interface Stage {
    date: string;
    title: string;
    startTime: string;
    endTime: string;
}

interface DatesSectionProps {
    stages: Stage[];
    containerVariants: any;
    itemVariants: any;
}

const DatesSection: React.FC<DatesSectionProps> = ({ stages, containerVariants, itemVariants }) => {
    return (
        <section id="dates" className="py-12 px-4 max-w-6xl mx-auto">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                <motion.h2
                    variants={itemVariants}
                    className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-900"
                >
                    Important Dates & Deadlines
                </motion.h2>

                {/* Desktop Table View */}
                <motion.div
                    variants={itemVariants}
                    className="bg-white rounded-xl shadow-md overflow-hidden hidden md:block"
                >
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gradient-to-r from-indigo-50 to-indigo-100">
                                <tr>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-indigo-800 uppercase tracking-wider">Event</th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-indigo-800 uppercase tracking-wider">Date</th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-indigo-800 uppercase tracking-wider">Time (IST)</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                <tr className="bg-red-50 hover:bg-red-100 transition-colors duration-150">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-bold text-red-900">Registration Deadline</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-700">11 Apr 2025</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-700">11:59 PM</td>
                                </tr>

                                {stages.map((stage, index) => (
                                    <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{stage.title}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{stage.date}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{stage.startTime} - {stage.endTime}</td>
                                    </tr>
                                ))}

                                <tr className="bg-green-50 hover:bg-green-100 transition-colors duration-150">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-bold text-green-900">Results Announcement</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-700">25 Apr 2025</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-700">11:59 PM</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </motion.div>

                {/* Mobile Card View */}
                <div className="md:hidden space-y-4">
                    <motion.div
                        variants={itemVariants}
                        className="bg-red-50 rounded-lg shadow-sm p-4 border-l-4 border-red-500"
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-bold text-red-900">Registration Deadline</h3>
                                <div className="mt-2 flex flex-col space-y-1">
                                    <div className="flex items-center text-sm text-red-700">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        11 Apr 2025
                                    </div>
                                    <div className="flex items-center text-sm text-red-700">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        11:59 PM
                                    </div>
                                </div>
                            </div>
                            <div className="bg-red-200 p-2 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </motion.div>

                    {stages.map((stage, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-indigo-500 hover:shadow-md transition-shadow"
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-medium text-gray-900">{stage.title}</h3>
                                    <div className="mt-2 flex flex-col space-y-1">
                                        <div className="flex items-center text-sm text-gray-700">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            {stage.date}
                                        </div>
                                        <div className="flex items-center text-sm text-gray-700">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            {stage.startTime} - {stage.endTime}
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-indigo-100 p-2 rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    <motion.div
                        variants={itemVariants}
                        className="bg-green-50 rounded-lg shadow-sm p-4 border-l-4 border-green-500"
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-bold text-green-900">Results Announcement</h3>
                                <div className="mt-2 flex flex-col space-y-1">
                                    <div className="flex items-center text-sm text-green-700">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        25 Apr 2025
                                    </div>
                                    <div className="flex items-center text-sm text-green-700">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        11:59 PM
                                    </div>
                                </div>
                            </div>
                            <div className="bg-green-200 p-2 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}

export default DatesSection;