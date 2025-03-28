"use client";

import React, { useState } from 'react';
import Navbar2 from './Navbar1';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const NavbarPreview = () => {
  const [activeVariants, setActiveVariants] = useState({
    authenticated: true,
    scrolled: false,
    theme: 'light'
  });

  const variants = [
    {
      label: 'Authenticated',
      props: { isAuthenticated: true, scrolled: false }
    },
    {
      label: 'Unauthenticated',
      props: { isAuthenticated: false, scrolled: false }
    },
    {
      label: 'Scrolled',
      props: { isAuthenticated: true, scrolled: true }
    }
  ];

  const toggleVariant = (key: keyof typeof activeVariants) => {
    setActiveVariants(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="min-h-screen bg-background flex justify-center items-center flex-col relative">
      {/* Controls */}
      <Card className="absolute top-4 right-4 z-50 w-80 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <CardHeader>
          <CardTitle>Preview Controls</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="authenticated">Authenticated</Label>
            <Switch
              id="authenticated"
              checked={activeVariants.authenticated}
              onCheckedChange={() => toggleVariant('authenticated')}
            />
          </div>
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="scrolled">Scrolled</Label>
            <Switch
              id="scrolled"
              checked={activeVariants.scrolled}
              onCheckedChange={() => toggleVariant('scrolled')}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="theme">Theme</Label>
            <Select
              value={activeVariants.theme}
              onValueChange={(value: 'light' | 'dark') => 
                setActiveVariants(prev => ({ ...prev, theme: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Preview Area */}
      <div className={`${activeVariants.theme === 'dark' ? 'dark' : ''}`}>
        <div className="space-y-16">
            <div className="relative">
              <Card className="absolute top-0 left-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <CardContent className="p-2">
                  <span className="text-sm font-medium">Default</span>
                </CardContent>
              </Card>
              <div className="pt-12">
                <Navbar2 
                  isAuthenticated={activeVariants.authenticated}
                  scrolled={activeVariants.scrolled}
                />
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarPreview;