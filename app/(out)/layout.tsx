import Navbar from '@/components/Navbar';
import React from 'react';

const OutLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen max-w-7xl mx-auto">
      <Navbar />
      {children}
    </div>
  );
};

export default OutLayout;