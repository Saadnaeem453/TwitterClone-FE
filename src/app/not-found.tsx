import React from 'react';
import Link from 'next/link';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-base-200 text-center p-6">
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-6xl font-bold text-primary">404</h1>
        <p className="text-xl text-secondary">Oops! The page you’re looking for doesn’t exist.</p>
      
        <Link href="/">
          <button className="btn btn-primary mt-6">Go Back Home</button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
