export interface Option{
    id: number;
    value: string;
}

export interface Suggestion extends Option{
    highlightText: string;
}