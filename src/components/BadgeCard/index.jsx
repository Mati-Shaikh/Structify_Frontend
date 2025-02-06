import React, { useEffect, useState } from 'react';
import { Trophy, Award, Crown, Star, Activity } from 'lucide-react';

const GameCompletionCard = ({ gameType, score, timeSpent }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showBadge, setShowBadge] = useState(false);

  useEffect(() => {
    // Trigger card flip animation on mount
    setTimeout(() => setIsFlipped(true), 500);
    setTimeout(() => setShowBadge(true), 1000);
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
    switch(type) {
      case 'insertion-front':
        return <Trophy className="w-12 h-12 text-yellow-500" />;
      case 'insertion-end':
        return <Award className="w-12 h-12 text-purple-500" />;
      case 'insertion-middle':
        return <Crown className="w-12 h-12 text-blue-500" />;
      case 'traversal':
        return <Star className="w-12 h-12 text-green-500" />;
      default:
        return <Activity className="w-12 h-12 text-indigo-500" />;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div 
        className={`relative w-96 h-96 transition-transform duration-1000 transform perspective-1000 ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* Front of card */}
        <div className={`absolute w-full h-full backface-hidden ${
          isFlipped ? 'opacity-0' : 'opacity-100'
        }`}>
          <div className="w-full h-full bg-white rounded-xl shadow-2xl flex items-center justify-center">
            <div className="animate-bounce">
              {getIconByGame(gameType)}
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div className={`absolute w-full h-full backface-hidden rotate-y-180 ${
          isFlipped ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-2xl p-8 text-white">
            <div className="flex flex-col items-center space-y-6">
              {/* Trophy Icon */}
              <div className="transform -rotate-12 transition-transform hover:rotate-0">
                {getIconByGame(gameType)}
              </div>

              {/* Title */}
              <h2 className="text-2xl font-bold text-center">
                Congratulations!
              </h2>
              <h3 className="text-xl font-semibold text-center">
                You've earned the title of
              </h3>
              <div className="text-2xl font-bold text-yellow-300 text-center">
                {getTitleByGame(gameType)}
              </div>

              {/* Stats */}
              <div className="mt-4 w-full">
                <div className="flex justify-between items-center">
                  <span>Score:</span>
                  <span className="font-bold">{score} points</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Time:</span>
                  <span className="font-bold">{timeSpent}s</span>
                </div>
              </div>

              {/* Badge */}
              <div className={`transition-opacity duration-500 ${
                showBadge ? 'opacity-100' : 'opacity-0'
              }`}>
                <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <span className="text-sm font-semibold">
                    Professional Badge Earned!
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameCompletionCard;