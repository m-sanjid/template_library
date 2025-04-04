"use client";

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Correct way to check if the path should show navbar
  const shouldShowNavbar = !pathname.includes('/preview');

  return (
    <div>
      {shouldShowNavbar && <Navbar />}
      <div className="max-w-6xl mx-auto min-h-[150vh] overflow-hidden">
        {children}
      </div>
    </div>
  );
}