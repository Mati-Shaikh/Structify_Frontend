import React, { useEffect, useState } from 'react';
import { Trophy, Award, Crown, Star, Activity, Check, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const GameCompletionCard = ({ gameType, score, timeSpent, onClose }) => {
  const [showStats, setShowStats] = useState(false);
  const [showBadge, setShowBadge] = useState(false);

  useEffect(() => {
    const statsTimer = setTimeout(() => setShowStats(true), 500);
    const badgeTimer = setTimeout(() => setShowBadge(true), 1000);
    
    return () => {
      clearTimeout(statsTimer);
      clearTimeout(badgeTimer);
    };
  }, []);

  const getTitleByGame = (type) => {
    const titles = {
      'insertion-front': 'Front Insertion Master',
      'insertion-end': 'End Insertion Expert',
      'insertion-middle': 'Middle Insertion Wizard',
      'traversal': 'Traversal Champion',
      'default': 'Linked List Pro'
    };
    return titles[type] || titles.default;
  };

  const getIconByGame = (type) => {
    const iconProps = { size: 28 };
    switch(type) {
      case 'insertion-front':
        return <Trophy {...iconProps} className="text-yellow-500" />;
      case 'insertion-end':
        return <Award {...iconProps} className="text-purple-500" />;
      case 'insertion-middle':
        return <Crown {...iconProps} className="text-blue-500" />;
      case 'traversal':
        return <Star {...iconProps} className="text-green-500" />;
      default:
        return <Activity {...iconProps} className="text-blue-600" />;
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
      >
        {/* Header Section */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 text-white">
          <div className="flex items-center justify-center mb-4">
            <motion.div
              initial={{ rotate: -180, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: "spring", duration: 1.5 }}
              className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg"
            >
              {getIconByGame(gameType)}
            </motion.div>
          </div>
          <h2 className="text-2xl font-bold text-center mb-2">Congratulations!</h2>
          <p className="text-blue-100 text-center">You've mastered this level</p>
        </div>

        {/* Content Section */}
        <div className="p-6">
          <AnimatePresence>
            {showStats && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Title Card */}
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <p className="text-gray-600 text-sm mb-2">You've earned the title</p>
                  <h3 className="text-xl font-bold text-gray-900">{getTitleByGame(gameType)}</h3>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 rounded-xl p-4">
                    <p className="text-blue-600 text-sm mb-1">Score</p>
                    <p className="text-2xl font-bold text-gray-900">{score}</p>
                    <p className="text-gray-500 text-sm">points</p>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4">
                    <p className="text-green-600 text-sm mb-1">Time</p>
                    <p className="text-2xl font-bold text-gray-900">{timeSpent}</p>
                    <p className="text-gray-500 text-sm">seconds</p>
                  </div>
                </div>

                {/* Badge */}
                <AnimatePresence>
                  {showBadge && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-center"
                    >
                      <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-6 py-3 rounded-full flex items-center gap-2 shadow-lg">
                        <Award size={20} />
                        <span className="font-medium">Professional Badge Earned!</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Feedback Prompt */}
                <div className="text-center space-y-4">
                  <p className="text-gray-600">How was your experience with this level?</p>
                  <div className="flex justify-center gap-3">
                    {["😊", "🤔", "😕"].map((emoji, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-xl hover:bg-gray-100 transition-colors"
                      >
                        {emoji}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Continue Button */}
                <button
  onClick={() => (window.location.href = "/learningpath")}
  className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
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