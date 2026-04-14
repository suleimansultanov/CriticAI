"use client";

import { Flame } from "lucide-react";

export function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <Flame className="h-5 w-5 text-orange-500" />
          <span className="text-lg font-bold tracking-tight">
            Conversion Critic
          </span>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <a href="#how-it-works" className="hover:text-foreground transition">
            How It Works
          </a>
          <a href="#pricing" className="hover:text-foreground transition">
            Pricing
          </a>
        </div>
      </div>
    </nav>
  );
}
