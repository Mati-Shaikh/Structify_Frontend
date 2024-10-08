import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { User, Settings, LogOut } from 'lucide-react';
import { motion } from "framer-motion";
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate(); // Initialize useNavigate

    const handleLogout = () => {
        // Clear local storage
        localStorage.clear();
        // navigate to login page
        navigate('/');
    };

    return (
        <nav className="bg-white p-4 ">
            <div className="container mx-auto flex justify-between">
                {/* Structify Logo and Home Link */}
                <div className="flex items-center ml-8">
                    <a href="/" style={{ fontFamily: 'Atma, sans-serif' }} className="text-4xl font-bold pt-2 text-blue-600 font-semibold hover:text-green-600">Structify</a>
                    {/* <div className="flex ml-24">
                        <a href="/home" className="text-black font-medium text-xl flex items-center relative after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-black after:left-0 after:bottom-[-2px] after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100">
                            <FaHome className="mr-2" />
                            Home
                        </a>
                    </div> */}

                </div>

                {/* Hamburger Menu */}
                <div className="relative mr-8 ">
                    <button
                        onMouseEnter={() => setIsOpen(true)}
                        onMouseLeave={() => setIsOpen(false)}
                        className="text-black p-2 rounded hover:bg-white transition-colors"
                    >
                        {isOpen ? <X size={32} /> : <Menu size={32} />}
                    </button>

                    {/* Dropdown Menu */}

                    {isOpen && (
                        <div
                            className="absolute right-0 w-64 bg-white rounded-lg shadow-xl overflow-hidden z-10"
                            onMouseEnter={() => setIsOpen(true)}
                            onMouseLeave={() => setIsOpen(false)}
                        >

                            <div className="py-2">
                                <a href="/profile" className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                                    <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full mr-3">
                                        <User size={18} className="text-blue-600" />
                                    </span>
                                    Account
                                </a>
                                <a href="/" className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                                    <span className="inline-flex items-center justify-center w-8 h-8 bg-green-100 rounded-full mr-3">
                                        <Settings size={18} className="text-green-600" />
                                    </span>
                                    Settings
                                </a>
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                                >
                                    <span className="inline-flex items-center justify-center w-8 h-8 bg-red-100 rounded-full mr-3">
                                        <LogOut size={18} className="text-red-600" />
                                    </span>
                                    Log out
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};


const Card = ({ title, description, topics, logoSrc }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div
            className="w-80 h-96 [perspective:1000px] group"
            onMouseEnter={() => setIsFlipped(true)}
            onMouseLeave={() => setIsFlipped(false)}
        >
            <div className={`relative w-full h-full transition-all duration-500 [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}>
                {/* Front of the card */}
                <div className="absolute w-full h-full rounded-xl shadow-lg overflow-hidden [backface-visibility:hidden] bg-gradient-to-br from-white to-gray-100">
                    <div className="h-1/2 overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-6">
                        <img src={logoSrc} alt={`${title} logo`} className="w-24 h-24 object-contain" />
                    </div>
                    <div className="p-6">
                        <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
                        <p className="text-sm text-gray-600">{description}</p>
                    </div>
                    <div className="absolute bottom-4 right-4 text-blue-500 group-hover:translate-x-1 transition-transform">
                        <ChevronRight size={24} />
                    </div>
                </div>

                {/* Back of the card */}
                <div className="absolute w-full h-full rounded-xl shadow-lg overflow-hidden [backface-visibility:hidden] [transform:rotateY(180deg)] bg-gradient-to-br from-blue-50 to-purple-50">
                    <div className="p-6 h-full flex flex-col">
                        <div className="mb-6">
                            <h4 className="text-xl font-bold text-gray-800 text-center relative">
                                <span className="relative z-10">{title} Subtopics</span>
                                <span className="absolute inset-x-0 bottom-1 h-3 bg-yellow-200 -skew-x-12 transform -rotate-2 z-0"></span>
                            </h4>
                        </div>
                        <div className="flex-grow flex flex-col justify-center space-y-4">
                            {topics.map((topic, index) => (
                                <a
                                    key={index}
                                    href={index === 0 ? "/game" : "/"}
                                    className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
                                >
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                            <span className="text-blue-500 font-semibold">{index + 1}</span>
                                        </div>
                                        <span className="text-gray-700 font-medium">{topic}</span>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const HomePage = () => {
   
    return (
        <div className="min-h-screen">
            <Navbar />
            <div className="container mx-auto px-32 py-16">
                <motion.div
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl font-bold mb-4 text-gray-800">
                        Welcome, <span className="text-blue-600">{localStorage.getItem("userFullName")} !</span>
                    </h2>
                    <p className="text-xl text-gray-600">Ready to explore the world of data structures?</p>
                </motion.div>

                <div className="flex flex-wrap justify-center gap-8">
                    <Card
                        title="Linked List"
                        description="A linear data structure where elements are stored in nodes."
                        topics={['Insertion', 'Deletion', 'Traversal']}
                        logoSrc="/link.svg"
                    />
                    <Card
                        title="Stacks"
                        description="Last-In-First-Out (LIFO) data structure for temporary data storage."
                        topics={['Push operation', 'Pop operation', 'Peek operation']}
                        logoSrc="/stack.svg"
                    />
                    <Card
                        title="Queues"
                        description="First-In-First-Out (FIFO) data structure for ordered data processing."
                        topics={['Enqueue operation', 'Dequeue operation', 'Search Queue']}
                        logoSrc="/queue1.svg"
                    />
                </div>
            </div>

        </div>
    );
};

export default HomePage;