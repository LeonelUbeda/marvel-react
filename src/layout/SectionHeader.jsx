import React from 'react';

export default ({ children }) => (
  <div className="bg-blue-500 w-full">
    <div className="container mx-auto flex justify-between items-center px-2 md:px-0">
      {children}
    </div>
  </div>
);
