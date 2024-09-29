import React from 'react';

const Features = () => {
    return (
        <div className="max-w-6xl mx-auto px-4 py-16">
            <div className='mb-24'>
                <h2 className="text-center text-4xl font-bold mt-16 mb-4">
                    Master concepts in 15 minutes a day
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Whether you're a complete beginner or ready to dive into machine learning and
                    beyond, Brilliant makes it easy to level up fast with fun, bite-sized lessons.
                </p>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center mb-16">
                <div className="md:w-1/2 mb-8 md:mb-0">
                    <img src="/api/placeholder/400/300" alt="Interactive graph" className="w-full h-auto" />
                </div>
                <div className="md:w-1/2 md:pl-12">
                    <h2 className="text-3xl font-bold mb-4">Effective, hands-on learning</h2>
                    <p className="text-gray-600">
                        Visual, interactive lessons make concepts feel intuitive — so even complex ideas just
                        click. Our real-time feedback and simple explanations make learning efficient.
                    </p>
                </div>
            </div>

            <div className="flex flex-col md:flex-row-reverse justify-between items-center">
                <div className="md:w-1/2 mb-8 md:mb-0">
                    <img src="/api/placeholder/400/300" alt="Interactive robot" className="w-full h-auto" />

                </div>
                <div className="md:w-1/2 md:pr-12">
                    <h2 className="text-3xl font-bold mb-4">Learn at your level</h2>
                    <p className="text-gray-600">
                        Students and professionals alike can hone dormant skills or learn new ones. Progress
                        through lessons and challenges tailored to your level. Designed for ages 13 to 113.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Features;