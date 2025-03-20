// components/PrizesSection.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface PrizesSectionProps {
    containerVariants: any;
    itemVariants: any;
}

const PrizesSection: React.FC<PrizesSectionProps> = ({ containerVariants, itemVariants }) => {
    const prizes = [
        {
            rank: '1st Place',
            amount: '₹5,000',
            description: 'Cash prize for the top performer across all three rounds',
            icon: '🏆'
        },
        {
            rank: '2nd Place',
            amount: '₹3,000',
            description: 'Cash prize for the second-best performer',
            icon: '🥈'
        },
        {
            rank: '3rd Place',
            amount: '₹2,000',
            description: 'Cash prize for the third-best performer',
            icon: '🥉'
        },
        {
            rank: 'Best in Aptitude',
            amount: '₹1,000',
            description: 'Special prize for highest score in the aptitude round',
            icon: '🧠'
        },
        {
            rank: 'Best in Coding',
            amount: '₹1,000',
            description: 'Special prize for most efficient solutions in the final coding round',
            icon: '💻'
        }
    ];

    return (
        <section id="prizes">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                <motion.h2
                    variants={itemVariants}
                    className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-900"
                >
                    🏆 Cash Prizes and Rewards
                </motion.h2>

                <motion.div
                    variants={itemVariants}
                    className="bg-gradient-to-r from-indigo-600 to-blue-500 p-6 rounded-xl text-white text-center mb-8"
                >
                    <h3 className="text-xl font-bold mb-2">Total Prize Pool</h3>
                    <p className="text-4xl font-extrabold">₹12,000</p>
                    <p className="mt-2">Compete to win exciting cash prizes and recognition!</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {prizes.slice(0, 3).map((prize, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className={`bg-white rounded-xl shadow-sm p-6 border-t-4 ${index === 0 ? 'border-yellow-400' : index === 1 ? 'border-gray-400' : 'border-amber-700'
                                } hover:shadow-md transition-shadow text-center`}
                        >
                            <div className="text-4xl mb-2">{prize.icon}</div>
                            <h3 className="text-xl font-semibold mb-2">{prize.rank}</h3>
                            <p className="text-3xl font-bold text-indigo-600 mb-3">{prize.amount}</p>
                            <p className="text-gray-600">{prize.description}</p>
                        </motion.div>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    {prizes.slice(3).map((prize, index) => (
                        <motion.div
                            key={index + 3}
                            variants={itemVariants}
                            className="bg-white rounded-xl shadow-sm p-6 border-t-4 border-indigo-400 hover:shadow-md transition-shadow text-center"
                        >
                            <div className="text-3xl mb-2">{prize.icon}</div>
                            <h3 className="text-lg font-semibold mb-2">{prize.rank}</h3>
                            <p className="text-2xl font-bold text-indigo-600 mb-3">{prize.amount}</p>
                            <p className="text-gray-600">{prize.description}</p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    variants={itemVariants}
                    className="bg-white rounded-xl shadow-sm p-6 mt-8"
                >
                    <h3 className="text-xl font-semibold mb-4">Additional Benefits for All Participants</h3>
                    <ul className="space-y-3 pl-5 list-disc">
                        <li className="text-gray-700"><span className="font-medium">Participation Certificates:</span> All participants who complete all three rounds will receive digital certificates.</li>
                        <li className="text-gray-700"><span className="font-medium">Performance Analysis:</span> Detailed insights about your performance compared to peers.</li>
                        <li className="text-gray-700"><span className="font-medium">Skill Development:</span> Opportunity to enhance your problem-solving and technical abilities.</li>
                        <li className="text-gray-700"><span className="font-medium">Community Recognition:</span> Top performers will be featured on Let's Code social media platforms.</li>
                    </ul>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default PrizesSection;