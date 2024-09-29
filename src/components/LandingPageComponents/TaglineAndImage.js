import React from 'react';

const TaglineAndImage = () => {
    return (
        <main className="max-w-6xl mx-auto px-4 py-12 flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
                <h2 className="text-5xl font-bold mb-4">
                    Learn by <span className="text-blue-500">Playing Games</span>
                </h2>
                <p className="text-xl mb-6">
                    Intelligent Tutoring System for teaching Data Structures
                </p>
                <button className="bg-green-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-600">
                    Get started
                </button>
            </div>

            <div className="md:w-1/2 ml-8">
                <div className="bg-gray-100 rounded-lg p-4 shadow-lg">
                    <div className="bg-white rounded-lg p-4 shadow">
                        <div className="w-full h-48 rounded-lg mb-4">
                            <img src='./land.png' alt='img' className="w-full h-full object-cover object-center"></img>
                        </div>
                        <div className="space-y-2">
                            <div className="bg-gray-200 h-8 w-3/4 rounded"></div>
                            <div className="bg-gray-200 h-8 w-1/2 rounded"></div>
                            <div className="bg-gray-200 h-8 w-2/3 rounded"> </div>
                        </div>
                    </div>
                    <div className="mt-2 text-right text-sm text-gray-600">Happy Learning !</div>
                </div>
            </div>
        </main>
    );
};

export default TaglineAndImage;