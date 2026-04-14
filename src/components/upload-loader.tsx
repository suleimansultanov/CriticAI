"use client";

import { useEffect, useState } from "react";
import { Scan } from "lucide-react";

const stages = [
  "Scanning visual hierarchy...",
  "Analyzing value proposition...",
  "Checking trust signals...",
  "Evaluating CTA clarity...",
  "Generating your audit...",
];

export function UploadLoader() {
  const [progress, setProgress] = useState(0);
  const [stageIndex, setStageIndex] = useState(0);

  useEffect(() => {
    const duration = 3000;
    const interval = 30;
    const step = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step;
        return next >= 100 ? 100 : next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const index = Math.min(
      Math.floor((progress / 100) * stages.length),
      stages.length - 1
    );
    setStageIndex(index);
  }, [progress]);

  return (
    <div className="mx-auto max-w-md px-6 py-16">
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          <div className="rounded-full bg-orange-500/10 p-5">
            <Scan className="h-8 w-8 text-orange-500 animate-pulse" />
          </div>
        </div>

        <div className="w-full space-y-3">
          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-gradient-to-r from-orange-400 to-red-500 transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{stages[stageIndex]}</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
