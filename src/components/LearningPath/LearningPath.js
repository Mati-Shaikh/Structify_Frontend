import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { User, Settings, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { useNavigate } from "react-router-dom";
import { BookOpen, Lock, Check, Play, ChevronRight, Link2, AlertTriangle, Book, Award, Smile, Frown, Meh, ThumbsUp, Heart } from 'lucide-react';
const LevelFeedback = ({ levelId, onClose }) => {
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [showToast, setShowToast] = useState(false);
  
  const feedbackOptions = [
    { icon: <Smile size={24} className="text-green-500" />, label: "Easy & Fun" },
    { icon: <Heart size={24} className="text-red-500" />, label: "Challenging but Good" },
    { icon: <Meh size={24} className="text-yellow-500" />, label: "Need More Practice" },
    { icon: <ThumbsUp size={24} className="text-blue-500" />, label: "Very Helpful" },
  ];

  const handleFeedbackSubmit = (label) => {
    setSelectedFeedback(label);
    // Here you can add API call to save feedback
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
      {showToast && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg"
        >
          Thank you for your feedback!
        </motion.div>
      )}
      
      {selectedFeedback ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-4"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.5 }}
            className="w-12 h-12 mx-auto bg-blue-50 rounded-full flex items-center justify-center mb-3"
          >
            <ThumbsUp className="text-blue-500" />
          </motion.div>
          <h3 className="text-lg font-semibold text-gray-800">Thank you!</h3>
          <p className="text-sm text-gray-600 mt-1">Your feedback helps us improve the learning experience</p>
        </motion.div>
      ) : (
        <>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">How was this level?</h3>
          <div className="grid grid-cols-2 gap-3">
            {feedbackOptions.map(({ icon, label }, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleFeedbackSubmit(label)}
                className="flex items-center gap-2 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                {icon}
                <span className="text-sm text-gray-700">{label}</span>
              </motion.button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

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
            href="/home"
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



const Tooltip = ({ children, content }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className="absolute z-50 -top-14 left-1/2 transform -translate-x-1/2 transition-all duration-200 ease-in-out">
          <div className="bg-white text-gray-800 px-4 py-2 rounded-lg shadow-lg border border-gray-100 text-sm font-medium whitespace-nowrap max-w-xs">
            {content}
            <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2.5 h-2.5 bg-white border-b border-r border-gray-100" />
          </div>
        </div>
      )}
    </div>
  );
};



const LearningPath = () => {
  const navigate = useNavigate();
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

  const handleLevelClick = (level) => {
    if (!level.isLocked) {
      navigate(`/game/level${level.id}`);
    }
  };

  const handleAssessmentClick = (assessment, sectionIndex) => {
    if (!assessment.isLocked) {
      navigate(`/assessment${sectionIndex + 1}`);
    }
  };

  if (loading) {
    return (
      <div className="flex-col gap-4 mt-64 w-full flex items-center justify-center">
        <div className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
          <div className="w-16 h-16 border-4 border-transparent text-green-400 text-2xl animate-spin flex items-center justify-center border-t-green-400 rounded-full"></div>
        </div>
      </div>
    );
  }

  const getLevelTooltipContent = (level) => {
    if (level.isLocked) return "Complete previous levels to unlock";
    if (level.isCompleted) return "Level completed";
    if (level.danger) return "You lack concepts from this level. Play again";
    return "Click to start this level";
  };

  const getAssessmentTooltipContent = (assessment) => {
    if (assessment.isLocked) return "Complete all levels to unlock assessment";
    if (assessment.isCompleted) return "Assessment completed";
    if (assessment.danger) return "Complete lacking levels and attempt again";
    return "Ready to test your knowledge";
  };

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
      {/* Left Panel remains unchanged */}
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

      {/* Enhanced Right Panel */}
      <div className="flex-1 overflow-y-auto mt-28">
        <div className="p-8">
          <div className="max-w-2xl mx-auto">
            {learningPath?.topics[0].subtopics.map((section, sectionIndex) => (
              <div key={sectionIndex} className="mb-12">
                {/* Subtopic Header with enhanced styling */}
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                    <span className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm mr-3 shadow-md">
                      {sectionIndex + 1}
                    </span>
                    {section.subtopic}
                  </h2>
                </div>

                {/* Enhanced Levels */}
                {section.levels.map((level, index) => (
                  <div key={level.id} className="relative">
                    {/* Improved connecting line with gradient */}
                    {(index !== section.levels.length - 1 || section.assessment) && (
                      <div className="absolute left-[19px] top-10 bottom-0 w-1 bg-gradient-to-b from-blue-200 to-purple-200 rounded-full" />
                    )}

                    {/* Enhanced Level Box */}
                    <Tooltip content={getLevelTooltipContent(level)}>
                    <div className="flex mb-6 group">

                      
                        <div className="flex items-center">
                          <div
                            className={`
                              w-10 h-10 rounded-xl shadow-md flex items-center justify-center 
                              transform transition-all duration-300 group-hover:scale-110
                              ${level.isCompleted ? 'bg-gradient-to-br from-green-400 to-green-600' :
                                level.isLocked ? 'bg-gray-200' :
                                  level.danger ? 'bg-gradient-to-br from-red-400 to-red-600' :
                                    'bg-gradient-to-br from-blue-400 to-purple-500'}
                            `}
                          >
                            {level.isLocked ? (
                              <Lock className="w-5 h-5 text-gray-500" />
                            ) : level.isCompleted ? (
                              <Check className="w-5 h-5 text-white" />
                            ) : level.danger ? (
                              <AlertTriangle className="w-5 h-5 text-white" />
                            ) : (
                              <Play className="w-5 h-5 text-white" />
                            )}
                          </div>

                          {level.danger && !level.isLocked && !level.isCompleted && (
                            <div className="w-2 h-2 bg-red-500 rounded-full absolute -top-1 -right-1" />
                          )}
                        </div>
                      


                      {/* Enhanced Level Content */}
                      <div
                        className="ml-4 flex-1 cursor-pointer"
                        onClick={() => handleLevelClick(level)}
                      >
                        <div
                          className={`
                            relative overflow-hidden bg-white rounded-xl p-4 shadow-sm border
                            transform transition-all duration-300
                            ${level.isCompleted ? 'border-green-200 hover:border-green-300' :
                              level.isLocked ? 'border-gray-200 cursor-not-allowed' :
                                level.danger ? 'border-red-200 hover:border-red-300' :
                                  'border-purple-200 hover:border-purple-300 hover:shadow-md'}
                          `}
                        >
                          <div className="flex justify-between items-center relative z-10">
                            <h3 className="font-medium text-gray-800">{level.name}</h3>
                            <span className="text-xs text-gray-500">7.5 min</span>
                          </div>

                          {/* Completion animation background */}
                          {level.isCompleted && (
                            <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-blue-50 opacity-30" />
                          )}

                          {/* Active level indicator */}
                          {!level.isLocked && !level.isCompleted && (
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-blue-50 opacity-20" />
                          )}

                      {level.isCompleted && (
                              <div className="mt-4">
                                <LevelFeedback 
                                  levelId={level.id} 
                                  onClose={() => console.log('Feedback closed for level:', level.id)} 
                                />
                              </div>
                            )}

                        </div>
                      </div>
                    </div>
              

                    </Tooltip>
                  </div>
                ))}


                {/* Enhanced Assessment */}
                <div className="relative ml-5 mb-8">
                  <Tooltip content={getAssessmentTooltipContent(section.assessment)}>
                    <div 
                      className="flex group"
                      onClick={() => handleAssessmentClick(section.assessment, sectionIndex)}
                    >
                      <div className="relative">
                        <div 
                          className={`
                            w-12 h-12 rounded-xl shadow-md flex items-center justify-center 
                            transform transition-all duration-300 group-hover:scale-110
                            ${section.assessment.isCompleted ? 'bg-gradient-to-br from-green-400 to-green-600' :
                              section.assessment.isLocked ? 'bg-gray-200' :
                              section.assessment.danger ? 'bg-gradient-to-br from-red-400 to-red-600' :
                              'bg-gradient-to-br from-yellow-300 to-orange-400'}
                          `}
                        >
                          {section.assessment.isLocked ? (
                            <BookOpen className="w-6 h-6 text-gray-600" />
                          ) : section.assessment.isCompleted ? (
                            <Check className="w-6 h-6 text-white" />
                          ) : section.assessment.danger ? (
                            <AlertTriangle className="w-6 h-6 text-white" />
                          ) : (
                            <BookOpen className="w-6 h-6 text-white" />
                          )}
                        </div>

                        
                      </div>

                      <div className="ml-4 flex-1 cursor-pointer">
                        <div 
                          className={`
                            relative overflow-hidden bg-white rounded-xl p-4 shadow-sm border
                            transform transition-all duration-300
                            ${section.assessment.isCompleted ? 'border-green-200 hover:border-green-300' :
                              section.assessment.isLocked ? 'border-gray-200 cursor-not-allowed' :
                              section.assessment.danger ? 'border-red-200 hover:border-red-300' :
                              'border-yellow-200 hover:border-yellow-300 hover:shadow-md'}
                          `}
                        >
                          <div className="flex justify-between items-center relative z-10">
                            <div>
                              <h3 className="font-medium text-gray-800">{section.assessment.name}</h3>
                              <p className="text-xs text-gray-500 mt-1">
                                {section.assessment.isLocked ? 'Complete all levels above to unlock' : 
                                 section.assessment.isCompleted ? 'Assessment completed' :
                                 section.assessment.danger ? 'Hard Luck ! Master your lacking concepts and attempt again' :
                                 'Ready to test your knowledge?'}
                              </p>
                            </div>
                            <span className="text-xs text-gray-500">{section.assessment.duration}</span>
                          </div>
                          
                          {section.assessment.isCompleted && (
                            <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-blue-50 opacity-30" />
                          )}
                          {!section.assessment.isLocked && !section.assessment.isCompleted && !section.assessment.danger && (
                            <div className="absolute inset-0 bg-gradient-to-r from-yellow-50 to-orange-50 opacity-20" />
                          )}
                          {section.assessment.danger && !section.assessment.isLocked && !section.assessment.isCompleted && (
                            <div className="absolute inset-0 bg-gradient-to-r from-red-50 to-pink-50 opacity-20" />
                          )}
                        </div>
                        {section.assessment.danger && !section.assessment.isLocked && !section.assessment.isCompleted && (
                          <div className="w-2 h-2 bg-red-500 rounded-full absolute -top-1 -right-1" />
                        )}
                      </div>
                    </div>
                  </Tooltip>
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