"use client";

import { Check, Flame } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  "Full AI-powered conversion audit",
  "Visual hierarchy analysis",
  "Value proposition review",
  "Trust signals assessment",
  "CTA clarity breakdown",
  "Prioritized action plan",
];

export function Pricing() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section id="pricing" className="py-20">
      <div className="mx-auto max-w-md px-6">
        <h2 className="mb-4 text-center text-3xl font-bold">Simple Pricing</h2>
        <p className="mb-12 text-center text-muted-foreground">
          One audit, one price. No subscriptions, no hidden fees.
        </p>

        <Card className="relative overflow-hidden border-orange-500/30">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-orange-400 to-red-500" />
          <CardContent className="pt-8 pb-8">
            <div className="mb-6 text-center">
              <div className="mb-2 flex items-center justify-center gap-2">
                <Flame className="h-5 w-5 text-orange-500" />
                <span className="text-sm font-semibold uppercase tracking-wider text-orange-400">
                  Conversion Audit
                </span>
              </div>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-5xl font-bold">$9</span>
                <span className="text-muted-foreground">/ audit</span>
              </div>
            </div>

            <ul className="mb-8 space-y-3">
              {features.map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-sm">
                  <Check className="h-4 w-4 shrink-0 text-orange-400" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={scrollToTop}
              className="w-full rounded-lg bg-orange-500 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
            >
              Upload & Get Your Audit
            </button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
