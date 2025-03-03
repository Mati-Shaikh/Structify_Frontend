import React, { useEffect, useState } from 'react';
import { Trophy, Star, ChevronRight, RotateCcw, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const GameCompletionCard = () => {
  const [showContent, setShowContent] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(null);
  const [coins, setCoins] = useState(0);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isRatingSubmitted, setIsRatingSubmitted] = useState(false);
  const [ratingError, setRatingError] = useState('');
  const location = useLocation();

  // Fetch coins and level data on component mount
  useEffect(() => {
    const contentTimer = setTimeout(() => setShowContent(true), 500);
    
    // Retrieve current level data from URL query
    const levelId = new URLSearchParams(location.search).get('levelId');
    const levelName = new URLSearchParams(location.search).get('levelName');
    if (levelId && levelName) {
      setCurrentLevel({ id: parseInt(levelId, 10), name: levelName });
    }

    // Fetch the current coins from the server
    const fetchCoins = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch('http://localhost:3005/api/users/coins', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            token: token,
          },
        });
        const data = await response.json();
        setCoins(data.coins);
      } catch (error) {
        console.error("Error fetching coins:", error);
      }
    };

    fetchCoins();

    return () => {
      clearTimeout(contentTimer);
    };
  }, [location.search]);

  const handleRating = async (value) => {
    setRating(value);
    setRatingError('');

    if (!currentLevel?.id) {
      setRatingError('Level ID is missing');
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch('http://localhost:3005/api/users/submitRating', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: token,
        },
        body: JSON.stringify({
          levelId: currentLevel.id,
          rating: value
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setIsRatingSubmitted(true);
        console.log('Rating submitted successfully:', data);
      } else {
        setRatingError(data.message || 'Failed to submit rating');
        console.error('Rating submission failed:', data);
      }
    } catch (error) {
      setRatingError('Network error. Please try again.');
      console.error("Error submitting rating:", error);
    }
  };

  const handleContinueLearning = () => {
    if (isRatingSubmitted) {
      window.location.href = '/learningpath';
    }
  };
  
  const handlePlayAgain = () => {
    // Navigate to /game/level{currentLevel.id} route
    const levelId = currentLevel?.id;
    if (levelId) {
      window.location.href = `/game/level${levelId}`;
    }
  };
  
  const handleNextLevel = () => {
    // Navigate to /game/level{currentLevel.id + 1} route
    const currentLevelId = parseInt(currentLevel?.id || "0", 10);
    const nextLevelId = currentLevelId + 1;
    window.location.href = `/game/level${nextLevelId}`;
  };

  const submitFeedback = () => {
    setIsFeedbackOpen(true);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-100"
      >
        {/* Header section - modern gradient */}
        <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-sky-500 p-6 text-white relative overflow-hidden">
          {/* Abstract decoration shapes */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full -ml-8 -mb-8"></div>
          
          <div className="flex items-center space-x-4 relative z-10">
            <motion.div
              initial={{ rotate: -180, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: 'spring', duration: 1.2 }}
              className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg"
            >
              <Trophy size={28} className="text-yellow-500" />
            </motion.div>
            <div>
              <h2 className="text-2xl font-bold">Congratulations!</h2>
              <p className="text-blue-100 text-sm">You've mastered this level</p>
            </div>
          </div>
        </div>

        {/* Content section */}
        <div className="p-6">
          <AnimatePresence>
            {showContent && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="space-y-5"
              >
                {/* Level info */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-500 text-sm">LEVEL COMPLETED</p>
                      <p className="font-bold text-lg text-gray-800">{currentLevel?.name || "Current Level"}</p>
                    </div>
                  </div>
                </div>
                
                {/* Coin earned with custom coin icon */}
                <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-4 border border-yellow-100">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-amber-700 text-sm font-medium">COINS EARNED</p>
                      <div className="flex items-center mt-1">
                        <span className="text-2xl font-bold text-amber-600">+30</span>
                        <div className="w-6 h-6 ml-2 bg-yellow-400 rounded-full flex items-center justify-center text-yellow-800 font-bold text-xs shadow-inner border border-yellow-500">$</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-amber-700 text-sm font-medium">TOTAL</p>
                      <div className="flex items-center justify-end mt-1">
                        <span className="text-xl font-bold text-amber-600">{coins}</span>
                        <div className="w-5 h-5 ml-2 bg-yellow-400 rounded-full flex items-center justify-center text-yellow-800 font-bold text-xs shadow-inner border border-yellow-500">$</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Rating section with modern styling */}
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                  <p className="text-blue-800 text-sm font-medium mb-3">RATE THIS LEVEL</p>
                  <div className="flex justify-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => handleRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="focus:outline-none transition-transform hover:scale-110"
                        disabled={isRatingSubmitted}
                      >
                        <Star
                          fill={(hoverRating || rating) >= star ? "currentColor" : "none"}
                          size={28}
                          className={
                            (hoverRating || rating) >= star
                              ? "text-yellow-500"
                              : "text-gray-300"
                          }
                        />
                      </button>
                    ))}
                  </div>
                  {!isRatingSubmitted && !ratingError && (
                    <p className="text-red-500 text-xs mt-2 text-center">
                      Please rate to continue
                    </p>
                  )}
                  {ratingError && (
                    <p className="text-red-500 text-xs mt-2 text-center">
                      {ratingError}
                    </p>
                  )}
                  {isRatingSubmitted && (
                    <p className="text-green-500 text-xs mt-2 text-center">
                      Rating submitted successfully!
                    </p>
                  )}
                </div>
                
                {/* Game action buttons - new "Play Again" and "Next Level" */}
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={handlePlayAgain} 
                    className={`py-3 px-2 rounded-xl font-medium flex items-center justify-center gap-1 transition-all
                      bg-white text-indigo-600 border-2 border-indigo-200 hover:border-indigo-400 
                      hover:bg-indigo-50 hover:shadow transform hover:-translate-y-1`}
                  >
                    <RotateCcw size={18} />
                    Play Again
                  </button>
                  
                  <button 
                    onClick={handleNextLevel} 
                    disabled={!isRatingSubmitted}
                    className={`py-3 px-2 rounded-xl font-medium flex items-center justify-center gap-1 transition-all
                      ${isRatingSubmitted 
                        ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:shadow-lg hover:from-green-600 hover:to-emerald-600 transform hover:-translate-y-1"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
                  >
                    Next Level
                    <ArrowRight size={18} />
                  </button>
                </div>
                
                {/* Continue Learning button now moved to bottom */}
                <button 
                  onClick={handleContinueLearning} 
                  className={`w-full py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all ${
                    isRatingSubmitted 
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg hover:from-blue-700 hover:to-indigo-700 transform hover:-translate-y-1" 
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                  disabled={!isRatingSubmitted}
                >
                  Continue Learning
                  <ChevronRight size={20} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default GameCompletionCard;