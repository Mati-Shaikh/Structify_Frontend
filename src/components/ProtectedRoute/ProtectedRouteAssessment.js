import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRouteAssessment = ({ element: Component, assessmentName, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); 

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      const userFullName = localStorage.getItem('userFullName');



      if (!token || !userId || !userFullName) {
        setIsAuthenticated(false);
        return;
      }

      try {
        // Call your backend to verify the token along with userId and userFullName
        const response = await fetch('http://localhost:3005/api/users/protectedRouteAssessment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
             token: token, 
          },
          body: JSON.stringify({ userId, userFullName, assessmentName }),
        });
        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        setIsAuthenticated(false);
      }
    };

    verifyToken();
  }, [assessmentName]);

  if (isAuthenticated === null) {
    // You can add a loading spinner here while verifying token
    return <div className="flex-col gap-4 mt-64 w-full flex items-center justify-center">
    <div
      className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full"
    >
      <div
        className="w-16 h-16 border-4 border-transparent text-green-400 text-2xl animate-spin flex items-center justify-center border-t-green-400 rounded-full"
      ></div>
    </div>
  </div>
  }

  return isAuthenticated ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/home" replace />
  );
};

export default ProtectedRouteAssessment;
