"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/Sidebar";
import { JSX } from "react";
import Navbar from "@/components/Navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const pathname = usePathname();
  const shouldShowSidebar = !pathname.includes("/preview");
  const shouldScale = pathname.includes("/preview");
  const shouldShowNavbar = !pathname.includes("/preview");

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <div className="mx-auto flex min-h-screen max-w-7xl">
        {shouldShowSidebar && <Sidebar />}
        <main className={`${shouldShowSidebar ? "" : ""} p-4`}>
          <div
            className={`${shouldScale ? "max-w-7xl" : "max-w-6xl"} mx-auto overflow-hidden`}
          >
            {children}
          </div>
        </main>
      </div>
    </>
  );
}
