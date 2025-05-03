
import React from 'react';
import { Link } from 'react-router-dom';

const Logo = ({ className = '' }: { className?: string }) => {
  return (
    <Link to="/" className={`flex items-center gap-2 ${className}`}>
      <div className="bg-booba-yellow w-10 h-10 rounded-md flex items-center justify-center">
        <span className="text-white font-bold text-xl">b</span>
      </div>
      <span className="font-bold text-xl">
        <span className="text-booba-yellow">boo</span>
        <span className="text-booba-dark">BA</span>
      </span>
    </Link>
  );
};

export default Logo;
