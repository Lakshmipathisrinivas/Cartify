import React from 'react';

const Offline = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="mb-4 text-lg text-gray-600">
        <p>I think you are offline...</p>
      </div>
      <div className="text-sm text-gray-500">
        <p>Check your internet connection.</p>
      </div>
    </div>
  );
};

export default Offline;
