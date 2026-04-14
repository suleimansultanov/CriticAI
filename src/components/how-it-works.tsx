"use client";

import { Upload, Scan, CreditCard, FileText } from "lucide-react";

const steps = [
  {
    icon: <Upload className="h-6 w-6 text-orange-400" />,
    title: "1. Upload Screenshot",
    description: "Drag & drop a screenshot of your landing page. PNG or JPG, up to 10MB.",
  },
  {
    icon: <Scan className="h-6 w-6 text-orange-400" />,
    title: "2. AI Scans Your Page",
    description: "Our AI analyzes visual hierarchy, value proposition, trust signals, and CTAs.",
  },
  {
    icon: <CreditCard className="h-6 w-6 text-orange-400" />,
    title: "3. Unlock Your Audit",
    description: "Pay a one-time $9 fee to reveal your full brutally honest audit report.",
  },
  {
    icon: <FileText className="h-6 w-6 text-orange-400" />,
    title: "4. Get Actionable Fixes",
    description: "Receive specific, prioritized recommendations to boost your conversion rate.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20">
      <div className="mx-auto max-w-4xl px-6">
        <h2 className="mb-4 text-center text-3xl font-bold">How It Works</h2>
        <p className="mb-12 text-center text-muted-foreground">
          From screenshot to actionable audit in under 60 seconds.
        </p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div
              key={step.title}
              className="flex flex-col items-center text-center"
            >
              <div className="mb-4 rounded-2xl border border-border/50 bg-muted/50 p-4">
                {step.icon}
              </div>
              <h3 className="mb-2 text-sm font-semibold">{step.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
