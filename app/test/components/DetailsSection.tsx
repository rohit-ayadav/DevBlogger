// components/DetailsSection.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface DetailsSectionProps {
    containerVariants: any;
    itemVariants: any;
}

const DetailsSection: React.FC<DetailsSectionProps> = ({ containerVariants, itemVariants }) => {
    return (
        <section id="details">
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
                    All that you need to know about Code2Career
                </motion.h2>

                <motion.div
                    variants={itemVariants}
                    className="bg-white rounded-xl shadow-sm p-6 mb-8"
                >
                    <p className="text-lg mb-4">Are you ready to test your placement preparation and compete with the best? <strong>Code2Career</strong> is designed for CS students who want to assess their skills and get job-ready.</p>

                    <p className="mb-6">This event follows a structured placement-style format with <strong>three rounds</strong>—Aptitude, CS Fundamentals, and Coding—helping you evaluate your strengths and identify areas for improvement. Through this test, you'll:</p>

                    <ul className="space-y-3 mb-6 pl-5 list-disc">
                        <li className="text-gray-700"><strong>Experience real hiring challenges</strong> that mirror top company recruitment processes.</li>
                        <li className="text-gray-700"><strong>Sharpen your problem-solving skills</strong> with hands-on coding and aptitude tests.</li>
                        <li className="text-gray-700"><strong>Understand where you stand</strong> in the placement race and get actionable insights to improve.</li>
                        <li className="text-gray-700"><strong>Win exciting cash prizes</strong> by showcasing your skills and outperforming others.</li>
                    </ul>

                    <p className="text-gray-700">Whether you're actively preparing for job interviews or just starting your placement journey, <strong>Code2Career</strong> is the perfect way to measure your readiness and take the first step toward landing your dream job!</p>
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    className="bg-white rounded-xl shadow-sm p-6"
                >
                    <h3 className="text-xl font-semibold mb-4">About Let's Code</h3>
                    <p className="text-gray-700 mb-4">
                        At <strong>Let's Code</strong>, we are more than just a community—we are a thriving tech ecosystem designed to empower individuals on their journey through the ever-evolving world of technology. Our mission is to foster a collaborative environment where people can ask questions, share knowledge, and connect with like-minded individuals and professionals from leading tech companies.
                    </p>
                    <p className="text-gray-700 mb-4">
                        Whether you're seeking guidance, networking opportunities, or the latest resources, Let's Code is your go-to destination for all things tech. So, whether you're a student, a developer, or someone passionate about tech, join us to build, learn, and grow in a supportive community that's dedicated to your success.
                    </p>
                    <p className="font-semibold text-indigo-600">Let's Code the future together!</p>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default DetailsSection;