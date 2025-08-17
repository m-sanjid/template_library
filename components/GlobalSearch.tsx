"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Settings,
  User,
  Search,
  FileText,
  ShoppingCart,
  HelpCircle,
  Mail,
  LayoutTemplate,
} from "lucide-react";
import { motion } from "motion/react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { COMPONENTS } from "@/data/components";
import { IconCircle } from "@tabler/icons-react";

export function GlobalSearch() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);
  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false);
    command();
  }, []);

  const NavItems = {
    navigation: [
      {
        label: "Templates",
        href: "/templates",
      },
      {
        label: "Blog",
        href: "/blog",
      },
      {
        label: "Cart",
        href: "/cart",
      },
    ],
    support: [
      {
        label: "FAQ",
        href: "/faq",
      },
      {
        label: "Contact",
        href: "/contact",
      },
    ],
    account: [
      {
        label: "Profile",
        href: "/profile",
      },
      {
        label: "Settings",
        href: "/settings",
      },
    ],
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Button
          variant="outline"
          onClick={() => setOpen(true)}
          className="relative border-neutral-200 bg-white/50 p-0 backdrop-blur-sm transition-all duration-200 hover:bg-neutral-100 xl:justify-start xl:px-4 xl:py-2 dark:border-neutral-800 dark:bg-black/50 dark:hover:bg-neutral-900"
        >
          <Search className="h-4 w-4 text-neutral-500 xl:mr-2 dark:text-neutral-400" />
          <span className="hidden text-sm text-neutral-500 md:inline-flex dark:text-neutral-400">
            Search
          </span>
          <kbd className="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>
      </motion.div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList className="max-h-[500px] overflow-y-auto">
          <CommandEmpty className="text-muted-foreground py-6 text-center text-sm">
            No results found.
          </CommandEmpty>
          <CommandGroup heading="Components" className="p-2">
            {COMPONENTS.map((component, idx) => (
              <CommandItem
                key={idx}
                onSelect={() =>
                  runCommand(() => router.push(`/components/${component.id}`))
                }
                className="command-item"
              >
                <IconCircle className="icon" />
                <span>{component.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator className="my-2 bg-neutral-200 dark:bg-neutral-800" />
          <CommandGroup heading="Navigation" className="p-2">
            <CommandItem
              onSelect={() => runCommand(() => router.push("/templates"))}
              className="command-item"
            >
              <LayoutTemplate className="icon" />
              <span>Templates</span>
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => router.push("/blog"))}
              className="command-item"
            >
              <FileText className="icon" />
              <span>Blog</span>
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => router.push("/cart"))}
              className="command-item"
            >
              <ShoppingCart className="icon" />
              <span>Cart</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator className="my-2 bg-neutral-200 dark:bg-neutral-800" />
          <CommandGroup heading="Support" className="p-2">
            <CommandItem
              onSelect={() => runCommand(() => router.push("/faq"))}
              className="command-item"
            >
              <HelpCircle className="icon" />
              <span>FAQ</span>
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => router.push("/contact"))}
              className="command-item"
            >
              <Mail className="icon" />
              <span>Contact</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator className="my-2 bg-neutral-200 dark:bg-neutral-800" />
          <CommandGroup heading="Account" className="p-2">
            <CommandItem
              onSelect={() => runCommand(() => router.push("/profile"))}
              className="command-item"
            >
              <User className="icon" />
              <span>Profile</span>
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => router.push("/settings"))}
              className="command-item"
            >
              <Settings className="icon" />
              <span>Settings</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
