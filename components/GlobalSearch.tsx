"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  Settings,
  User,
  Search,
  FileText,
  ShoppingCart,
  HelpCircle,
  Mail,
  LayoutTemplate,
} from "lucide-react"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"


export function GlobalSearch() {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)||e.key ==="Escape") {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false)
    command()
  }, [])

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setOpen(true)}
        className="relative h-9 w-9 p-0 xl:h-10 xl:w-40 xl:justify-start xl:px-8 xl:py-2"
      >
        <Search className="h-4 w-4 xl:mr-2" />
        <span className="hidden xl:inline-flex">Search...</span>
        <span className="sr-only">Search...</span>
        <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 xl:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." className="bg-white dark:bg-black text-black dark:text-white" />
        <CommandList className="bg-white dark:bg-black text-black dark:text-black">
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Navigation">
            <CommandItem
              onSelect={() => runCommand(() => router.push("/templates"))}
              className="flex items-center gap-2"
            >
              <LayoutTemplate className="h-4 w-4" />
              <span>Templates</span>
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => router.push("/blog"))}
              className="flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              <span>Blog</span>
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => router.push("/cart"))}
              className="flex items-center gap-2"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Cart</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Support">
            <CommandItem
              onSelect={() => runCommand(() => router.push("/faq"))}
              className="flex items-center gap-2"
            >
              <HelpCircle className="h-4 w-4" />
              <span>FAQ</span>
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => router.push("/contact"))}
              className="flex items-center gap-2"
            >
              <Mail className="h-4 w-4" />
              <span>Contact</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Account">
            <CommandItem
              onSelect={() => runCommand(() => router.push("/profile"))}
              className="flex items-center gap-2"
            >
              <User className="h-4 w-4" />
              <span>Profile</span>
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => router.push("/settings"))}
              className="flex items-center gap-2"
            >
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
} 