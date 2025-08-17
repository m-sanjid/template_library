"use client";

import { useSession, signOut } from "next-auth/react";
import { Link } from "next-view-transitions";
import { Button } from "./ui/button";
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
import { useState, useRef } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import Logo from "./Logo";
import SigninButton from "./SigninButton";
import { useCart } from "@/context/CartContext";
import { GlobalSearch } from "./GlobalSearch";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useTheme } from "next-themes";

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

export default function Navbar() {
  const { data: session } = useSession();
  const { cart } = useCart();
  const pathname = usePathname();
  const isAuthenticated = !!session;
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState<number | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 0);
  });

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  return (
    <nav
      className={`sticky z-50 w-full transition-all duration-700 ease-in-out ${
        isScrolled
          ? "bg-background/95 supports-[backdrop-filter]:bg-background/60 top-0 mx-auto max-w-5xl border backdrop-blur md:top-4 md:rounded-full"
          : "bg-background/95 top-0 backdrop-blur"
      }`}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 md:px-8">
        {/* Logo */}
        <Logo />

        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <nav
            className="relative flex space-x-2"
            ref={navRef}
            onMouseLeave={() => setIsHovered(null)}
          >
            {/* Navigation Items */}
            {isAuthenticated
              ? navItems.map((item, idx) => (
                  <Link
                    href={item.href}
                    key={item.href}
                    onMouseEnter={() => setIsHovered(idx)}
                    className={`relative z-10 flex items-center gap-2 p-2 ${
                      pathname === item.href
                        ? "text-muted-foreground"
                        : "text-primary"
                    }`}
                  >
                    <span className="text-sm">{item.title}</span>
                    {isHovered === idx && (
                      <motion.div
                        layoutId="hover"
                        className="absolute inset-0 z-20 h-full w-full rounded-lg bg-black/10 dark:bg-white/10"
                      />
                    )}
                  </Link>
                ))
              : outNavItems.map((item, idx) => (
                  <Link
                    href={item.href}
                    key={item.href}
                    onMouseEnter={() => setIsHovered(idx)}
                    className={`relative z-10 flex items-center gap-8 p-2 ${
                      pathname === item.href
                        ? "text-muted-foreground"
                        : "text-primary"
                    }`}
                  >
                    <span className="text-sm">{item.title}</span>
                    {isHovered === idx && (
                      <motion.div
                        layoutId="hover"
                        className="absolute inset-0 z-20 h-full w-full rounded-lg bg-black/10 dark:bg-white/10"
                      />
                    )}
                  </Link>
                ))}
          </nav>
        </div>

        {/* Global Search */}
        <div className="mx-4 max-w-sm flex-1">
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
            <DropdownMenuContent align="end" className="w-48 px-2 py-4">
              {isAuthenticated
                ? navItems.map(({ title, href }) => (
                    <DropdownMenuItem key={href} asChild>
                      <Link
                        href={href}
                        className="flex w-full items-center gap-2"
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
              <DropdownMenuItem asChild>
                <SigninButton />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Auth Section */}
        <div className="flex items-center gap-2 lg:gap-6">
          {/* Cart Icon */}
          <Link href="/cart">
            <Button variant="ghost" size="sm" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cart && cart.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  {cart.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              )}
            </Button>
          </Link>

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={session.user?.image || undefined}
                      alt={session.user?.name || ""}
                    />
                    <AvatarFallback>
                      {session.user?.name?.[0] || "U"}
                    </AvatarFallback>
                  </Avatar>
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
                  <Link href="/profile" className="flex w-full items-center">
                    <User className="mr-2 h-4 w-4" /> Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => signOut()}>
                  <LogOut className="mr-2 h-4 w-4" /> Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden md:block">
              <SigninButton />
            </div>
          )}

          {/* Theme Toggle */}
          <Button variant="ghost" size="sm" onClick={toggleTheme}>
            {theme === "dark" ? (
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
