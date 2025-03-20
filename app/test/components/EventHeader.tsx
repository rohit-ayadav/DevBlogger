// components/EventHeader.tsx
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import CountdownTimer from './CountdownTimer';

interface EventHeaderProps {
    countdown: {
        days: number;
        hours: number;
        minutes: number;
        seconds: number;
    };
    scrollToSection: (sectionId: string) => void;
}

const EventHeader: React.FC<EventHeaderProps> = ({ countdown, scrollToSection }) => {
    return (
        <section className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-12 md:py-20 lg:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Code2Career: The Placement Ready Test</h1>
                    <p className="text-lg md:text-xl mb-6 max-w-3xl mx-auto">Test your skills, compete with the best, and get job-ready with our structured placement-style assessment.</p>

                    {/* Prize Banner */}
                    <div className="bg-yellow-400 text-indigo-900 font-bold py-2 px-4 rounded-md inline-block mb-6 animate-pulse">
                        🏆 WIN EXCITING CASH PRIZES! Top performers will be rewarded! 🏆
                    </div>

                    {/* Countdown Timer */}
                    <CountdownTimer countdown={countdown} />

                    <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
                        <Link href="https://bit.ly/Code2Career" className="w-full sm:w-auto bg-white text-indigo-600 hover:bg-gray-100 font-medium py-3 px-6 rounded-md transition duration-150 ease-in-out text-lg flex items-center justify-center">
                            <span>Register Now</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </Link>
                        <button
                            onClick={() => scrollToSection('timeline')}
                            className="w-full sm:w-auto text-white border border-white hover:bg-white hover:bg-opacity-10 font-medium py-3 px-6 rounded-md transition duration-150 ease-in-out text-lg"
                        >
                            View Timeline
                        </button>
                    </div>

                    <div className="mt-6 text-sm md:text-base bg-white bg-opacity-10 inline-block py-2 px-4 rounded-full">
                        <span className="font-semibold">Online Event</span> • Updated on Mar 19, 2025
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default EventHeader;