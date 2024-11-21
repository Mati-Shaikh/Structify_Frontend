import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginAndSignupComponents/Login";
import SignupPage from "./components/LoginAndSignupComponents/Signup";
import ResetPassword from "./components/LoginAndSignupComponents/ResetPassword";
import LandingPage from "./components/LandingPage/LangingPage";
import Dashboard from "./components/Dashboard/dashboard";
import HomePage from "./components/Home/home";
import Game from "./components/Game/Game";
import ProfileManagement from "./components/Profile/profile";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import WelcomePage from "./components/Welcome/Welcome";
import InitialQuestions from "./components/InitialQuestions/InitialQuestions";
import Assessment from "./components/Assessment/Assessment";
import ProtectedRouteAssessment from "./components/ProtectedRoute/ProtectedRouteAssessment";
import ProtectedRouteWelcome from "./components/ProtectedRoute/ProtectedRouteWelcome";
import ProtectedRouteInitialQuestions from "./components/ProtectedRoute/ProtectedRouteInitialQuestions";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/" element={<LandingPage />} />

        <Route
          path="/dashboard"
          element={<ProtectedRoute element={Dashboard} />}
        />
        <Route path="/home" element={<ProtectedRoute element={HomePage} />} />
        <Route
          path="/profile"
          element={<ProtectedRoute element={ProfileManagement} />}
        />
        <Route path="/game" element={<ProtectedRoute element={Game} />} />


        <Route
          path="/welcome"
          element={<ProtectedRouteWelcome element={WelcomePage} />}
        />
        <Route
          path="/initialQuestions"
          element={<ProtectedRouteInitialQuestions element={InitialQuestions} />}
        />
        <Route
          path="/assessment"
          element={<ProtectedRouteAssessment element={Assessment} assessmentName="LinkedListInsertion"/>}
        />

        
      </Routes>
    </Router>
  );
};

export default App;
