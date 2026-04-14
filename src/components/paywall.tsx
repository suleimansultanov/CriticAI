"use client";

import { useState } from "react";
import { Lock, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface PaywallProps {
  auditId: string;
}

export function Paywall({ auditId }: PaywallProps) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ auditId }),
      });
      const { url } = await res.json();
      if (url) {
        window.location.href = url;
      }
    } catch {
      alert("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-xl px-6">
      <Card className="border-orange-500/20 bg-gradient-to-br from-card to-orange-500/5">
        <CardContent className="flex flex-col items-center gap-6 pt-8 pb-8 text-center">
          <div className="rounded-full bg-orange-500/10 p-4">
            <Lock className="h-8 w-8 text-orange-400" />
          </div>

          <div>
            <h3 className="mb-2 text-xl font-bold">
              Your full audit is ready.
            </h3>
            <p className="text-sm text-muted-foreground">
              Unlock the detailed roasts, actionable fixes, and priority
              recommendations.
            </p>
          </div>

          <Button
            className="w-full bg-orange-500 hover:bg-orange-600"
            size="lg"
            onClick={handleCheckout}
            disabled={loading}
          >
            <CreditCard className="mr-2 h-4 w-4" />
            {loading ? "Redirecting..." : "Unlock Full Audit — $9"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
