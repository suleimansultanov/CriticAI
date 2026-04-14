export type AppState =
  | "idle"
  | "uploading"
  | "scanning"
  | "processing"
  | "blurred"
  | "revealed";

export interface AuditSection {
  title: string;
  score: number;
  roast: string;
  fix: string;
}

export interface AuditResult {
  overallScore: number;
  headline: string;
  sections: AuditSection[];
  topPriority: string;
}
