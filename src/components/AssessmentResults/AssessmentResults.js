import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { User, Settings, LogOut, Book } from "lucide-react";
import { useLocation, Navigate } from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { AlertTriangle, Trophy, Brain, BookOpen, ChevronRight } from 'lucide-react';
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
                  href="/learningPath"
                  className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                >
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-yellow-100 rounded-full mr-3">
                    <Book size={18} className="text-yellow-600" />
                  </span>
                  Learning Plan
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

const AssessmentResults = () => {
  const location = useLocation();
  const results = location.state?.results;

  if (!results) {
    return <Navigate to="/home" replace />;
  }

  const topicData = Object.values(results.topicStats).map(topic => ({
    name: topic.name,
    correct: topic.correct,
    incorrect: topic.total - topic.correct,
  }));

  const difficultyData = Object.entries(results.difficultyStats).map(([key, value]) => ({
    name: key,
    correct: value.correct,
    total: value.total
  }));

  const scorePercentage = (results.score / results.totalQuestions) * 100;
  const scoreColor = scorePercentage >= 70 ? 'text-green-500' :
    scorePercentage >= 50 ? 'text-yellow-500' :
      'text-red-500';

  return (
    <div className="min-h-screen bg-white pb-8">
      <Navbar />
      <div className="max-w-7xl mx-auto pt-32">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">Assessment Results</h1>
          <p className="text-gray-600 mt-2">Here's a detailed breakdown of your performance</p>
        </div>

        {/* Score Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Score Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-500">Total Score</span>
              <Trophy className="w-4 h-4 text-yellow-500" />
            </div>
            <div className="text-2xl font-bold">
              <span className={scoreColor}>{results.score}</span>
              <span className="text-gray-500">/{results.totalQuestions}</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {scorePercentage.toFixed(1)}% Success Rate
            </p>
          </div>

          {/* Topics Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-500">Topics Covered</span>
              <Brain className="w-4 h-4 text-blue-500" />
            </div>
            <div className="text-2xl font-bold">
              {Object.keys(results.topicStats).length}
            </div>
            <p className="text-xs text-gray-500 mt-1">Different concept areas</p>
          </div>

          {/* Review Areas Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-500">Areas for Review</span>
              <BookOpen className="w-4 h-4 text-purple-500" />
            </div>
            <div className="text-2xl font-bold">{results.dangerLevels.length}</div>
            <p className="text-xs text-gray-500 mt-1">Topics to strengthen</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Topic Performance Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold mb-4">Performance by Topic</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topicData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={150} />
                  <Tooltip />
                  <Bar dataKey="correct" stackId="a" fill="#22c55e" name="Correct" />
                  <Bar dataKey="incorrect" stackId="a" fill="#ef4444" name="Incorrect" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Difficulty Performance Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold mb-4">Performance by Difficulty</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={difficultyData}
                    dataKey="total"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {difficultyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={['#22c55e', '#3b82f6', '#f59e0b'][index]} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip formatter={(value, name, props) => [
                    `Total: ${value}, Correct: ${props.payload.correct}`,
                    name
                  ]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Areas for Review */}
        {results.dangerLevels.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-yellow-500" />
              <h2 className="text-lg font-semibold">Recommended Review Areas</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {results.dangerLevels.map((level) => (
                <div
                  key={level.id}
                  className="p-4 rounded-lg border border-yellow-200 bg-yellow-50"
                >
                  <h3 className="font-medium text-gray-900">{level.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Recommended for additional practice
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="mt-8 text-end">
          <a
            href="/learningPath"
            className="inline-flex items-center bg-green-500 text-white px-5 py-4 rounded-full text-lg font-semibold hover:bg-green-600"
          >
            
            Go to Learning Path
            <ChevronRight className="w-7 h-7 ml-2 text-white" />
          </a>
          
        </div>
      </div>
    </div>
  );
};

export default AssessmentResults;