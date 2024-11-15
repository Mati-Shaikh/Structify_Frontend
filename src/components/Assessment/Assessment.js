import React, { useState, useEffect } from "react";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
        const response = await fetch(
          "http://localhost:3005/api/questions/random",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              token: localStorage.getItem("token"),
            },
          }
        );
        const data = await response.json();
        // Transform the questions to match the slides format
        const transformedQuestions = data.map(question => ({
          title: question.question,
          options: question.options.map((option, index) => ({
            id: option, 
            label: option,
          })),
          questionId: question._id,
          correct: question.answer // This is now the correct answer string
        }));

        const allSlides = [
          {
            title: "Let's gauge your knowledge Insertion in Linked List!",
            type: "intro"
          },
          ...transformedQuestions,
         
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
      [slideIndex]: optionId
    });

    setAnsweredSlides({
      ...answeredSlides,
      [slideIndex]: true
    });

    if (questions[slideIndex]?.questionId) {
      const newResponse = {
        questionId: questions[slideIndex].questionId,
        selectedOption: optionId // Store the complete answer string
      };

      setUserResponses(prev => {
        const filtered = prev.filter(r => r.questionId !== questions[slideIndex].questionId);
        return [...filtered, newResponse];
      });
    }
  };

  const handleContinue = async () => {
    if (currentSlide < questions.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      try {
        await fetch('http://localhost:3005/api/submit-assessment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            token: localStorage.getItem("token"),
          },
          body: JSON.stringify({ responses: userResponses })
        });
        navigate("/home");
      } catch (error) {
        console.error("Error submitting assessment:", error);
      }
    }
  };

  const handleBack = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  if (isLoading) {
    return <div className="min-h-screen bg-white p-6 flex items-center justify-center">
      Loading questions...
    </div>;
  }

  const currentSlideData = questions[currentSlide];
  const isAnswered = answeredSlides[currentSlide];
  const isContinueDisabled = currentSlideData?.options && !selectedOptions[currentSlide];

  return (
    <div className="min-h-screen bg-white p-6">
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
              style={{
                width: `${(currentSlide / (questions.length - 1)) * 100}%`,
              }}
            />
          </div>
        </div>

        <div className="space-y-6">
          {currentSlideData?.type === "final" ? (
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="w-24 h-24 bg-green-400 rounded-lg flex items-center justify-center flex-shrink-0">
                  <div className="w-8 h-8 bg-black rounded-sm flex-shrink-0" />
                </div>
              </div>
              <h1 className="text-2xl font-bold">{currentSlideData.title}</h1>
            </div>
          ) : (
            <>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-400 rounded-lg flex items-center justify-center flex-shrink-0">
                  <div className="w-4 h-4 bg-black rounded-sm flex-shrink-0" />
                </div>
                <h1 className="text-xl font-bold mt-2">{currentSlideData?.title}</h1>
              </div>
              <div className="space-y-3">
                {currentSlideData?.options?.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleOptionSelect(currentSlide, option.id)}
                    className={`w-full p-4 rounded-lg border text-left flex items-center space-x-3 transition-colors ${
                      isAnswered
                        ? option.id === currentSlideData.correct
                          ? "bg-green-100 border-green-300"
                          : option.id === selectedOptions[currentSlide]
                          ? "bg-red-100 border-red-300"
                          : "border-gray-200"
                        : "hover:bg-blue-50 border-gray-200"
                    }`}
                    disabled={isAnswered}
                  >
                    <span className="text-2xl">{option.icon}</span>
                    <span className="font-medium">{option.label}</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={handleContinue}
            disabled={isContinueDisabled}
            className={`w-48 py-3 px-4 rounded-full ${
              isContinueDisabled
                ? "bg-gray-300"
                : "bg-gray-900 text-white hover:bg-gray-700 transition-colors"
            }`}
          >
            {currentSlide === questions.length - 1 ? "Submit" : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Assessment;