
// components/ReviewsSection.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface ReviewsSectionProps {
    containerVariants: any;
    itemVariants: any;
}

const ReviewsSection: React.FC<ReviewsSectionProps> = ({ containerVariants, itemVariants }) => {
    return (
        <section id="reviews">
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
                    Participant Reviews
                </motion.h2>

                <motion.div
                    variants={itemVariants}
                    className="bg-white rounded-xl shadow-sm p-8 text-center"
                >
                    <div className="text-6xl mb-6">📣</div>
                    <h3 className="text-xl font-semibold mb-4">Reviews Coming Soon!</h3>
                    <p className="text-gray-600 mb-6">
                        Participant reviews and testimonials will be available after the event concludes.
                        Please check back after April 25, 2025 to see what other participants have to say about their Code2Career experience.
                    </p>
                    <div className="py-8 flex justify-center">
                        <svg className="animate-spin h-12 w-12 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    </div>
                    <p className="text-gray-500 italic">
                        Participating in Code2Career? We'd love to hear from you after the event!
                        Your feedback helps us improve future events.
                    </p>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default ReviewsSection;
