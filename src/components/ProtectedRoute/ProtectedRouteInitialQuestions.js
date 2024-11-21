import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRouteInitialQuestions = ({ element: Component, ...rest }) => {
  const [isInitialQuestionsVisible, setIsInitialQuestionsVisible] = useState(null);

  useEffect(() => {
    const checkShowInitialQuestions = async () => {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      const userFullName = localStorage.getItem('userFullName');

      if (!token || !userId || !userFullName) {
        setIsInitialQuestionsVisible(false);
        return;
      }

      try {
        // Make an API call to verify user progress
        const response = await fetch('http://localhost:3005/api/users/protectedRouteInitialQuestions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            token: token,
          },
          body: JSON.stringify({ userId, userFullName }),
        });

        if (response.ok) {
          
          // Check the message to set the state
          setIsInitialQuestionsVisible(true);
        } else {
          setIsInitialQuestionsVisible(false);
        }
      } catch (err) {
        setIsInitialQuestionsVisible(false);
      }
    };

    checkShowInitialQuestions();
  }, []);

  if (isInitialQuestionsVisible === null) {
    // You can add a loading spinner here while checking the welcome status
    return <div class="flex-col gap-4 mt-64 w-full flex items-center justify-center">
    <div
      class="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full"
    >
      <div
        class="w-16 h-16 border-4 border-transparent text-green-400 text-2xl animate-spin flex items-center justify-center border-t-green-400 rounded-full"
      ></div>
    </div>
  </div>
  }

  // Show the welcome page or navigate based on the `showWelcome` status
  return isInitialQuestionsVisible ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/home" replace />
  );
};

export default ProtectedRouteInitialQuestions;
