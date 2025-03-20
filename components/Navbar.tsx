"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { User, LogOut, ChevronDown, Sun, Moon, Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import Logo from "./Logo";
import SigninButton from "./SigninButton";

const navItems = [
  { title: "Templates", href: "/templates" },
  { title: "Pro", href: "/pricing" },
  { title: "Settings", href: "/settings" },
];

const outNavItems = [
  { title: "Templates", href: "/templates" },
  { title: "Pricing", href: "/pricing" },
  { title: "Contact", href: "/contact" },
  { title: "About Us", href: "/about" },
  { title: "Blog", href: "/blog" },
];

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const isAuthenticated = !!session;
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hoverPosition, setHoverPosition] = useState({ left: 0, width: 0 });
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const root = document.documentElement;
    const currentTheme =
      localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");

    const isDark = currentTheme === "dark";
    setIsDarkMode(isDark);
    root.classList.toggle("dark", isDark);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 0);
  });

  if (!mounted) {
    return (
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur" />
    );
  }

  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark", !isDarkMode);
    localStorage.setItem("theme", newTheme);
  };

  const handleHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget) {
      const rect = e.currentTarget.getBoundingClientRect();
      const navRect = navRef.current
        ? navRef.current.getBoundingClientRect()
        : { left: 0 };
      setHoverPosition({
        left: rect.left - navRect.left,
        width: rect.width,
      });
      setIsHovered(true);
    }
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <nav
      className={`sticky z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "top-4 mx-auto max-w-5xl border rounded-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
          : "top-0 border-b bg-background/95 backdrop-blur"
      }`}
      onMouseLeave={handleMouseLeave}
    >
      <div className="max-w-7xl mx-auto flex h-14 items-center px-4 md:px-8 justify-between">
        {/* Logo */}
        <Logo />

        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <nav className="relative flex space-x-2" ref={navRef}>
            {/* Hover Effect */}
            {isHovered && (
              <motion.div
                className="absolute top-0 bottom-0 z-0 bg-black/10 dark:bg-white/10 rounded-lg"
                initial={false}
                animate={{
                  left: hoverPosition.left,
                  width: hoverPosition.width,
                  opacity: 1,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
            )}

            {/* Navigation Items */}
            {isAuthenticated
              ? navItems.map(({ title, href }) => (
                  <Link href={href} key={href} passHref>
                    <Button
                      variant={"ghost"}
                      size="sm"
                      className={`gap-2 relative z-10 ${
                        pathname === href
                          ? "text-muted-foreground"
                          : "text-primary"
                      }`}
                      onMouseEnter={handleHover}
                    >
                      {title}
                    </Button>
                  </Link>
                ))
              : outNavItems.map(({ title, href }) => (
                  <Link href={href} key={href} passHref>
                    <Button
                      variant={"ghost"}
                      size="sm"
                      onMouseEnter={handleHover}
                      className={`gap-2 relative z-10 ${
                        pathname === href
                          ? "text-muted-foreground"
                          : "text-primary"
                      }`}
                    >
                      {title}
                    </Button>
                  </Link>
                ))}
          </nav>
        </div>

        {/* Mobile Navigation Dropdown */}
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {isAuthenticated
                ? navItems.map(({ title, href }) => (
                    <DropdownMenuItem key={href} asChild>
                      <Link
                        href={href}
                        className="flex items-center gap-2 w-full"
                      >
                        {title}
                      </Link>
                    </DropdownMenuItem>
                  ))
                : outNavItems.map(({ title, href }) => (
                    <DropdownMenuItem key={href} asChild>
                      <Link href={href} className="w-full">
                        {title}
                      </Link>
                    </DropdownMenuItem>
                  ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Auth Section */}
        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Image
                    width={24}
                    height={24}
                    src={session.user?.image || "/default-avatar.png"}
                    alt="Avatar"
                    className="h-6 w-6 rounded-full"
                  />
                  <span className="hidden md:inline-block">
                    {session.user?.name}
                  </span>
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="flex items-center w-full">
                    <User className="mr-2 h-4 w-4" /> Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => signOut()}>
                  <LogOut className="mr-2 h-4 w-4" /> Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <SigninButton />
          )}

          {/* Theme Toggle */}
          <Button variant="ghost" size="sm" onClick={toggleTheme}>
            {isDarkMode ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </nav>
  );
}
