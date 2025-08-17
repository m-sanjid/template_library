import React, { JSX, useState } from "react";
import { Layout, FileText, Home, ShoppingCart, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { COMPONENTS } from "@/data/components";
import TEMPLATES from "@/lib/templates";

interface Template {
  id: number;
  name: string;
}

export const Sidebar = (): JSX.Element => {
  const [hover, setHover] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(0);

  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/components", label: "Components", icon: Layout },
    { href: "/templates", label: "Templates", icon: FileText },
    { href: "/cart", label: "Cart", icon: ShoppingCart },
    { href: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <>
      <div
        className={`bg-background sticky top-0 z-40 mr-4 hidden h-full w-64 transform overflow-auto border-r pt-20 pb-20 transition-transform duration-200 ease-in-out md:block lg:translate-x-0`}
      >
        <div className="p-4">
          <h2 className="mb-6 text-xl font-bold">Template Library</h2>

          {/* Main Navigation */}
          <nav className="mb-8 space-y-2">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(0)}
                  className={`group flex items-center gap-2 rounded-full px-4 py-2 transition-colors ${
                    pathname === item.href
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  }`}
                >
                  <Icon className="h-4 w-4 duration-300 ease-in-out group-hover:translate-x-1" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Components Section */}
          <div
            className="mb-6"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <h3 className="text-muted-foreground mb-2 text-sm font-semibold">
              Components
            </h3>
            <div className="space-y-1">
              {COMPONENTS.map((component, idx) => (
                <Link
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(0)}
                  key={idx}
                  href={`/components/${component.id}`}
                  className={`relative block rounded-full px-4 py-2 text-sm transition-all duration-300 ease-in-out ${
                    pathname === `/components/${component.id}`
                      ? "bg-primary text-primary-foreground font-bold"
                      : `${hover && hoveredIndex === idx ? "text-primary translate-x-1" : "text-muted-foreground"}`
                  }`}
                >
                  {component.title}
                  {hover && hoveredIndex === idx && (
                    <div className="bg-primary text-primary-foreground absolute top-2 right-2 rounded-full px-2 py-1 text-xs">
                      New
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Templates Section */}
          <div>
            <h3 className="text-muted-foreground mb-2 text-sm font-semibold">
              Templates
            </h3>
            <div className="space-y-1">
              {TEMPLATES.map((template, idx) => (
                <Link
                  key={idx}
                  href={`/templates/${template.id}`}
                  className={`block rounded-full px-4 py-2 text-sm transition-all duration-300 ease-in-out hover:translate-x-2 ${
                    pathname === `/templates/${template.id}`
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  }`}
                >
                  {template.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
