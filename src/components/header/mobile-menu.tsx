// MobileMenu.tsx (client)
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Link from "next/link";
import { allPages } from "@/lib/all-pages";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "../ui/theme-toggle";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center justify-between w-fit gap-2 sm:w-auto md:hidden">
      <ThemeToggle />
      <DropdownMenu open={open} onOpenChange={setOpen} aria-label="Menu">
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size={"icon"} aria-label="Menu" title="Menu">
            <span className="sr-only">Menu</span>
            <Menu className="size-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          aria-hidden={open}
          role="dialog"
          aria-modal="true"
          aria-labelledby="menu"
          aria-describedby="menu-description"
          className="flex flex-col gap-2 bg-transparent backdrop-blur-sm mr-4 mt-2"
        >
          {allPages.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              aria-label={label}
              title={label}
              passHref
            >
              <Button
                variant="ghost"
                size="lg"
                className="w-full justify-start text-3xl"
                onClick={() => setOpen(false)}
              >
                {label}
              </Button>
            </Link>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
