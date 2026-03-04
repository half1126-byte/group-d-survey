export type QuestionType = 'nps' | 'rating' | 'select' | 'multiselect' | 'text';

export interface Question {
    id: number;
    type: QuestionType;
    question: string;
    description?: string;
    category?: string;    // e.g. "1. 핵심 지표 (NPS)"
    subCategory?: string; // e.g. "블로그 - 임상 포스팅"
    options?: string[];   // For select/multiselect
    maxSelections?: number; // For multiselect limit
    conditionalTriggerOptions?: string[]; // Options that trigger the text area
    conditionalPlaceholder?: string;      // Placeholder for the conditional text area
    conditionalRatingThreshold?: number;  // Rating <= this value triggers the text area
    logic?: {
        showIf: (answers: Record<number, any>) => boolean;
    };
    maxRating?: number;   // For rating/nps
    allowOther?: boolean; // For multiselect 'Other' toggle
}

export interface Answer {
    questionId: number;
    value: string | number | string[];
    otherValue?: string; // If 'Other' text is provided
}

export interface UserInfo {
    hospitalName: string;
    role: string;
    name: string;
}
