import React, { useState, useEffect } from "react";
import { Menu, X, Flame, ChevronRight, ChevronLeft, User, Settings, LogOut, Book, Award, Coins } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer  } from 'react-toastify'; // For Toast notifications
import 'react-toastify/dist/ReactToastify.css';

const StreakInfoOverlay = () => {
  const [showInfo, setShowInfo] = useState(false);
  
  return (
    <div className="relative inline-block ml-2">
      
      <button
        onMouseEnter={() => setShowInfo(true)}
        onMouseLeave={() => setShowInfo(false)}
        className="group p-1.5  rounded-full  border border-dashed border-yellow-500 animate-bounce"
      >
        <div className="flex items-center gap-1">
          <Coins className="w-4 h-4 text-yellow-500 group-hover:text-yellow-600" />
          <span className="text-xs font-medium text-yellow-500 group-hover:text-yellow-600">100</span>
        </div>
      </button>
      
      {showInfo && (
        <div className="absolute z-10 -right-0 top-11 w-64 transform">
          <div className="bg-white p-3 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center">
                <Flame className="w-3 h-3 text-orange-500" />
              </div>
              <span className="text-sm font-medium text-gray-800">Streak Recovery</span>
            </div>
            <p className="text-xs text-gray-600">
              Click on any missed day to recover your streak for 100 coins!
            </p>
          </div>
          <div className="absolute -top-1 right-4 w-2 h-2 bg-white transform rotate-45 border-l border-t border-gray-200"></div>
        </div>
      )}
    </div>
  
);
}




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
            href="/"
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

const Card = ({ title, description, topics, logoSrc }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="w-80  h-96 [perspective:1000px] group"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div
        className={` relative w-full h-full transition-all duration-500 [transform-style:preserve-3d] ${isFlipped ? "[transform:rotateY(180deg)]" : ""
          }`}
      >
        {/* Front of the card */}
        <div className="border border-gray-300 absolute w-full h-full rounded-xl shadow-sm overflow-hidden [backface-visibility:hidden] bg-white">
          <div className="h-1/2 overflow-hidden bg-gradient-to-b from-purple-100 to-purple-50 flex items-center justify-center p-6">
            <img
              src={logoSrc}
              alt={`${title} logo`}
              className="w-24 h-24 object-contain"
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
          <div className="absolute bottom-4 right-4 text-blue-500 group-hover:translate-x-1 transition-transform">
            <ChevronRight size={24} />
          </div>
        </div>

        {/* Back of the card */}
        <div className="absolute w-full h-full rounded-xl shadow-lg overflow-hidden [backface-visibility:hidden] [transform:rotateY(180deg)] bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="p-6 h-full flex flex-col">
            <div className="mb-6">
              <h4 className="text-xl font-bold text-gray-800 text-center relative">
                <span className="relative z-10">{title} Subtopics</span>
                <span className="absolute inset-x-0 bottom-1 h-3 bg-yellow-200 -skew-x-12 transform -rotate-2 z-0"></span>
              </h4>
            </div>
            <div className="flex-grow flex flex-col justify-center space-y-4">
              {topics.map((topic, index) => (
                <button
                  key={index}
                  className="bg-white  rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 cursor-default"
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-blue-500 font-semibold">
                        {index + 1}
                      </span>
                    </div>
                    <span className="text-gray-700 font-medium">{topic}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


const HomePage = () => {

  const navigate = useNavigate();
  const [currentStatus, setCurrentStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [weekStreak, setWeekStreak] = useState(0);
  const [loginDates, setLoginDates] = useState([]);
  const [currentWeekOffset, setCurrentWeekOffset] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [coinBalance, setCoinBalance] = useState(0); // State for coins
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [selectedMissedDate, setSelectedMissedDate] = useState(null); // Store missed date
  
  
  const handleBuyStreak = async (missedDate) => {
  const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://localhost:3005/api/users/buyStreak', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: token,
        },
        body: JSON.stringify({ missedDate }),
      });
      const data = await response.json();

      if (data.message === 'Streak purchased successfully') {
        setShowModal(false);
        setCoinBalance(data.updatedCoins);  // Update coin balance
        setLoginDates(data.updatedStreak);  // Update streak

        // Show success message and refresh the page after toast disappears
        toast.success('Streak purchased successfully!', {
          onClose: () => {
            window.location.reload(); // Refresh the page after toast closes
          },
        });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Failed to buy streak!');
    }
  };

  useEffect(() => {

    const fetchData = async () => {
      const token = localStorage.getItem('token');

      try {
        setLoading(true);
        
        // Fetch Learning Path
        const learningPathResponse = await fetch('http://localhost:3005/api/users/learningPath', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            token: token,
          },
        });
        const learningPathData = await learningPathResponse.json();
        setCurrentStatus(learningPathData.currentStatus);

        // Fetch Week Streak
        const weekStreakResponse = await fetch('http://localhost:3005/api/users/weekStreak', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            token: token,
          },
        });
        const weekStreakData = await weekStreakResponse.json();
        setLoginDates(weekStreakData.loginDates);

        // Fetch User Coins
        const coinResponse = await fetch('http://localhost:3005/api/users/coins', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            token: token,
          },
        });
        const coinData = await coinResponse.json();
        setCoinBalance(coinData.coins); // Set the coin balance

        // Calculate continuous streak from most recent dates
        let streak = 0;
        const today = new Date().toISOString().split('T')[0];
        const sortedDates = weekStreakData.loginDates.sort((a, b) => new Date(b) - new Date(a));
        
        let currentDate = new Date(today);
        let streakFlag = true;
        // Start checking from today backwards
        while (streak < sortedDates.length) {
          const dateToCheck = currentDate.toISOString().split('T')[0];
          if (sortedDates.includes(dateToCheck)) {
            streak++;
            currentDate.setDate(currentDate.getDate() - 1);
          } else {
            break;
          }
        }
        
        setWeekStreak(streak);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getDayStatus = (offset = 0) => {
    const today = new Date();
    const dayNames = ['Su', 'M', 'T', 'W', 'Th', 'F', 'S'];
    
    // Create array for week days in chronological order (Monday to Sunday)
    const fullWeekDays = Array.from({ length: 7 }, (_, index) => {
      const date = new Date(today);
      // Calculate the date for each day of the week
      date.setDate(today.getDate() - today.getDay() + index - (7 * offset));
      return {
        fullDate: date.toISOString().split('T')[0],
        displayDate: date.getDate(),
        day: dayNames[index],
        isToday: date.toISOString().split('T')[0] === new Date().toISOString().split('T')[0],
        isFuture: date > today

      };
    });
  
    return fullWeekDays.map((dateObj) => ({
      day: dateObj.day,
      date: dateObj.displayDate,
      fullDate: dateObj.fullDate,
      completed: loginDates.includes(dateObj.fullDate),
      active: dateObj.isToday,
      hoverText: dateObj.isFuture ? "Day to come" :
        loginDates.includes(dateObj.fullDate) 
        ? "Great job! You completed your learning this day." 
        : dateObj.isToday 
          ? "Today's learning awaits!" 
          : "No learning activity this day. Click it to buy streak!",
      canBuyStreak: !loginDates.includes(dateObj.fullDate) && !dateObj.isToday, // Can buy streak if not completed and not today
    }));
  };
  
  const days = getDayStatus(currentWeekOffset);

  if (loading) {
    return (
      <div className="flex-col gap-4 mt-64 w-full flex items-center justify-center">
        <div className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
          <div className="w-16 h-16 border-4 border-transparent text-green-400 text-2xl animate-spin flex items-center justify-center border-t-green-400 rounded-full"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center text-red-500">
        Error loading current Status: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen text-center">
      <Navbar />
      <div className="max-w-6xl mx-auto p-8 mt-24">
        <motion.div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 text-gray-800">
            Welcome,{" "}
            <span className="text-blue-600">
              {localStorage.getItem("userFullName")} !
            </span>
          </h2>
        </motion.div>
               {/* Add ToastContainer at the root level */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-5">
            {/* Streak Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-300">
              <div className="flex justify-between items-start mb-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="text-6xl font-bold">{weekStreak}</div>
                    <div className="text-xl text-gray-500">
                      {weekStreak === 1 ? 'day' : 'days'} streak
                    </div>
                    <StreakInfoOverlay />
                  </div>
                  <p className="text-gray-700">
                    Keep learning to <span className="font-semibold text-green-600">maintain your streak</span>
                  </p>
                </div>

                <div 
                  className="relative group"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <Flame 
                    className={`w-6 h-6 transition-all duration-300 transform ${
                      isHovered ? 'text-orange-500 scale-125 fill-current animate-pulse' : 'text-orange-500'
                    }`}
                  />
                  {isHovered && (
                    <>
                      <div className="absolute -top-1 -left-1 right-1 bottom-1">
                        <Flame 
                          className="w-8 h-8 text-orange-300 animate-ping opacity-75"
                        />
                      </div>
                      <div className="absolute -right-2 top-8 whitespace-nowrap">
                        <span className="bg-orange-500 text-white px-2 py-1 rounded font-bold text-sm animate-bounce">
                          Streak!
                          <span className="absolute -top-1 left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-b-4 border-transparent border-b-orange-500"></span>
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <button 
                  onClick={() => setCurrentWeekOffset(prev => prev + 1)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                >
                  <ChevronLeft className="text-gray-600" />
                </button>
                
                <div className="flex justify-between items-center space-x-4">
                  {days.map((item, index) => (
                    <div
                      key={index}
                      className="text-center group relative"
                      onClick={() => {
                        if (item.canBuyStreak) {
                          setSelectedMissedDate(item.fullDate); // Set the missed date for purchase
                          setShowModal(true); // Show modal when clicked on a missed streak
                        }
                      }}
                    >
                      <div
                        className={`w-11 h-11 rounded-full border-2 mb-2 flex items-center justify-center transition-all duration-200 transform 
                          ${item.completed ? "border-green-500 bg-green-50" :
                            item.active ? "border-blue-500 bg-blue-50" :
                            "border-gray-200 group-hover:border-gray-300 group-hover:bg-gray-50"}`}
                      >
                        <div className="flex flex-col items-center">
                          <span className="text-xs">{item.date}</span>
                          <svg
                            className={`w-4 h-4 transition-colors duration-200 
                              ${item.completed ? "text-green-500" :
                                item.active ? "text-blue-500" : "text-gray-400"}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            {item.completed ? (
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            ) : (
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 10V3L4 14h7v7l9-11h-7z"
                              />
                            )}
                          </svg>
                        </div>
                      </div>
                      <span
                        className={`text-sm transition-colors duration-200 ${item.completed ? "font-medium text-green-500" :
                          item.active ? "font-medium text-blue-500" : "text-gray-400"}`}
                      >
                        {item.day}
                      </span>
                      {/* Tooltip */}
                      <div className="absolute z-10 bottom-full left-1/2 transform -translate-x-1/2 mb-2 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <div className="bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                          {item.hoverText}
                        </div>
                        <div className="absolute bottom-[-4px] left-1/2 transform -translate-x-1/2 
                          w-0 h-0 border-l-4 border-l-transparent 
                          border-r-4 border-r-transparent 
                          border-t-4 border-t-gray-800"></div>
                      </div>
                    </div>

                  ))}
                </div>

                {showModal && (
                  <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-gray-800 bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50"
                >
                  <motion.div 
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    className="bg-white p-8 rounded-2xl shadow-xl w-96 relative"
                  >
                    <div className="absolute -top-4 -right-4">
                      <button
                        onClick={() => setShowModal(false)}
                        className="bg-gray-100 hover:bg-gray-200 rounded-full p-2 text-gray-600 transition-colors duration-200"
                      >
                        <X size={20} />
                      </button>
                    </div>

                    <div className="flex items-center justify-center mb-6">
                      <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                        <Flame className="w-8 h-8 text-orange-500" />
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-center mb-2">Recover Your Streak</h3>
                    <p className="text-gray-600 text-center mb-6">
                      Use 100 coins to recover your streak for {selectedMissedDate}.
                    </p>

                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Cost</span>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-orange-600">100</span>
                          <span className="text-gray-500">coins</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-gray-600">Your Balance</span>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-orange-600">{coinBalance}</span>
                          <span className="text-gray-500">coins</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => setShowModal(false)}
                        className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors duration-200"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleBuyStreak(selectedMissedDate)}
                        className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={coinBalance < 100}
                      >
                        Buy Streak
                      </button>
                    </div>
                    
                    {coinBalance < 100 && (
                      <p className="text-red-500 text-sm text-center mt-4">
                        Insufficient coins. You need {100 - coinBalance} more coins.
                      </p>
                    )}
                  </motion.div>
                </motion.div>
                )}

                
                <button 
                  onClick={() => setCurrentWeekOffset(prev => Math.max(0, prev - 1))}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                >
                  <ChevronRight className="text-gray-600" />
                </button>
              </div>
            </div>
            
            <div className="flex justify-between">
              {/* XP Progress Card */}
              <div className="bg-white border border-gray-300 rounded-2xl p-6 shadow-sm flex-1 mr-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-yellow-800"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">COINS EARNED</h3>
                    <p className="text-gray-500 flex items-center gap-1">
                      <span className="text-yellow-600 font-medium">{coinBalance}</span> coins
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white border border-gray-300 rounded-2xl p-6 shadow-sm flex-1">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">BADGES EARNED</h3>
                    <p className="text-gray-500 flex items-center gap-1">
                      <span className="text-purple-600 font-medium">3</span> unlocked
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Current Course Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-300 overflow-hidden">
              {/* Purple gradient background with robot */}
              <div className="h-48 bg-gradient-to-b from-purple-100 to-purple-50 relative">
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                  <div className="w-24 h-32 relative">
                    {/* Robot base */}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-20 bg-gray-300"></div>
                    {/* Robot head */}
                    <div className="absolute bottom-14 left-1/2 transform -translate-x-1/2">
                      <div className="w-12 h-12 bg-indigo-500 relative">
                        {/* Antenna */}
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                          <div className="w-2 h-6 bg-gray-700"></div>
                          <div className="w-4 h-4 rounded-full bg-indigo-400 absolute -top-2 left-1/2 transform -translate-x-1/2"></div>
                        </div>
                        {/* Screen */}
                        <div className="absolute top-2 left-2 right-2 bottom-2 bg-indigo-300"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content section */}
              <div className="p-6">
                {currentStatus ? (
                  <>
                    <div className="text-sm text-indigo-600 font-medium mb-2">
                      {currentStatus.topic} · Level {currentStatus.level.id}
                    </div>
                    <h2 className="text-xl font-bold mb-4">
                      {currentStatus.level.name}
                    </h2>
                  </>
                ) : (
                  <>
                    <div className="text-sm text-indigo-600 font-medium mb-2">
                      Start Your Journey
                    </div>
                    <h2 className="text-xl font-bold mb-4">
                      Begin Learning Data Structures
                    </h2>
                  </>
                )}
                <button
                  onClick={() => navigate('/learningPath')}
                  className="w-full bg-gray-900 text-white py-3 rounded-full hover:bg-gray-800 transition-colors"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-col mt-8 mb-16 py-16">

        <div className="flex flex-wrap justify-between  gap-8 mx-48 px-6">
          <Card
            title="Linked List"
            description="A linear data structure where elements are stored in nodes."
            topics={["Insertion", "Deletion", "Traversal"]}
            logoSrc="/link.svg"
          />
          <Card
            title="Stacks"
            description="Last-In-First-Out (LIFO) data structure for temporary data storage."
            topics={["Push operation", "Pop operation", "Peek operation"]}
            logoSrc="/stack.svg"
          />
          <Card
            title="Queues"
            description="First-In-First-Out (FIFO) data structure for ordered data processing."
            topics={["Enqueue operation", "Dequeue operation", "Search Queue"]}
            logoSrc="/queue1.svg"
          />
        </div>

      </div>
    </div>
  );
};

export default HomePage;