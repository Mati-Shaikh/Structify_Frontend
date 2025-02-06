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
import LearningPath from "./components/LearningPath/LearningPath";
import AssessmentResults from "./components/AssessmentResults/AssessmentResults";
import ProtectedRouteGame from "./components/ProtectedRoute/ProtectedRouteGame";
import GameCompletionCard from "./components/BadgeCard";
import Achievements from "./components/Achievements/Achievements";
import FeedbackAndSupport from "./components/FeedbackAndSupport";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/" element={<LandingPage />} />

        <Route path="/assessmentResults" element={<AssessmentResults />} />

        <Route
          path="/dashboard"
          element={<ProtectedRoute element={Dashboard} />}
        />
         <Route
          path="/learningPath"
          element={<ProtectedRoute element={LearningPath} />}
        />
        <Route path="/home" element={<ProtectedRoute element={HomePage} />} />
        <Route path="/achievements" element={<ProtectedRoute element={Achievements} />} />
        <Route
          path="/profile"
          element={<ProtectedRoute element={ProfileManagement} />}
        />
        


        <Route
          path="/welcome"
          element={<ProtectedRouteWelcome element={WelcomePage} />}
        />

<Route
          path="/feedback"
          element={<FeedbackAndSupport/>}
        />

        <Route
          path="/initialQuestions"
          element={<ProtectedRouteInitialQuestions element={InitialQuestions} />}
        />
        <Route
          path="/assessment1"
          element={<ProtectedRouteAssessment element={Assessment} assessmentId="1"/>}
        />
        <Route
          path="/assessment2"
          element={<ProtectedRouteAssessment element={Assessment} assessmentId="2"/>}
        />
        <Route
          path="/assessment3"
          element={<ProtectedRouteAssessment element={Assessment} assessmentId="3"/>}
        />

        <Route path="/game/level1" element={<ProtectedRouteGame element={Game} level="level1" />} />
        <Route path="/game/level2" element={<ProtectedRouteGame element={Game} level="level2" />} />
        <Route path="/game/level3" element={<ProtectedRouteGame element={Game} level="level3" />} />
        <Route path="/game/level4" element={<ProtectedRouteGame element={Game} level="level4" />} />
        <Route path="/game/level5" element={<ProtectedRouteGame element={Game} level="level5" />} />
        <Route path="/game/level6" element={<ProtectedRouteGame element={Game} level="level6" />} />
        <Route path="/game/level7" element={<ProtectedRouteGame element={Game} level="level7" />} />
        <Route path="/game/level8" element={<ProtectedRouteGame element={Game} level="level8" />} />
        <Route path="/game/level9" element={<ProtectedRouteGame element={Game} level="level9" />} />
        <Route
          path="/game-completion"
          element={<GameCompletionCard gameType="insertion-front" score={100} timeSpent={45} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
