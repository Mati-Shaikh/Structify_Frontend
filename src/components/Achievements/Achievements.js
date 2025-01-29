import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  Lock,
  Unlock,
  Star,
  User,
  Settings,
  LogOut,
  Award,
  Book,
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const badges = [
  {
    name: "Linked List Explorer",
    description: "Complete all Linked List levels and assessments",
    unlocked: true,
  },
  {
    name: "Queue Conqueror",
    description: "Master Queues by passing all levels and assessments",
    unlocked: false,
  },
  {
    name: "Stack Strategist",
    description: "Master Stacks topic completely",
    unlocked: true,
  },
  {
    name: "Insertion Master",
    description: "Complete all insertion levels and assessments",
    unlocked: false,
  },
  {
    name: "Traversal Trailblazer",
    description: "Master traversal techniques and assessments",
    unlocked: false,
  },
  {
    name: "Deletion Dynamo",
    description: "Complete deletion subtopic and assessments",
    unlocked: false,
  },
  {
    name: "Data Structure Prodigy",
    description: "Complete all topics in the tutoring system",
    unlocked: false,
  },
  {
    name: "Assessment Ace",
    description: "Score exceptionally high in any assessment",
    unlocked: true,
  },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = () => {
    // Clear local storage
    localStorage.clear();
    // navigate to login page
    navigate("/");
  };

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-white p-4 ${
        scrolled ? "shadow-md" : ""
      } `}
    >
      <div className="container mx-auto flex justify-between">
        {/* Structify Logo and Home Link */}
        <div className="flex items-center ml-8">
          <a
            href="/"
            style={{ fontFamily: "Atma, sans-serif" }}
            className="text-4xl font-bold pt-2 text-blue-600 font-semibold hover:text-green-600"
          >
            Structify
          </a>
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
                <a
                  href="/profile"
                  className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                >
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full mr-3">
                    <User size={18} className="text-blue-600" />
                  </span>
                  Account
                </a>
                <a
                  href="/learningPath"
                  className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                >
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-yellow-100 rounded-full mr-3">
                    <Book size={18} className="text-yellow-600" />
                  </span>
                  Learning Plan
                </a>
                <a
                  href="/achievements"
                  className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                >
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-purple-100 rounded-full mr-3">
                    <Award size={18} className="text-purple-600" />
                  </span>
                  Achievements
                </a>
                <a
                  href="/"
                  className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                >
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

const Achievements = () => {
  const totalBadges = badges.length;
  const unlockedBadges = badges.filter((badge) => badge.unlocked).length;
  const coinCount = 280;

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (loading) {
    return (
      <div className="flex-col gap-4 mt-64 w-full flex items-center justify-center">
        <div className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
          <div className="w-16 h-16 border-4 border-transparent text-green-400 text-2xl animate-spin flex items-center justify-center border-t-green-400 rounded-full"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center text-red-500">
        Error loading current Status: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen text-center">
      <Navbar />
      <div className="max-w-6xl mx-auto p-8 mt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Coins Card */}
          <div className="bg-white border border-gray-300 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-yellow-400 rounded-xl flex items-center justify-center">
                <Star size={32} className="text-yellow-800" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-700">
                  Coins Earned
                </h3>
                <p className="text-4xl font-bold text-yellow-600">
                  {coinCount}
                </p>
              </div>
            </div>
          </div>

          {/* Badges Summary Card */}
          <div className="bg-white border border-gray-300 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center">
                <Unlock size={32} className="text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-700">
                  Badges Progress
                </h3>
                <p className="text-4xl font-bold text-purple-600">
                  {unlockedBadges}{" "}
                  <span className="text-lg text-gray-500">/ {totalBadges}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {badges.map((badge, index) => (
            <div
              key={index}
              className={`
                rounded-xl p-4 text-center transition-all duration-300
                ${
                  badge.unlocked
                    ? "bg-white border-2 border-green-200 shadow-md"
                    : "bg-gray-100 border border-gray-300 opacity-70"
                }
                `}
            >
              <div className="flex justify-center mb-4">
                {badge.unlocked ? (
                  <Unlock size={48} className="text-green-600" />
                ) : (
                  <Lock size={48} className="text-gray-400" />
                )}
              </div>
              <h4
                className={`
                font-semibold mb-2 
                ${badge.unlocked ? "text-green-800" : "text-gray-500"}
                `}
              >
                {badge.name}
              </h4>
              <p
                className={`
                text-sm 
                ${badge.unlocked ? "text-green-600" : "text-gray-400"}
                `}
              >
                {badge.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Achievements;
