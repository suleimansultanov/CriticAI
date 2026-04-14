"use client";

import { Flame, Zap, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-12">
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-orange-500/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-4xl px-6 text-center">
        <Badge
          variant="secondary"
          className="mb-6 border-orange-500/20 bg-orange-500/10 text-orange-400"
        >
          <Flame className="mr-1 h-3 w-3" />
          AI-Powered Conversion Audits
        </Badge>

        <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
          Get a{" "}
          <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
            brutal conversion audit
          </span>{" "}
          of your landing page in 60 seconds.
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground">
          Upload a screenshot. Our AI rips apart your landing page&apos;s visual
          hierarchy, value proposition, trust signals, and CTAs — then tells you
          exactly how to fix it.
        </p>

        <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-orange-400" />
            <span>60-second analysis</span>
          </div>
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4 text-orange-400" />
            <span>Vision AI powered</span>
          </div>
          <div className="flex items-center gap-2">
            <Flame className="h-4 w-4 text-orange-400" />
            <span>Brutally honest</span>
          </div>
        </div>
      </div>
    </section>
  );
}
