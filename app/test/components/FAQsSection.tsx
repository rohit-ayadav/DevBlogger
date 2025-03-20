
// components/FAQsSection.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface FAQ {
    question: string;
    answer: string;
}

interface FAQsSectionProps {
    containerVariants: any;
    itemVariants: any;
}

const FAQsSection: React.FC<FAQsSectionProps> = ({ containerVariants, itemVariants }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqs: FAQ[] = [
        {
            question: "Who can participate in Code2Career?",
            answer: "Code2Career is open to all CS/IT students and professionals who want to test their placement readiness. It's ideal for final year students preparing for placements, but anyone interested in assessing their technical skills is welcome to join."
        },
        {
            question: "Is there a registration fee?",
            answer: "No, Code2Career is completely free to enter. We believe in making quality assessment opportunities accessible to everyone in our tech community."
        },
        {
            question: "How will the event be conducted?",
            answer: "The event consists of three rounds: Aptitude Challenge (Apr 12), CS Fundamentals (Apr 13), and Coding Arena (Apr 20). All rounds will be conducted online through our platform. Participants will receive login details and instructions after registration."
        },
        {
            question: "Do I need to participate in all three rounds?",
            answer: "Yes, to be eligible for prizes and certificates, participants need to complete all three rounds. Your final ranking will be calculated based on cumulative performance across all rounds."
        },
        {
            question: "What topics should I prepare for the CS Fundamentals round?",
            answer: "The CS Fundamentals round covers Data Structures, Algorithms, DBMS, Operating Systems, OOP concepts, Computer Networks, and other core CS subjects typically asked in placement interviews."
        },
        {
            question: "What programming languages are supported in the Coding round?",
            answer: "The coding platform supports C, C++, Java, Python, and JavaScript. You can choose any of these languages to solve the problems in the final round."
        },
        {
            question: "How will winners be determined?",
            answer: "Winners will be determined based on cumulative scores across all three rounds. In case of ties, the time taken to complete each round will be considered as a tiebreaker."
        },
        {
            question: "When and how will I receive my certificate?",
            answer: "Participation certificates will be sent via email within 7 days after the event concludes. Winners will receive special certificates along with their prizes."
        },
        {
            question: "What if I face technical issues during the event?",
            answer: "We have a dedicated support team ready to assist you. You can reach out through our WhatsApp support group or email us at support@letscode.community for immediate assistance."
        },
        {
            question: "Can I participate if I'm not from a CS/IT background?",
            answer: "Yes, while the event is primarily designed for CS/IT students, anyone interested in testing their aptitude, logical reasoning, and coding skills is welcome to participate."
        }
    ];

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faqs" >
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
                    Frequently Asked Questions
                </motion.h2>

                <motion.div
                    variants={itemVariants}
                    className="bg-white rounded-xl shadow-sm overflow-hidden"
                >
                    <div className="divide-y divide-gray-200">
                        {faqs.map((faq, index) => (
                            <div key={index} className="border-b border-gray-200 last:border-b-0">
                                <button
                                    className="w-full px-6 py-4 text-left hover:bg-gray-50 focus:outline-none flex justify-between items-center"
                                    onClick={() => toggleFAQ(index)}
                                >
                                    <span className="font-medium text-gray-900">{faq.question}</span>
                                    <svg
                                        className={`w-5 h-5 text-indigo-500 transform ${openIndex === index ? 'rotate-180' : ''}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                </button>
                                <div className={`px-6 pb-4 ${openIndex === index ? 'block' : 'hidden'}`}>
                                    <p className="text-gray-600">{faq.answer}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    className="bg-indigo-50 rounded-xl shadow-sm p-6 mt-8"
                >
                    <h3 className="text-xl font-semibold mb-4 text-indigo-800">Still have questions?</h3>
                    <p className="text-indigo-700 mb-4">
                        If you couldn't find the answers you were looking for, please feel free to reach out to us.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <a href="https://chat.whatsapp.com/HS6IA6QFhqS7s6ff1LAfyy" className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md inline-flex items-center justify-center transition duration-150 ease-in-out">
                            <svg className="w-5 h-5 mr-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            Join WhatsApp Support Group
                        </a>
                        <a href="mailto:support@letscode.community" className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md inline-flex items-center justify-center transition duration-150 ease-in-out">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                            </svg>
                            Email Us
                        </a>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default FAQsSection;