import React from 'react';

const BlogPost = ({ title, description, imageUrl }) => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden">
    <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
    <div className="p-4">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

const BlogsAndArticles = () => {
  const blogPosts = [
    {
      title: "Why Structify Uses Gamification",
      description: "Discover how Structify leverages gamification to make learning DSA engaging and effective for students of all ages.",
      imageUrl: "/threee.svg"
    },
    {
      title: "Implementing Structify in Kaboom.js",
      description: "Learn about our decision to use Kaboom.js for Structify and how it enhances the learning experience.",
      imageUrl: "/two.svg"
    },
    {
      title: "Why Not Unity for Structify?",
      description: "Explore the reasons behind choosing web technologies over Unity for building Structify's interactive learning platform.",
      imageUrl: "/one.svg"
    }
  ];

  return (
    <div className="relative py-16 overflow-hidden">
      {/* <svg className="absolute top-0 left-0 w-full" height="48" viewBox="0 0 100 10" preserveAspectRatio="none">
        <path d="M0 10 C 30 0, 70 0, 100 10 L 100 0 L 0 0 Z" fill="#3b82f6" />
      </svg> */}
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Featured Blogs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post, index) => (
            <BlogPost key={index} {...post} />
          ))}
        </div>
        <div className="text-center">
          <h3 className="text-2xl font-semibold mb-4 text-blue-800">Start Your Structify Journey Today!</h3>
          <p className="text-lg mb-6">
            Join Structify to master Data Structures and Algorithms through interactive, gamified learning experiences.
            Our platform is designed to make complex concepts accessible and enjoyable for learners of all levels.
          </p>
          <button className="bg-blue-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-600 transition duration-300">
            Get Started Now
          </button>
        </div>
      </div>
      <svg className="absolute bottom-0 left-0 w-full" height="48" viewBox="0 0 100 10" preserveAspectRatio="none">
        <path d="M0 0 C 30 10, 70 10, 100 0 L 100 10 L 0 10 Z" fill="#000" />
      </svg>
    </div>
  );
};

export default BlogsAndArticles;