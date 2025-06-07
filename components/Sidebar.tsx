import React, { JSX, useState } from 'react';
import { Layout, FileText, Home, ShoppingCart, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { COMPONENTS } from '@/data/components';
import TEMPLATES from '@/lib/templates';

interface Template {
  id: number;
  name: string;
}

export const Sidebar = (): JSX.Element => {
  const [hover, setHover] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(0);

  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/components', label: 'Components', icon: Layout },
    { href: '/templates', label: 'Templates', icon: FileText },
    { href: '/cart', label: 'Cart', icon: ShoppingCart },
    { href: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      <div
        className={`sticky pb-20 hidden md:block overflow-auto mr-4 top-0 pt-20 h-full w-64 bg-background border-r transform transition-transform duration-200 ease-in-out z-40 lg:translate-x-0`}
      >
        <div className="p-4">
          <h2 className="text-xl font-bold mb-6">Template Library</h2>
          
          {/* Main Navigation */}
          <nav className="space-y-2 mb-8">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(0)}
                  className={`flex group items-center gap-2 py-2 px-4 rounded-full transition-colors ${
                    pathname === item.href
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted'
                  }`}
                >
                  <Icon className="h-4 w-4 group-hover:translate-x-1 duration-300 ease-in-out" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Components Section */}
          <div className="mb-6" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            <h3 className="text-sm font-semibold text-muted-foreground mb-2">
              Components
            </h3>
            <div className="space-y-1">
              {COMPONENTS.map((component,idx) => (
                <Link
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(0)}
                  key={idx}
                  href={`/components/${component.id}`}
                  className={`relative block py-2 px-4 rounded-full text-sm transition-all duration-300 ease-in-out ${
                    pathname === `/components/${component.id}`
                      ? 'bg-primary text-primary-foreground font-bold'
                      : `${hover && hoveredIndex === idx ? 'translate-x-1 text-primary' : 'text-muted-foreground'}`
                  }`}
                >
                  {component.title}
                  {hover && hoveredIndex === idx && (
                    <div className="absolute right-2 top-2 bg-primary text-primary-foreground rounded-full px-2 py-1 text-xs">
                      New
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Templates Section */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-2">
              Templates
            </h3>
            <div className="space-y-1">
              {TEMPLATES.map((template,idx) => (
                <Link
                  key={idx}
                  href={`/templates/${template.id}`}
                  className={`block hover:translate-x-2 py-2 px-4 rounded-full text-sm transition-all duration-300 ease-in-out ${
                    pathname === `/templates/${template.id}`
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted'
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