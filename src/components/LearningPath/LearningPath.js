import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { User, Settings, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Lock, Check, Play, ChevronRight, Link2} from 'lucide-react';

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

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-white p-4 ${scrolled ? 'shadow-md' : ''
      } `}>
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


const LearningPath = () => {
  const [learningPath, setLearningPath] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLearningPath = async () => {
      const token = localStorage.getItem('token');

      try {
        setLoading(true);
        const response = await fetch('http://localhost:3005/api/users/learningPath', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
               token: token, 
            },
        });
        const data = await response.json();
        setLearningPath(data.learningPath);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLearningPath();
  }, []);

  if (loading) {
    return (
        <div className="flex-col gap-4 mt-64 w-full flex items-center justify-center">
        <div
          className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full"
        >
          <div
            className="w-16 h-16 border-4 border-transparent text-green-400 text-2xl animate-spin flex items-center justify-center border-t-green-400 rounded-full"
          ></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center text-red-500">
        Error loading learning path: {error}
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-white">
      <Navbar />
      {/* Left Panel - Fixed */}
      <div className="w-96 h-96 p-8 bg-white rounded-3xl ml-32 mt-32">
        <div className="mb-8">
          {/* Course Icon */}
          <div className="w-14 h-14 mb-6 flex items-center justify-center bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl shadow-lg">
            <Link2 className="w-8 h-8 text-white" />
          </div>

          {/* Course Title & Description */}
          <h1 className="text-4xl font-bold mb-4 text-gray-900">
            {learningPath?.topics[0].topic || "Data Structures"}
          </h1>
          <p className="text-gray-600 mb-6 text-lg">
            Master the fundamentals of linked lists with interactive games and assessments.
          </p>

          {/* Lessons Count */}
          <div className="inline-flex items-center px-4 py-2 bg-gray-50 rounded-2xl">
            <ChevronRight className="w-5 h-5 mr-2 text-gray-500" />
            <span className="text-gray-600 font-medium">
              {learningPath?.topics[0].subtopics.reduce(
                (acc, subtopic) => acc + subtopic.levels.length,
                0
              ) || 0} Levels
            </span>
          </div>
        </div>
      </div>

      {/* Right Panel - Scrollable */}
      <div className="flex-1 overflow-y-auto mt-28">
        <div className="p-8">
          <div className="max-w-2xl mx-auto">
            {learningPath?.topics[0].subtopics.map((section, sectionIndex) => (
              <div key={sectionIndex} className="mb-12">
                {/* Subtopic Header */}
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-700 flex items-center">
                    <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm mr-3">
                      {sectionIndex + 1}
                    </span>
                    {section.subtopic}
                  </h2>
                </div>

                {/* Levels */}
                {section.levels.map((level, index) => (
                  <div key={level.id} className="relative">
                    {/* Connecting Line */}
                    {(index !== section.levels.length - 1 || section.assessment) && (
                      <div className="absolute left-[19px] top-10 bottom-0 w-0.5 bg-gradient-to-b from-purple-200 to-gray-200" />
                    )}

                    {/* Level Box */}
                    <div className="flex mb-6 group">
                      {/* Level Icon/Status */}
                      <div className={`
                        w-10 h-10 rounded-lg shadow-sm flex items-center justify-center 
                        transform transition-all duration-300 group-hover:scale-105
                        ${level.isCompleted ? 'bg-green-500' :
                          level.isLocked ? 'bg-gray-200' : 'bg-blue-500'}
                      `}>
                        {level.isLocked ? (
                          <Lock className="w-5 h-5 text-gray-500" />
                        ) : level.isCompleted ? (
                          <Check className="w-5 h-5 text-white" />
                        ) : (
                          <Play className="w-5 h-5 text-white" />
                        )}
                      </div>

                      {/* Level Content */}
                      <div className="ml-4 flex-1">
                        <div className={`
                          bg-white rounded-lg p-4 shadow-sm border 
                          transform transition-all duration-300 group-hover:scale-102
                          ${level.isCompleted ? 'border-green-200' :
                            level.isLocked ? 'border-gray-200' : 'border-purple-200'}
                        `}>
                          <div className="flex justify-between items-center">
                            <h3 className="font-medium text-gray-800">{level.name}</h3>
                            <span className="text-xs text-gray-500">7.5 min</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Assessment */}
                <div className="relative ml-5 mb-8">
                  <div className="flex group">
                    {/* Assessment Icon */}
                    <div className={`
                      w-12 h-12 rounded-lg shadow-sm flex items-center justify-center 
                      transform transition-all duration-300 group-hover:scale-105
                      ${section.assessment.isLocked ? 'bg-gray-200' : 'bg-yellow-400'}
                    `}>
                      <BookOpen className="w-6 h-6 text-gray-600" />
                    </div>

                    {/* Assessment Content */}
                    <div className="ml-4 flex-1">
                      <div className="bg-yellow-50 rounded-lg p-4 shadow-sm border border-yellow-200">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-medium text-gray-800">{section.assessment.name}</h3>
                            <p className="text-xs text-gray-500 mt-1">Complete all levels above to unlock</p>
                          </div>
                          <span className="text-xs text-gray-500">{section.assessment.duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningPath;