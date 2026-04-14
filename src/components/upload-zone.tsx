"use client";

import { useCallback, useState } from "react";
import { Upload, ImageIcon, Loader2, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadZoneProps {
  onFileSelected: (file: File) => void;
  isProcessing: boolean;
}

export function UploadZone({ onFileSelected, isProcessing }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) return;
      if (file.size > 10 * 1024 * 1024) {
        alert("File must be under 10MB");
        return;
      }
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target?.result as string);
      reader.readAsDataURL(file);
      onFileSelected(file);
    },
    [onFileSelected]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const clearPreview = () => {
    setPreview(null);
    setFileName(null);
  };

  return (
    <div className="mx-auto max-w-2xl px-6">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={cn(
          "relative flex min-h-[260px] flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 transition-all duration-200",
          isDragging
            ? "border-orange-500 bg-orange-500/5"
            : "border-border hover:border-orange-500/50 hover:bg-muted/50",
          isProcessing && "pointer-events-none opacity-60"
        )}
      >
        {isProcessing ? (
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-10 w-10 animate-spin text-orange-500" />
            <p className="text-sm font-medium text-muted-foreground">
              Roasting your landing page...
            </p>
          </div>
        ) : preview ? (
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={preview}
                alt="Preview"
                className="max-h-[160px] rounded-lg border shadow-sm"
              />
              <button
                onClick={clearPreview}
                className="absolute -top-2 -right-2 rounded-full bg-destructive p-1 text-destructive-foreground shadow-sm"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
            <p className="text-sm text-muted-foreground">{fileName}</p>
          </div>
        ) : (
          <>
            <div className="mb-4 rounded-full bg-muted p-4">
              <Upload className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="mb-1 text-sm font-medium">
              Drop your landing page screenshot here
            </p>
            <p className="mb-4 text-xs text-muted-foreground">
              PNG or JPG, up to 10MB
            </p>
            <label className="cursor-pointer">
              <span className={cn(
                "inline-flex items-center justify-center rounded-lg border border-transparent bg-secondary text-secondary-foreground text-sm font-medium h-7 gap-1 px-2.5 hover:bg-secondary/80 transition-colors"
              )}>
                <ImageIcon className="mr-2 h-4 w-4" />
                Choose File
              </span>
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFile(file);
                }}
              />
            </label>
          </>
        )}
      </div>
    </div>
  );
}
