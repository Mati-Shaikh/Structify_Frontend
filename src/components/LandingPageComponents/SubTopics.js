import React, { useState } from 'react';
import { BarChart2, Zap } from 'lucide-react';

const categories = ['Math', 'Data Analysis', 'CS & Programming', 'Science', 'Electives'];

const courses = {
  'Math': [
    { icon: <Zap size={20} />, name: 'Solving Equations' },
    { icon: <BarChart2 size={20} />, name: 'Understanding Graphs' },
    { icon: <Zap size={20} />, name: 'Geometry Fundamentals' },
    { icon: <Zap size={20} />, name: 'Vectors' },
    { icon: <Zap size={20} />, name: 'Systems of Equations' },
    { icon: <Zap size={20} />, name: 'Functions & Quadratics' },
    { icon: <Zap size={20} />, name: 'Calculus in a Nutshell' },
  ],
  'Data Analysis': [
    { icon: <BarChart2 size={20} />, name: 'Exploring Data Visually' },
    { icon: <BarChart2 size={20} />, name: 'Explaining Variation' },
    { icon: <BarChart2 size={20} />, name: 'Introduction to Probability' },
    { icon: <BarChart2 size={20} />, name: 'Predicting with Probability' },
    { icon: <BarChart2 size={20} />, name: 'Introduction to Neural Networks' },
    { icon: <BarChart2 size={20} />, name: 'Casino Probability' },
    { icon: <BarChart2 size={20} />, name: 'Perplexing Probability' },
  ],
};

const SubTopics = () => {
  const [selectedCategory, setSelectedCategory] = useState('Math');

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-4xl font-bold text-center mb-8">Guided courses for every journey</h2>

      <div className="flex justify-center mb-8">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-full mr-2 ${selectedCategory === category ? 'bg-gray-200' : 'bg-white'
              }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="flex">
        <div className="w-1/3 pr-8">
          <h3 className="text-xl font-bold mb-4">Courses in {selectedCategory}</h3>
          <ul>
            {courses[selectedCategory]?.map((course, index) => (
              <li key={index} className="flex items-center mb-4">
                <span className="mr-2">{course.icon}</span>
                <span>{course.name}</span>
              </li>
            ))}
          </ul>
          {selectedCategory === 'Math' && (
            <button className="text-gray-500 mt-4">+ 15 additional courses</button>
          )}
        </div>

        <div className="w-2/3">
          <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg">
            <div className="bg-black text-white px-4 py-2 flex items-center">
              <div className="flex space-x-2 mr-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="text-sm">{selectedCategory.toUpperCase()}</span>
            </div>
            <div className="bg-white p-8">
              {selectedCategory === 'Math' ? (
                <div>
                  <h3 className="text-2xl font-bold mb-4">Surface Area</h3>
                  <img src="/api/placeholder/400/200" alt="Surface Area Diagram" className="mb-4" />
                  <p>Fill in an expression for the area of the box's base in terms of x.</p>
                  <div className="flex items-center mt-4">
                    <span className="mr-2">B =</span>
                    <input type="text" className="border rounded px-2 py-1 w-20 mr-2" />
                    <span>cm²</span>
                  </div>
                  <button className="bg-black text-white px-4 py-2 rounded mt-4">Submit</button>
                </div>
              ) : (
                <div>
                  <h3 className="text-2xl font-bold mb-4">Data Analysis Preview</h3>
                  <img src="/api/placeholder/400/200" alt="Data Analysis Preview" className="mb-4" />
                  <p>What proportion of moviegoers saw both movies?</p>
                  <div className="space-y-2 mt-4">
                    {['0.05', '0.15', '0.25'].map((option) => (
                      <div key={option} className="flex items-center">
                        <input type="radio" id={option} name="proportion" className="mr-2" />
                        <label htmlFor={option}>{option}</label>
                      </div>
                    ))}
                  </div>
                  <button className="bg-black text-white px-4 py-2 rounded mt-4">Submit</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubTopics;