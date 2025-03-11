import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  Lock,
  User,
  Settings,
  LogOut,
  Award,
  Book,
  Star,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Navbar remains unchanged
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-white p-4 ${scrolled ? "shadow-md" : ""}`}>
      <div className="container mx-auto flex justify-between">
        <div className="flex items-center ml-8">
          <a href="/home" style={{ fontFamily: "Atma, sans-serif" }} className="text-4xl font-bold pt-2 text-blue-600 font-semibold hover:text-green-600">
            Structify
          </a>
        </div>
        <div className="relative mr-8">
          <button onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)} className="text-black p-2 rounded hover:bg-white transition-colors">
            {isOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
          {isOpen && (
            <div className="absolute right-0 w-64 bg-white rounded-lg shadow-xl overflow-hidden z-10" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
              <div className="py-2">
                <a href="/profile" className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full mr-3">
                    <User size={18} className="text-blue-600" />
                  </span>
                  Account
                </a>
                <a href="/learningPath" className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-yellow-100 rounded-full mr-3">
                    <Book size={18} className="text-yellow-600" />
                  </span>
                  Learning Plan
                </a>
                <a href="/achievements" className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-purple-100 rounded-full mr-3">
                    <Award size={18} className="text-purple-600" />
                  </span>
                  Achievements
                </a>
                <a href="/profile" className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-green-100 rounded-full mr-3">
                    <Settings size={18} className="text-green-600" />
                  </span>
                  Settings
                </a>
                <button onClick={handleLogout} className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200">
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

// BadgeCategory component remains mostly unchanged – it now works with dynamically fetched badges.
const BadgeCategory = ({ title, badges }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const unlockedCount = badges.filter((badge) => !badge.lock).length; // lock === false means unlocked

  return (
    <div className="mb-8">
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
            <Award className="w-6 h-6 text-blue-600" />
          </div>
          <div className="text-left">
            <h3 className="font-bold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-500">
              {unlockedCount} of {badges.length} completed
            </p>
          </div>
        </div>
        <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {badges.map((badge, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative group overflow-hidden rounded-xl flex ${
                    !badge.lock ? "bg-gradient-to-br from-white to-gray-50" : "bg-gray-50"
                  } border ${!badge.lock ? "border-green-200" : "border-gray-200"} hover:shadow-lg transition-all duration-300`}
                >
                  <div className="w-[70%] p-6 relative">
                    <div className="relative z-10">
                      <h4 className={`font-bold mb-2 ${!badge.lock ? "text-gray-900" : "text-gray-400"}`}>
                        {badge.name}
                      </h4>
                      <p className={`text-sm ${!badge.lock ? "text-gray-600" : "text-gray-400"}`}>
                        {badge.description}
                      </p>
                    </div>
                    {!badge.lock && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-300 to-blue-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                    )}
                  </div>
                  <div className={`w-[30%] flex flex-col items-center justify-center border-l ${!badge.lock ? "border-green-100" : "border-gray-200"}`}>
                    <div className="relative">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center ${!badge.lock ? "bg-green-100" : "bg-gray-100"}`}>
                        {!badge.lock ? (
                          <Award className="w-8 h-8 text-green-600" />
                        ) : (
                          <Lock className="w-8 h-8 text-gray-400" />
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Achievements = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [coinBalance, setCoinBalance] = useState(0);
  const [badges, setBadges] = useState([]);

  // Fetch the learning path, extract badges, and update the state
  useEffect(() => {
    const fetchLearningPath = async () => {
      const token = localStorage.getItem("token");
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3005/api/users/learningPath", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token,
          },
        });
        const data = await response.json();
        // Extract badges from the learningPath
        const extractedBadges = [];
        data.learningPath.topics.forEach((topic) => {
          topic.subtopics.forEach((subtopic) => {
            extractedBadges.push({
              name: subtopic.badge.name,
              description: subtopic.badge.description,
              lock: subtopic.badge.lock,
              subtopic: subtopic.subtopic, // additional info if needed
            });
          });
        });
        setBadges(extractedBadges);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // Also fetch coin balance as before
    const fetchCoins = async () => {
      const token = localStorage.getItem("token");
      try {
        const coinResponse = await fetch("http://localhost:3005/api/users/coinsandbadges", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token,
          },
        });
        const coinData = await coinResponse.json();
        setCoinBalance(coinData.coins);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchLearningPath();
    fetchCoins();
  }, []);

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

  const totalBadges = badges.length;
  const unlockedBadges = badges.filter((badge) => !badge.lock).length;

  // Group badges by category based on badge name
  const categorizedBadges = {
    "Linked Lists": badges.filter((badge) => badge.name.includes("Linko")),
    "Queues": badges.filter((badge) => badge.name.includes("Queue")),
    "Stacks": badges.filter((badge) => badge.name.includes("Stack")),
    "Overall": badges.filter(
      (badge) =>
        !badge.name.includes("Linko") &&
        !badge.name.includes("Queue") &&
        !badge.name.includes("Stack")
    ),
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-6xl mx-auto p-8 mt-24">
        {/* Progress Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Coins Card */}
          <motion.div whileHover={{ scale: 1.02 }} className="bg-gradient-to-br from-yellow-400 to-yellow-300 rounded-2xl p-6 shadow-lg overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSI1MCUiIGN5PSI1MCUiIHI9IjEiIGZpbGw9IiNmZmYiLz48L3N2Zz4=')]"/>
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Star size={32} className="text-yellow-800 fill-yellow-100 drop-shadow" />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-bold text-yellow-900 mb-1">Coins Earned</h3>
                <p className="text-4xl font-black text-white drop-shadow-md">
                  {coinBalance}
                  <span className="text-lg font-semibold ml-2 text-yellow-100">coins</span>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Badges Summary Card */}
          <motion.div whileHover={{ scale: 1.02 }} className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl p-6 shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-white" />
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Award size={32} className="text-white" />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-bold text-purple-100 mb-1">Badges Progress</h3>
                <p className="text-4xl font-black text-white drop-shadow-md">
                  {unlockedBadges}
                  <span className="text-lg font-semibold text-purple-200">/{totalBadges}</span>
                </p>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-purple-800/20">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(unlockedBadges / totalBadges) * 100}%` }}
                transition={{ duration: 1 }}
                className="h-full bg-gradient-to-r from-purple-300 to-white"
              />
            </div>
          </motion.div>
        </div>

        {/* Categorized badges display */}
        <div className="space-y-6">
          {Object.entries(categorizedBadges).map(([category, categoryBadges]) => (
            categoryBadges.length > 0 && (
              <BadgeCategory key={category} title={category} badges={categoryBadges} />
            )
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Achievements;
