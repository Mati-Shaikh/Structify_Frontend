import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const navigate = useNavigate();
  const slides = [
    {
      title: "Let’s build a learning path just for you.",
      type: 'intro',
    },
    {
      title: "What do you want to focus on?",
      options: [
        { id: 'specific-skills', label: 'Learning specific skills', icon: '💻' },
        { id: 'curiosity', label: 'Following my curiosity', icon: '🌍' },
        { id: 'problem-solving', label: 'Building my problem-solving skills', icon: '🎯' },
        { id: 'basics', label: 'Brushing up on the basics', icon: '✏️' },
        { id: 'other1', label: 'Something else', icon: '🤔' },
      ],
    },
    {
      title: "What's your top goal?",
      options: [
        { id: 'growth', label: 'Professional growth', icon: '📈' },
        { id: 'sharp', label: 'Staying sharp', icon: '🎯' },
        { id: 'school', label: 'Excelling in school', icon: '📚' },
        { id: 'child', label: 'Helping my child learn', icon: '🎨' },
        { id: 'students', label: 'Helping my students learn', icon: '🍎' },
        { id: 'other2', label: 'Something else', icon: '🦄' },
      ],
    },
    {
      title: "Do you have prior knowledge of data structures?",
      options: [
        { id: 'yes-knowledge', label: 'Yes, I have prior knowledge' },
        { id: 'no-knowledge', label: 'No, I am new to this' },
      ],
      type: 'knowledge-check',
    },
    {
      title: "Let's build a learning path just for you.",
      type: 'final',
    },
  ];

  const handleOptionSelect = (slideIndex, optionId) => {
    setSelectedOptions({
      ...selectedOptions,
      [slideIndex]: optionId,
    });
  };

  const handleContinue = () => {
    if (currentSlide < slides.length - 1) {
      if (slides[currentSlide].type === 'knowledge-check') {
        if (selectedOptions[currentSlide] === 'yes-knowledge') {
            navigate('/initialQuestions');
          return;
        }
      } 
      setCurrentSlide(currentSlide + 1);
    } else {
      navigate('/home');
    }
  };

  const handleBack = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const isContinueDisabled = slides[currentSlide].options && !selectedOptions[currentSlide];

  return (
    <div className="min-h-screen bg-white p-6">
      {/* Progress bar */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="flex items-center mb-8">
          <button 
            onClick={handleBack} 
            className="mr-4 text-gray-600 hover:text-gray-800"
            disabled={currentSlide === 0}
          >
            <ChevronLeft size={24} />
          </button>
          <div className="flex-1 h-2 bg-gray-200 rounded-full">
            <div 
              className="h-full bg-green-500 rounded-full transition-all duration-300"
              style={{ width: `${(currentSlide / (slides.length - 1)) * 100}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {slides[currentSlide].type === 'final' ? (
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="w-24 h-24 bg-green-400 rounded-lg flex items-center justify-center">
                  <div className="w-8 h-8 bg-black rounded-sm" />
                </div>
              </div>
              <h1 className="text-2xl font-bold">{slides[currentSlide].title}</h1>
            </div>
          ) : (
            <>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-400 rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 bg-black rounded-sm" />
                </div>
                <h1 className="text-xl font-bold mt-2">{slides[currentSlide].title}</h1>
              </div>
              <div className="space-y-3">
                {slides[currentSlide].options?.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleOptionSelect(currentSlide, option.id)}
                    className={`w-full p-4 rounded-lg border text-left flex items-center space-x-3 hover:bg-blue-50 transition-colors ${
                      selectedOptions[currentSlide] === option.id ? 'bg-blue-100 border-blue-300' : 'border-gray-200'
                    }`}
                  >
                    <span className="text-2xl">{option.icon}</span>
                    <span className="font-medium">{option.label}</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Continue button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleContinue}
            disabled={isContinueDisabled}
            className={`w-48 py-3 px-4 rounded-full ${isContinueDisabled ? 'bg-gray-300' : 'bg-gray-900 text-white  hover:bg-gray-700 transition-colors'} `}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
