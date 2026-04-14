"use client";

import { Flame } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border/50 py-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-6 text-center text-sm text-muted-foreground sm:flex-row sm:justify-between sm:text-left">
        <div className="flex items-center gap-2">
          <Flame className="h-4 w-4 text-orange-500" />
          <span>Conversion Critic AI</span>
        </div>
        <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
      </div>
    </footer>
  );
}
