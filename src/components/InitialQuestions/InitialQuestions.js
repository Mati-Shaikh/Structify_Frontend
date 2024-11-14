import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const InitialQuestions = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [answeredSlides, setAnsweredSlides] = useState({}); // Track if each slide has been answered
  const navigate = useNavigate();

  const slides = [
    {
      title: "Let’s gauge your data structures knowledge!",
      type: 'intro',
    },
    {
      title: "Which of the following data structures is used to implement a linked list?",
      options: [
        { id: 'array', label: 'Array', icon: '📋' },
        { id: 'stack', label: 'Stack', icon: '📚' },
        { id: 'nodes', label: 'Nodes', icon: '🔗' },
        { id: 'queue', label: 'Queue', icon: '🚶‍♂️' },
      ],
      correct: 'nodes',
    },
    {
      title: "In a singly linked list, each node contains which of the following?",
      options: [
        { id: 'data-next', label: 'Data and address of the next node', icon: '🔗' },
        { id: 'data-only', label: 'Data only', icon: '📄' },
        { id: 'prev-only', label: 'Address of the previous node only', icon: '⬅️' },
        { id: 'both', label: 'Data and address of both previous and next nodes', icon: '↔️' },
      ],
      correct: 'data-next',
    },
    {
      title: "Which operation is used to insert an element into a stack?",
      options: [
        { id: 'insert', label: 'Insert', icon: '📥' },
        { id: 'push', label: 'Push', icon: '🔼' },
        { id: 'add', label: 'Add', icon: '➕' },
        { id: 'enqueue', label: 'Enqueue', icon: '📤' },
      ],
      correct: 'push',
    },
    {
      title: "In which order are elements removed from a stack?",
      options: [
        { id: 'fifo', label: 'First-In, First-Out', icon: '➡️' },
        { id: 'lifo', label: 'Last-In, First-Out', icon: '⬇️' },
        { id: 'random', label: 'Random order', icon: '🎲' },
        { id: 'filo', label: 'First-In, Last-Out', icon: '↩️' },
      ],
      correct: 'lifo',
    },
    {
      title: "Which operation is used to remove an element from the front of the queue?",
      options: [
        { id: 'dequeue', label: 'Dequeue', icon: '🚪' },
        { id: 'enqueue', label: 'Enqueue', icon: '📤' },
        { id: 'pop', label: 'Pop', icon: '⏬' },
        { id: 'remove', label: 'Remove', icon: '❌' },
      ],
      correct: 'dequeue',
    },
    {
      title: "Which of the following is NOT a type of queue?",
      options: [
        { id: 'circular', label: 'Circular Queue', icon: '🔄' },
        { id: 'priority', label: 'Priority Queue', icon: '⭐' },
        { id: 'deque', label: 'Deque', icon: '↔️' },
        { id: 'random', label: 'Random Queue', icon: '❓' },
      ],
      correct: 'random',
    },
    {
      title: "Let's build a learning path just for you.",
      type: 'final',
    },
  ];

  const handleOptionSelect = (slideIndex, optionId) => {
    if (answeredSlides[slideIndex]) return; // Prevent selection if already answered

    setSelectedOptions({
      ...selectedOptions,
      [slideIndex]: optionId,
    });

    // Mark this slide as answered
    setAnsweredSlides({
      ...answeredSlides,
      [slideIndex]: true,
    });
  };

  const handleContinue = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      // Navigate to the main content if it’s the final slide
      navigate('/home');
    }
  };

  const handleBack = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  
  const isAnswered = answeredSlides[currentSlide]; // Check if the current slide has been answered
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
                    className={`w-full p-4 rounded-lg border text-left flex items-center space-x-3 transition-colors ${
                      isAnswered
                        ? option.id === slides[currentSlide].correct
                          ? 'bg-green-100 border-green-300' // Highlight correct option in green
                          : option.id === selectedOptions[currentSlide]
                          ? 'bg-red-100 border-red-300' // Highlight incorrect selected option in red
                          : 'border-gray-200'
                        : 'hover:bg-blue-50 border-gray-200'
                    }`}
                    disabled={isAnswered} // Disable all options once answered
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
            className={`w-48 py-3 px-4 rounded-full ${isContinueDisabled ? 'bg-gray-300' : 'bg-gray-900 text-white hover:bg-gray-700 transition-colors'} `}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default InitialQuestions;
