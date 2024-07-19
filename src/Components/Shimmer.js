import React from 'react';

const Shimmer = ({ count }) => {
  const shimmerArray = Array.from({ length: count }, (_, index) => index + 1);

  return (
    <>
      {shimmerArray.map((item) => (
        <div key={item} className="lg:w-1/4 md:w-1/2 sm:w-full p-4">
          <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
            <div className="animate-pulse h-48 sm:h-32 md:h-48 lg:h-48"></div>
            <div className="p-6">
              <div className="animate-pulse h-4 sm:h-2 md:h-4 lg:h-4 w-1/2 mb-2 rounded"></div>
              <div className="animate-pulse h-8 sm:h-4 md:h-8 lg:h-8 w-full mb-4 rounded"></div>
              <div className="animate-pulse h-4 sm:h-2 md:h-4 lg:h-4 w-1/4 mb-2 rounded"></div>
              <div className="animate-pulse h-4 sm:h-2 md:h-4 lg:h-4 w-1/4 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Shimmer;
