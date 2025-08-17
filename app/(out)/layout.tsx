import React from "react";
import Navbar from "@/components/Navbar";

const OutLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto min-h-screen max-w-7xl">
      <Navbar />
      {children}
    </div>
  );
};

export default OutLayout;
