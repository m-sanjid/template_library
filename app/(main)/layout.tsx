"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { JSX } from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const pathname = usePathname();
  const shouldShowSidebar = !pathname.includes("/preview");
  console.log("pathname", pathname);

  return (
    <div className="min-h-screen max-w-7xl mx-auto">
      <Navbar />
      {shouldShowSidebar && <Sidebar />}
      <main className={shouldShowSidebar ? "lg:pl-64" : ""}>
        <div className="max-w-4xl mx-auto min-h-[150vh] overflow-hidden">
          {children}
        </div>
      </main>
    </div>
  );
}
