// src/types/index.d.ts

declare module "@/types" {
    export interface ScriptRequest {
      idea: string;
      niche: string;
      duration: number;
    }
  
    export interface ScriptLine {
      text: string;
      pause: number;
    }
  
    export interface ApiResponse {
      lines: ScriptLine[];
    }
  }