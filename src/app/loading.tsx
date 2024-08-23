// components/Loading.tsx
import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <span className="loading loading-dots loading-lg"></span>
    </div>
  );
};

export default Loading;
