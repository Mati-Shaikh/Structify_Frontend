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
                <span className="text-sm text-gray-700 font-medium">Assessment in progress</span>
              </div>
            </div>
          </div>
      </div>
    </nav>
  );
};

const Assessment = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [answeredSlides, setAnsweredSlides] = useState({});
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userResponses, setUserResponses] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("http://localhost:3005/api/questions/random", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },
        });
        const data = await response.json();
        // Transform the questions to match the slides format
        const transformedQuestions = data.map((question) => ({
          title: question.question,
          subtitle: "Choose the most appropriate answer",
          options: question.options.map((option) => ({
            id: option,
            label: option,
          })),
          questionId: question._id,
          correct: question.answer,
        }));

        const allSlides = [
          {
            title: "Let's gauge your knowledge of Insertion in Linked List!",
            subtitle: "We'll test your understanding with some specific questions",
            type: "intro",
          },
          ...transformedQuestions,
          {
            title: "Great job completing the assessment!",
            subtitle: "We'll analyze your responses to provide personalized feedback",
            type: "final",
          }
        ];

        setQuestions(allSlides);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleOptionSelect = (slideIndex, optionId) => {
    if (answeredSlides[slideIndex]) return;

    setSelectedOptions({
      ...selectedOptions,
      [slideIndex]: optionId,
    });

    setAnsweredSlides({
      ...answeredSlides,
      [slideIndex]: true,
    });

    if (questions[slideIndex]?.questionId) {
      const newResponse = {
        questionId: questions[slideIndex].questionId,
        selectedOption: optionId,
      };

      setUserResponses((prev) => {
        const filtered = prev.filter(
          (r) => r.questionId !== questions[slideIndex].questionId
        );
        return [...filtered, newResponse];
      });
    }
  };

  const handleContinue = async () => {
    if (currentSlide < questions.length - 1) {
      setCurrentSlide(currentSlide + 1);
      
    } else {
      try {
        await fetch("http://localhost:3005/api/submit-assessment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },
          body: JSON.stringify({ responses: userResponses }),
        });
        navigate("/home");
      } catch (error) {
        console.error("Error submitting assessment:", error);
      }
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

  if (isLoading) {
    return (
      <div class="flex-col gap-4 w-full flex items-center justify-center">
      <div
        class="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full"
      >
        <div
          class="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"
        ></div>
      </div>
    </div>
    );
  }

  const currentSlideData = questions[currentSlide];
  const isAnswered = answeredSlides[currentSlide];
  const isContinueDisabled = currentSlideData?.options && !selectedOptions[currentSlide];

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
                  style={{ width: `${(currentSlide / (questions.length - 1)) * 100}%` }}
                />
              </div>
              <div className="mt-2 text-sm text-gray-500 text-center">
                Step {currentSlide + 1} of {questions.length}
              </div>
            </div>
            <div className="w-10" /> {/* Spacer for alignment */}
          </div>
        </div>

        {/* Content area with animation */}
        <div className="transform transition-all duration-500 ease-out">
          <div className="text-center mb-12">
            <h1 className="text-2xl font-bold mb-4 text-gray-900">
              {currentSlideData.title}
            </h1>
            <p className="text-gray-600 text-lg">
              {currentSlideData.subtitle}
            </p>
          </div>

          {currentSlideData.type === 'final' ? (
            <div className="text-center">
              <div className="inline-flex p-4 rounded-2xl bg-green-400 mb-8">
                <div className="w-24 h-24 bg-white rounded-xl flex items-center justify-center">
                  <div className="w-12 h-12 bg-black rounded-lg" />
                </div>
              </div>
            </div>
          ) : (
            <div className="grid gap-4">
              {currentSlideData.options?.map((option, index) => (
                <button
                  key={option.id}
                  onClick={() => handleOptionSelect(currentSlide, option.id)}
                  className={`w-full p-6 rounded-2xl border-2 text-left transform transition-all duration-300 hover:scale-[1.02] ${
                    isAnswered
                      ? option.id === currentSlideData.correct
                        ? 'border-green-500 bg-green-50'
                        : option.id === selectedOptions[currentSlide]
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200'
                      : selectedOptions[currentSlide] === option.id
                      ? 'border-green-500 bg-white shadow-lg'
                      : 'border-gray-200 hover:border-green-200 hover:shadow-md'
                  }`}
                  disabled={isAnswered}
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-3xl">{option.icon}</span>
                    <span className="text-lg font-medium text-gray-800">{option.label}</span>
                    {selectedOptions[currentSlide] === option.id && !isAnswered && (
                      <div className="ml-auto">
                        <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                    )}
                    {isAnswered && option.id === currentSlideData.correct && (
                      <div className="ml-auto">
                        <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                    )}
                    {isAnswered && option.id === selectedOptions[currentSlide] && option.id !== currentSlideData.correct && (
                      <div className="ml-auto">
                        <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
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
              <span>{currentSlide === questions.length - 1 ? 'Submit' : 'Continue'}</span>
              <ArrowRight size={20} className="transform transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assessment;