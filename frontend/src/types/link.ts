export interface Link {
    id: number;
    shortCode: string;
    originalUrl: string;
    clickCount: number;
    isDisabled: boolean;
    createdAt: string;
    lastAccessedAt: string | null;
    isIOS: boolean;
    isAndroid: boolean;
}