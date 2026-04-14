"use client";

import {
  LayoutGrid,
  Target,
  ShieldCheck,
  MousePointerClick,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { AuditSection } from "@/types";

const iconMap: Record<string, React.ReactNode> = {
  "Visual Hierarchy": <LayoutGrid className="h-5 w-5 text-orange-400" />,
  "Value Proposition": <Target className="h-5 w-5 text-orange-400" />,
  "Trust Signals": <ShieldCheck className="h-5 w-5 text-orange-400" />,
  "CTA Clarity": <MousePointerClick className="h-5 w-5 text-orange-400" />,
};

interface AuditCardProps {
  section: AuditSection;
  blurred?: boolean;
}

export function AuditCard({ section, blurred }: AuditCardProps) {
  const scoreColor =
    section.score >= 7
      ? "text-green-500"
      : section.score >= 4
        ? "text-yellow-500"
        : "text-red-500";

  return (
    <Card className="relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center gap-3 pb-3">
        {iconMap[section.title] || (
          <LayoutGrid className="h-5 w-5 text-orange-400" />
        )}
        <CardTitle className="flex-1 text-base">{section.title}</CardTitle>
        <span className={`text-2xl font-bold ${scoreColor}`}>
          {section.score}/10
        </span>
      </CardHeader>
      <CardContent className={blurred ? "select-none blur-md" : ""}>
        <div className="mb-3">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-red-400">
            The Roast
          </p>
          <p className="text-sm text-muted-foreground">{section.roast}</p>
        </div>
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-green-400">
            The Fix
          </p>
          <p className="text-sm text-muted-foreground">{section.fix}</p>
        </div>
      </CardContent>
    </Card>
  );
}
