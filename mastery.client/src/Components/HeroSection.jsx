// src/components/HeroSection.js
import React from 'react';
import CourseCard from './CourseCard';

const HeroSection = () => {
  const courses = [
    { title: "React for Beginners", description: "Learn the basics of React.", image: "krishna pic.jpg", rating: 4 },
    { title: "Advanced JavaScript", description: "Deep dive into JavaScript.", image: "krishna pic.jpg", rating: 5 },
    { title: "CSS Mastery", description: "Master CSS for responsive designs.", image: "krishna pic.jpg", rating: 4 }
  ];

  return (
    <div className="p-6 mx-auto ">
      <div className="px-10 py-20 text-white rounded-lg shadow-lg bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
        <h1 className="mb-4 text-5xl font-bold transition-all duration-500 glow-text">
          Welcome to Code Academy
        </h1>
        <p className="mb-8 text-xl">The best place to learn coding.</p>
        <div className="grid gap-6 md:grid-cols-3">
          {courses.map((course, index) => (
            <CourseCard
              key={index}
              title={course.title}
              description={course.description}
              image={course.image}
              rating={course.rating}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
