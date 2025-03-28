"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import {
  User,
  LogOut,
  ChevronDown,
  Sun,
  Moon,
  Menu,
  ShoppingCart,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState, useRef } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import Logo from "@/components/Logo";
import SigninButton from "@/components/SigninButton";
import { useCart } from "@/context/CartContext";
import { GlobalSearch } from "@/components/GlobalSearch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navItems = [
  { title: "Templates", href: "/templates" },
  { title: "Components", href: "/components" },
  { title: "Pricing", href: "/pricing" },
  { title: "Settings", href: "/settings" },
  { title: "Purchases", href: "/purchases" },
];

const outNavItems = [
  { title: "Templates", href: "/templates" },
  { title: "Components", href: "/components" },
  { title: "Pricing", href: "/pricing" },
  { title: "Contact", href: "/contact" },
  { title: "About Us", href: "/about" },
];

export default function Navbar2({isAuthenticated=false, scrolled=false}: {isAuthenticated?: boolean, scrolled?: boolean}) {
  const { cart } = useCart();
  const pathname = usePathname();
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
    className={`sticky z-50 w-full transition-all duration-300 ${scrolled || isScrolled
      ? "top-4 mx-auto max-w-5xl border rounded-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      : "top-0 bg-background/95 backdrop-blur"
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
                <Link href={"#"} key={href} passHref>
                  <Button
                    size="sm"
                    className={`gap-2 relative bg-transparent border-none shadow-none hover:bg-transparent z-10 ${
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
                <Link href={"#"} key={href} passHref>
                  <Button
                    size="sm"
                    onMouseEnter={handleHover}
                    className={`gap-2 relative bg-transparent border-none shadow-none hover:bg-transparent z-10 ${
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

        {/* Global Search */}
        <div className="flex-1 max-w-sm mx-4">
          <GlobalSearch />
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
                      href={"#"}
                      className="flex items-center gap-2 w-full"
                    >
                      {title}
                    </Link>
                  </DropdownMenuItem>
                ))
                : outNavItems.map(({ title, href }) => (
                  <DropdownMenuItem key={href} asChild>
                    <Link href={"#"} className="w-full">
                      {title}
                    </Link>
                  </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Auth Section */}
        <div className="flex items-center gap-6">
          {/* Cart Icon */}
          <Link href="#">
            <Button variant="ghost" size="sm" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cart && cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cart[0].quantity}
                </span>
              )}
            </Button>
          </Link>

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={''} />
                    <AvatarFallback>{'U'}</AvatarFallback>
                  </Avatar>
                  <span className="hidden md:inline-block">
                    {'Username'}
                  </span>
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="#" className="flex items-center w-full">
                    <User className="mr-2 h-4 w-4" /> Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => {}}>
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
