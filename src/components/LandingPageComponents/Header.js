import React from 'react';

const Header = () => {
    return (
        <header className="flex justify-between items-center p-4 px-12">
            <h1 className="text-4xl font-bold">Structify</h1>
            <div className='flex gap-3'>
                <a href="/login" className="px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-100 font-bold">Log in</a>
                <a href="/signup" className="px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-100 font-bold">Signup</a>
            </div>
        </header>
    );
};

export default Header;

