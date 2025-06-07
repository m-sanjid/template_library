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
  Command,
  Sparkles,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

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
import { COMPONENTS } from "@/data/components"

export function GlobalSearch() {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey) || e.key === "Escape") {
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
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Button
          variant="outline"
          onClick={() => setOpen(true)}
          className="relative h-9 w-9 p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-4 xl:py-2 bg-white/50 dark:bg-black/50 backdrop-blur-sm border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-all duration-200"
        >
          <Search className="h-4 w-4 xl:mr-2 text-neutral-500 dark:text-neutral-400" />
          <span className="hidden xl:inline-flex text-neutral-500 dark:text-neutral-400">Search components...</span>
          <span className="sr-only">Search components...</span>
          <kbd className="pointer-events-none absolute right-2 top-1.5 hidden h-6 select-none items-center gap-1 rounded border bg-neutral-100 dark:bg-neutral-800 px-1.5 font-mono text-[10px] font-medium text-neutral-500 dark:text-neutral-400 xl:flex">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>
      </motion.div>
      <CommandDialog 
        open={open} 
        onOpenChange={setOpen}
      >
        <div className="flex items-center border-b border-neutral-200 dark:border-neutral-800 px-3">
          <Search className="h-4 w-4 text-neutral-500 dark:text-neutral-400 mr-2" />
          <CommandInput 
            placeholder="Type a command or search..." 
            className="flex-1 bg-transparent border-none focus:ring-0 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-500 dark:placeholder:text-neutral-400"
          />
        </div>
        <CommandList className="max-h-[500px] overflow-y-auto">
          <CommandEmpty className="py-6 text-center text-sm text-neutral-500 dark:text-neutral-400">
            <Sparkles className="h-6 w-6 mx-auto mb-2 text-neutral-400 dark:text-neutral-600" />
            No results found.
          </CommandEmpty>
          <CommandGroup heading="Components" className="p-2">
            {COMPONENTS.map((component, idx) => (
              <CommandItem
                key={idx}
                onSelect={() => runCommand(() => router.push(`/components/${component.id}`))}
                className="flex items-center gap-2 px-2 py-1.5 rounded-md text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer transition-colors"
              >
                <LayoutTemplate className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
                <span>{component.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator className="my-2 bg-neutral-200 dark:bg-neutral-800" />
          <CommandGroup heading="Navigation" className="p-2">
            <CommandItem
              onSelect={() => runCommand(() => router.push("/templates"))}
              className="flex items-center gap-2 px-2 py-1.5 rounded-md text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer transition-colors"
            >
              <LayoutTemplate className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
              <span>Templates</span>
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => router.push("/blog"))}
              className="flex items-center gap-2 px-2 py-1.5 rounded-md text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer transition-colors"
            >
              <FileText className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
              <span>Blog</span>
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => router.push("/cart"))}
              className="flex items-center gap-2 px-2 py-1.5 rounded-md text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer transition-colors"
            >
              <ShoppingCart className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
              <span>Cart</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator className="my-2 bg-neutral-200 dark:bg-neutral-800" />
          <CommandGroup heading="Support" className="p-2">
            <CommandItem
              onSelect={() => runCommand(() => router.push("/faq"))}
              className="flex items-center gap-2 px-2 py-1.5 rounded-md text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer transition-colors"
            >
              <HelpCircle className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
              <span>FAQ</span>
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => router.push("/contact"))}
              className="flex items-center gap-2 px-2 py-1.5 rounded-md text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer transition-colors"
            >
              <Mail className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
              <span>Contact</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator className="my-2 bg-neutral-200 dark:bg-neutral-800" />
          <CommandGroup heading="Account" className="p-2">
            <CommandItem
              onSelect={() => runCommand(() => router.push("/profile"))}
              className="flex items-center gap-2 px-2 py-1.5 rounded-md text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer transition-colors"
            >
              <User className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
              <span>Profile</span>
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => router.push("/settings"))}
              className="flex items-center gap-2 px-2 py-1.5 rounded-md text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer transition-colors"
            >
              <Settings className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
              <span>Settings</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
} 