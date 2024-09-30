import React from 'react';
import { motion } from 'framer-motion';

const TaglineAndImage = () => {
    const textVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <main className="max-w-6xl mx-auto px-4 py-12 flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
                <motion.h2 
                    className="text-5xl font-bold mb-4"
                    initial="hidden"
                    animate="visible"
                    variants={textVariants}
                >
                    Learn <span className="text-blue-500">Data Structures</span>
                </motion.h2>
                <motion.p 
                    className="text-xl mb-6"
                    initial="hidden"
                    animate="visible"
                    variants={textVariants}
                    transition={{ delay: 0.2 }}
                >
                    Intelligent Tutoring System for Learning Data Structures in a personalized learning environment through gamification.
                </motion.p>
                <motion.button 
                    className="bg-green-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-600"
                    initial="hidden"
                    animate="visible"
                    variants={textVariants}
                    transition={{ delay: 0.4 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Get started
                </motion.button>
            </div>

            <div className="md:w-1/2 ml-8">
                <div className="bg-gray-100 rounded-lg p-4 shadow-lg">
                    <div className="bg-white rounded-lg p-4 shadow">
                        <div className="w-full h-48 rounded-lg mb-4">
                            <img src='./land.png' alt='img' className="w-full h-full object-cover object-center"></img>
                        </div>
                        <div className="space-y-2">
                            <div className="bg-gray-200 h-8 w-3/4 rounded"></div>
                            <div className="bg-gray-200 h-8 w-1/2 rounded"></div>
                            <div className="bg-gray-200 h-8 w-2/3 rounded"> </div>
                        </div>
                    </div>
                    <motion.div 
                        className="mt-2 text-right text-sm text-gray-600"
                        initial="hidden"
                        animate="visible"
                        variants={textVariants}
                        transition={{ delay: 0.6 }}
                    >
                        Happy Learning !
                    </motion.div>
                </div>
            </div>
        </main>
    );
};

export default TaglineAndImage;