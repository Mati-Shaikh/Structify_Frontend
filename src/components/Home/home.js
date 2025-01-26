import React, { useState, useEffect } from "react";
import { Menu, X, Flame, ChevronRight, ChevronLeft, User, Settings, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

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
        
        // Calculate continuous streak from most recent dates
        let streak = 0;
        const today = new Date().toISOString().split('T')[0];
        const sortedDates = weekStreakData.loginDates.sort((a, b) => new Date(b) - new Date(a));
        
        for (const date of sortedDates) {
          const currentDate = new Date(date);
          const testDate = new Date(today);
          testDate.setDate(testDate.getDate() - streak);
          
          // Only count if it's a consecutive date from the most recent login
          if (currentDate.toISOString().split('T')[0] === testDate.toISOString().split('T')[0]) {
            streak++;
          } else {
            // Stop counting if there's a break in consecutive dates
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
    
    const fullWeekDays = [1, 2, 3, 4, 5, 6, 0].map(num => {
      const date = new Date(today);
      date.setDate(today.getDate() - (today.getDay() - num + 7) % 7 - (7 * offset));
      return {
        fullDate: date.toISOString().split('T')[0],
        displayDate: date.getDate(),
        day: dayNames[num],
        isToday: date.toISOString().split('T')[0] === new Date().toISOString().split('T')[0]
      };
    });
  
    return fullWeekDays.map((dateObj) => ({
      day: dateObj.day,
      date: dateObj.displayDate,
      fullDate: dateObj.fullDate,
      completed: loginDates.includes(dateObj.fullDate),
      active: dateObj.isToday,
      hoverText: loginDates.includes(dateObj.fullDate) 
        ? "Great job! You completed your learning this day." 
        : dateObj.isToday 
          ? "Today's learning awaits!" 
          : "No learning activity this day"
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
                  </div>
                  <p className="text-gray-700">
                    Keep learning to <span className="font-semibold text-green-600">maintain your streak</span>
                  </p>
                </div>
                <div className="flex gap-2">
                  <Flame className="w-6 h-6 text-orange-500" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <button 
                  onClick={() => setCurrentWeekOffset(prev => prev + 1)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <ChevronLeft className="text-gray-600" />
                </button>
                
                <div className="flex justify-between items-center space-x-4">
                  {days.map((item, index) => (
                    <div key={index} className="text-center group relative">
                      <div
                        className={`w-11 h-11 rounded-full border-2 mb-2 flex items-center justify-center
                          ${item.completed ? "border-green-500 bg-green-50" :
                          item.active ? "border-blue-500 bg-blue-50" : "border-gray-200"}`}
                      >
                        <div className="flex flex-col items-center">
                          <span className="text-xs">{item.date}</span>
                          <svg
                            className={`w-4 h-4 ${item.completed ? "text-green-500" :
                              item.active ? "text-blue-500" : "text-gray-400"
                              }`}
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
                        className={`text-sm ${item.completed ? "font-medium text-green-500" :
                          item.active ? "font-medium text-blue-500" : "text-gray-400"
                          }`}
                      >
                        {item.day}
                      </span>
                      {/* Tooltip */}
                      <div className="absolute z-10 bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block">
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
                
                <button 
                  onClick={() => setCurrentWeekOffset(prev => Math.max(0, prev - 1))}
                  className="p-2 hover:bg-gray-100 rounded-full"
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
                    <h3 className="font-semibold">COINS</h3>
                    <p className="text-gray-500 flex items-center gap-1">
                      <span className="text-yellow-600 font-medium">280</span> coins
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white border border-gray-300 rounded-2xl p-6 shadow-sm flex-1">
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
                      <span className="text-yellow-600 font-medium">280</span> coins
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