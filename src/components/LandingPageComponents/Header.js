import React from 'react';

const Header = () => {
    return (
        <header className="flex justify-between items-center p-4 px-12">
            <a href= "/" style={{ fontFamily: 'Atma, sans-serif' }} className="text-4xl font-bold pt-2 text-blue-600 font-semibold hover:text-green-600">Structify</a>
            <div className='flex gap-3'>
                <a href="/login" className="px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-100">Log in</a>
                <a href="/signup" className="px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-100">Signup</a>
            </div>
        </header>
    );
};

export default Header;

