// src/types/analysis.ts

export interface SwotEntry {
    point: string;
    evidence: string;
}

export interface SwotMatrix {
    strengths: SwotEntry[];
    weaknesses: SwotEntry[];
    opportunities: SwotEntry[];
    threats: SwotEntry[];
}
