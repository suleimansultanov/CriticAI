"use client";

import { useState, useCallback, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { UploadZone } from "@/components/upload-zone";
import { AuditResults } from "@/components/audit-results";
import { Paywall } from "@/components/paywall";
import { HowItWorks } from "@/components/how-it-works";
import { Pricing } from "@/components/pricing";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Loader2, RotateCcw } from "lucide-react";
import { UploadLoader } from "@/components/upload-loader";
import { MOCK_RESULT } from "@/lib/mock-result";
import type { AppState, AuditResult } from "@/types";

function HomeContent() {
  const searchParams = useSearchParams();
  const [appState, setAppState] = useState<AppState>("idle");
  const [result, setResult] = useState<AuditResult | null>(null);
  const [imageData, setImageData] = useState<{
    base64: string;
    mediaType: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [auditId] = useState(() =>
    Math.random().toString(36).substring(2) + Date.now().toString(36)
  );

  // After Stripe redirect: run the real AI analysis
  useEffect(() => {
    if (searchParams.get("paid") === "true" && imageData && appState !== "revealed") {
      const runAnalysis = async () => {
        setAppState("processing");
        try {
          const res = await fetch("/api/analyze", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              imageBase64: imageData.base64,
              mediaType: imageData.mediaType,
            }),
          });

          if (!res.ok) throw new Error("Analysis failed");

          const data: AuditResult = await res.json();
          setResult(data);
          setAppState("revealed");
        } catch {
          setError("Analysis failed. Please try again.");
          setAppState("idle");
        }
      };
      runAnalysis();
    }
  }, [searchParams, imageData, appState]);

  // Upload: just store the image locally, show mock placeholder
  const handleFileSelected = useCallback(async (file: File) => {
    setAppState("uploading");
    setError(null);

    try {
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const dataUrl = reader.result as string;
          resolve(dataUrl.split(",")[1]);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const mediaType = file.type;
      setImageData({ base64, mediaType });

      // Show scanning animation for 3 seconds
      setAppState("scanning");
      await new Promise((r) => setTimeout(r, 3000));

      // Then show mock blurred results
      setResult(MOCK_RESULT);
      setAppState("blurred");
    } catch {
      setError("Failed to read file. Please try again.");
      setAppState("idle");
    }
  }, []);

  const handleReset = () => {
    setAppState("idle");
    setResult(null);
    setImageData(null);
    setError(null);
  };

  return (
    <>
      <Navbar />

      <main className="flex-1">
        <Hero />

        {(appState === "idle" || appState === "uploading") && (
          <UploadZone
            onFileSelected={handleFileSelected}
            isProcessing={appState === "uploading"}
          />
        )}

        {appState === "scanning" && <UploadLoader />}

        {appState === "processing" && (
          <div className="flex flex-col items-center gap-4 py-16">
            <Loader2 className="h-10 w-10 animate-spin text-orange-500" />
            <p className="text-sm font-medium text-muted-foreground">
              Payment confirmed — generating your full audit...
            </p>
          </div>
        )}

        {error && (
          <p className="mt-4 text-center text-sm text-destructive">{error}</p>
        )}

        {result && (appState === "blurred" || appState === "revealed") && (
          <div className="mt-12 space-y-8">
            <AuditResults result={result} blurred={appState === "blurred"} />

            {appState === "blurred" && <Paywall auditId={auditId} />}

            <div className="flex justify-center pb-12">
              <Button variant="ghost" onClick={handleReset}>
                <RotateCcw className="mr-2 h-4 w-4" />
                Analyze another page
              </Button>
            </div>
          </div>
        )}
        <HowItWorks />
        <Pricing />
      </main>

      <Footer />
    </>
  );
}

export default function Home() {
  return (
    <Suspense>
      <HomeContent />
    </Suspense>
  );
}
