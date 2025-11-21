export interface GroundingChunk {
  web?: {
    uri?: string;
    title?: string;
  };
}

export interface VulnerabilityReport {
  rawText: string;
  sources: GroundingChunk[];
  timestamp: number;
  target: string;
}

export enum AppState {
  IDLE,
  SEARCHING,
  ANALYZING,
  COMPLETE,
  ERROR
}