import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear local storage
    localStorage.clear();
    // navigate to login page
    navigate('/login');
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
    <header className={`fixed top-0 left-0 right-0 flex justify-between items-center p-4 px-12 bg-white transition-shadow duration-300 z-50 ${
      scrolled ? 'shadow-md' : ''
    }`}>
      <a href="/" style={{ fontFamily: 'Atma, sans-serif' }} className="text-4xl font-bold pt-2 text-blue-600 font-semibold hover:text-green-600">Structify</a>
      <div className='flex gap-3'>
        {localStorage.getItem("token") ? (
          <>
          <a href="/home" className="px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-100">
            Home
          </a>
          <button onClick={handleLogout} className="px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-100">Logout</button>
          </>
        ) : (
          <>
            <a href="/login" className="px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-100">
              Log in
            </a>
            <a href="/signup" className="px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-100">
              Signup
            </a>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;