import React, { useState, useEffect } from 'react';
import { ChevronLeft, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-white p-4`}>
      <div className="container mx-auto flex justify-between">
        {/* Structify Logo and Home Link */}
        <div className="flex items-center ml-8">
          <button
            
            style={{ fontFamily: "Atma, sans-serif" }}
            className="text-4xl font-bold pt-2 text-blue-600 font-semibold hover:text-green-600"
          >
            Structify
          </button>
        </div>

        <div className="flex-1 flex items-center justify-end mr-8">
            <div className="flex items-center space-x-3 bg-gray-50 py-2 px-4 rounded-full">
              <div className="flex items-center space-x-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="text-sm text-gray-700 font-medium">Making Personalized Path</span>
              </div>
            </div>
          </div>
      </div>
    </nav>
  );
};


const Welcome = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const navigate = useNavigate();
  
  const slides = [
    {
      title: "Let's build a learning path just for you.",
      subtitle: "Answer a few questions to help us personalize your experience",
      type: 'intro',
    },
    {
      title: "What do you want to focus on?",
      subtitle: "Choose the learning approach that resonates with you",
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
      subtitle: "Tell us what you're hoping to achieve",
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
      subtitle: "This helps us adjust the content difficulty",
      options: [
        { id: 'yes-knowledge', label: 'Yes, I have prior knowledge' },
        { id: 'no-knowledge', label: 'No, I am new to this' },
      ],
      type: 'knowledge-check',
    },
    {
      title: "Perfect! We're ready to begin",
      subtitle: "We've crafted a personalized learning journey for you",
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

  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentSlide]);


  const handleBack = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const isContinueDisabled = slides[currentSlide].options && !selectedOptions[currentSlide];

  return (
    <div className="min-h-screen bg-white pb-8">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 pt-32">
        {/* Header with progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-8">
            <button 
              onClick={handleBack} 
              className={`p-2 mb-6 rounded-full hover:bg-gray-50 transition-colors ${
                currentSlide === 0 ? 'invisible' : ''
              }`}
            >
              <ChevronLeft size={24} className="text-gray-600" />
            </button>
            <div className="flex-1 mx-8">
              <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-500 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${(currentSlide / (slides.length - 1)) * 100}%` }}
                />
              </div>
              <div className="mt-2 text-sm text-gray-500 text-center">
                Step {currentSlide + 1} of {slides.length}
              </div>
            </div>
            <div className="w-10" /> {/* Spacer for alignment */}
          </div>
        </div>

        {/* Content area with animation */}
        <div className="transform transition-all duration-500 ease-out">
          <div className="text-center mb-12">
            <h1 className="text-2xl font-bold mb-4 text-gray-900">
              {slides[currentSlide].title}
            </h1>
            <p className="text-gray-600 text-lg">
              {slides[currentSlide].subtitle}
            </p>
          </div>

          {slides[currentSlide].type === 'final' ? (
            <div className="text-center">
              <div className="inline-flex p-4 rounded-2xl bg-green-400 mb-8">
                <div className="w-24 h-24 bg-white rounded-xl flex items-center justify-center">
                  <div className="w-12 h-12 bg-black rounded-lg" />
                </div>
              </div>
            </div>
          ) : (
            <div className="grid gap-4">
              {slides[currentSlide].options?.map((option, index) => (
                <button
                  key={option.id}
                  onClick={() => handleOptionSelect(currentSlide, option.id)}
                  className={`w-full p-6 rounded-2xl border-2 text-left transform transition-all duration-300 hover:scale-[1.02] ${
                    selectedOptions[currentSlide] === option.id
                      ? 'border-green-500 bg-white shadow-lg'
                      : 'border-gray-200 hover:border-green-200 hover:shadow-md'
                  }`}
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-3xl">{option.icon}</span>
                    <span className="text-lg font-medium text-gray-800">{option.label}</span>
                    {selectedOptions[currentSlide] === option.id && (
                      <div className="ml-auto">
                        <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Continue button */}
          <div className="mt-12 flex justify-center">
            <button
              onClick={handleContinue}
              disabled={isContinueDisabled}
              className={`group flex items-center space-x-2 px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 ${
                isContinueDisabled
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-900 text-white hover:bg-gray-800 hover:shadow-lg hover:translate-y-[-2px]'
              }`}
            >
              <span>Continue</span>
              <ArrowRight size={20} className="transform transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;