"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/Sidebar";
import { JSX } from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const pathname = usePathname();
  const shouldShowSidebar = !pathname.includes("/preview");

  return (
    <div className="flex min-h-screen max-w-7xl mx-auto">
      {shouldShowSidebar && <Sidebar />}
      <main className={`${shouldShowSidebar ? "" : ""} p-4`}>
        <div className="max-w-4xl mx-auto overflow-hidden">
          {children}
        </div>
      </main>
    </div>
  );
}