// types.ts
export interface Product {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    category: string;
}

export interface CartItem extends Product {
    quantity: number;
}

export interface TrainingSchedule {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
}

// New types for the Coach Assistant
export interface AnalysisResult {
    strikeAccuracy: number;
    successfulTakedowns: number;
    avgStrikesPerMin: number;
    keyInsights: string[];
    trainingFocus: {
        title: string;
        points: string[];
    };
    trainingSchedule: TrainingSchedule;
}

export type AnalysisState = 'idle' | 'uploading' | 'analyzing' | 'success' | 'error';