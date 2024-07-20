// src/components/CourseCard.js
import React from 'react';

const CourseCard = ({ title, description, image, rating }) => {
  return (
    <div className="p-6 text-gray-800 transition-shadow duration-300 bg-white rounded-lg shadow-lg hover:shadow-xl">
      <img src={image} alt={title} className="object-cover w-full h-48 rounded-t-lg" />
      <div className="p-4">
        <h2 className="mb-2 text-2xl font-bold">{title}</h2>
        <p className="mb-4 text-gray-600">{description}</p>
        <div className="flex items-center mb-4">
          {[...Array(5)].map((star, index) => (
            <svg
              key={index}
              className={`w-5 h-5 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.947a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.357 2.46a1 1 0 00-.364 1.118l1.287 3.947c.3.921-.755 1.688-1.539 1.118L10 13.347a1 1 0 00-1.175 0l-3.357 2.46c-.784.57-1.839-.197-1.539-1.118l1.287-3.947a1 1 0 00-.364-1.118L.905 9.374c-.783-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.286-3.947z" />
            </svg>
          ))}
        </div>
        <button className="px-4 py-2 text-white transition-colors duration-300 bg-blue-500 rounded-full hover:bg-blue-700">
          Enroll Now
        </button>
      </div>
    </div>
  );
};

export default CourseCard;

