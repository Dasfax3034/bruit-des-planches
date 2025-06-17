// ScrollEffectWrapper.tsx
"use client";

import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

export default function ScrollEffectWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handle);
    handle();
    return () => window.removeEventListener("scroll", handle);
  }, []);

  return <header       className={cn(
          "fixed top-0 left-0 right-0 z-50 w-full h-16 transition-all duration-300 border-b border-transparent",
          scrolled && "border-border bg-background/70 backdrop-blur-sm"
        )}>{children}</header>;
}
