import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginAndSignupComponents/Login';
import SignupPage from './components/LoginAndSignupComponents/Signup';
import ResetPassword from './components/LoginAndSignupComponents/ResetPassword';
import LandingPage from './components/LandingPage/LangingPage';
import Dashboard from './components/Dashboard/dashboard';
import HomePage from './components/Home/home';
import Game from './components/Game/Game';
import ProfileManagement from './components/Profile/profile';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="/game" element={<Game />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile" element={<ProfileManagement />} />
      </Routes>
    </Router>
  );
};

export default App;