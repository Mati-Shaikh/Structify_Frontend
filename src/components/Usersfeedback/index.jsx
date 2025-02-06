import React, { useState, useEffect } from 'react';
import { Smile, Heart, Meh, ThumbsUp, User } from 'lucide-react';

const LevelFeedback = ({ levelId, onClose }) => {
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [allFeedbacks, setAllFeedbacks] = useState([]);
  
  const feedbackOptions = [
    { icon: <Smile size={24} className="text-green-500" />, label: "Easy & Fun" },
    { icon: <Heart size={24} className="text-red-500" />, label: "Challenging but Good" },
    { icon: <Meh size={24} className="text-yellow-500" />, label: "Need More Practice" },
    { icon: <ThumbsUp size={24} className="text-blue-500" />, label: "Very Helpful" },
  ];

  // Simulated user feedback data - in real app, fetch from API
  useEffect(() => {
    setAllFeedbacks([
      {
        userId: '1',
        userName: 'Alice Chen',
        feedback: 'Easy & Fun',
        timestamp: '2 hours ago'
      },
      {
        userId: '2',
        userName: 'Bob Smith',
        feedback: 'Challenging but Good',
        timestamp: '1 day ago'
      },
      {
        userId: '3',
        userName: 'Carol Johnson',
        feedback: 'Very Helpful',
        timestamp: '2 days ago'
      }
    ]);
  }, []);

  const handleFeedbackSubmit = (label) => {
    setSelectedFeedback(label);
    const newFeedback = {
      userId: 'current-user',
      userName: 'You',
      feedback: label,
      timestamp: 'Just now'
    };
    setAllFeedbacks(prev => [newFeedback, ...prev]);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const getFeedbackIcon = (feedbackLabel) => {
    const option = feedbackOptions.find(opt => opt.label === feedbackLabel);
    return option ? option.icon : <ThumbsUp size={24} className="text-blue-500" />;
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
      {showToast && (
        <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg animate-fade-in">
          Thank you for your feedback!
        </div>
      )}
      
      {!selectedFeedback ? (
        <>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">How was this level?</h3>
          <div className="grid grid-cols-2 gap-3">
            {feedbackOptions.map(({ icon, label }, index) => (
              <button
                key={index}
                onClick={() => handleFeedbackSubmit(label)}
                className="flex items-center gap-2 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors hover:scale-105 transform duration-200"
              >
                {icon}
                <span className="text-sm text-gray-700">{label}</span>
              </button>
            ))}
          </div>
        </>
      ) : null}
      
      <div className="mt-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Recent Feedback</h4>
        <div className="space-y-3">
          {allFeedbacks.map((feedback, index) => (
            <div 
              key={index}
              className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all duration-200"
            >
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <User size={16} className="text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-800">
                    {feedback.userName}
                  </span>
                  <span className="text-xs text-gray-500">
                    {feedback.timestamp}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  {getFeedbackIcon(feedback.feedback)}
                  <span className="text-sm text-gray-600">
                    {feedback.feedback}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LevelFeedback;