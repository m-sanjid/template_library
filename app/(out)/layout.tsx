import React from "react";
import Navbar from "@/components/Navbar";

const OutLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen max-w-7xl mx-auto">
      <Navbar />
      {children}
    </div>
  );
};

export default OutLayout;