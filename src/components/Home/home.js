import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Footer from '../LandingPageComponents/Footer';
import { FaUser, FaCog, FaSignOutAlt, FaHome } from "react-icons/fa";


const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-white p-4">
            <div className="container mx-auto flex justify-between">
                {/* Structify Logo and Home Link */}
                <div className="flex items-center ml-8">
                    <div className="text-black font-bold text-3xl flex items-center">

                        Structify
                    </div>
                    <div className="flex ml-24">
                        <a href="/home" className="text-black font-bold text-xl flex items-center relative after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-black after:left-0 after:bottom-[-2px] after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100">
                            <FaHome className="mr-2" />
                            Home
                        </a>
                    </div>

                </div>

                {/* Hamburger Menu */}
                <div className="relative">
                    <button
                        onMouseEnter={() => setIsOpen(true)}
                        onMouseLeave={() => setIsOpen(false)}
                        className="text-black p-2 rounded hover:bg-white transition-colors"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>

                    {/* Dropdown Menu */}
                    {isOpen && (
                        <div
                            className="absolute right-0 w-48 bg-white rounded-md shadow-lg py-1 z-10 animate-fade-in"
                            onMouseEnter={() => setIsOpen(true)}
                            onMouseLeave={() => setIsOpen(false)}
                        >
                            <a href="/profile" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-300 ease-in-out transform hover:scale-105">
                                <FaUser className="mr-2" /> Account
                            </a>
                            <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-300 ease-in-out transform hover:scale-105">
                                <FaCog className="mr-2" /> Settings
                            </a>
                            <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-300 ease-in-out transform hover:scale-105">
                                <FaSignOutAlt className="mr-2" /> Logout
                            </a>
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
            className="w-80 h-96 [perspective:1000px]"
            onMouseEnter={() => setIsFlipped(true)}
            onMouseLeave={() => setIsFlipped(false)}
        >
            <div className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}>
                <div className="absolute w-full h-full bg-white rounded-lg shadow-md [backface-visibility:hidden]">
                    <div className="h-1/2 overflow-hidden rounded-t-lg">
                        <img src={logoSrc} alt={`${title} logo`} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-4">
                        <h3 className="text-xl font-bold mb-2">{title}</h3>
                        <p className="text-sm text-gray-600">{description}</p>
                    </div>
                </div>
                <div className="absolute w-full h-full bg-gray-100 rounded-lg shadow-md p-6 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                    <h4 className="text-lg font-semibold mb-4">{title} Subtopics:</h4>
                    <ul className="list-disc list-inside space-y-2">
                        {topics.map((topic, index) => (
                            <li
                                key={index}
                                className="text-gray-700 hover:text-blue-500 transition duration-300 ease-in-out transform hover:scale-105"
                            >
                                <a href="#" className="hover:underline">
                                    {topic}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
        </div>
    );
};

const HomePage = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">Welcome Structify Menu</h1>
                <div className="flex flex-wrap justify-center gap-8">
                    <Card
                        title="Linked List"
                        description="A linear data structure where elements are stored in nodes."
                        topics={['Singly Linked List', 'Doubly Linked List', 'Circular Linked List', 'Insertion', 'Deletion', 'Traversal']}
                        logoSrc="/link.svg"
                    />
                    <Card
                        title="Stacks"
                        description="Last-In-First-Out (LIFO) data structure for temporary data storage."
                        topics={['Push operation', 'Pop operation', 'Peek operation', 'isEmpty', 'Array implementation', 'Linked List implementation']}
                        logoSrc="/stack.svg"
                    />
                    <Card
                        title="Queues"
                        description="First-In-First-Out (FIFO) data structure for ordered data processing."
                        topics={['Enqueue operation', 'Dequeue operation', 'Front operation', 'Rear operation', 'Circular Queue', 'Priority Queue']}
                        logoSrc="/queue1.svg"
                    />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default HomePage;