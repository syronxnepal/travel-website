export interface ItineraryDay {
    day: number;
    title: string;
    description: string;
    activities?: string[];
    meals?: string[];
    accommodation?: string;
    highlights?: string[];
}
export interface TourInfo {
    icon: string;
    title: string;
    value: string;
}
export interface FAQ {
    question: string;
    answer: string;
}
export interface ITour {
    id: number;
    title: string;
    location: string;
    category: string;
    duration: string;
    price: string;
    originalPrice?: string;
    rating: string;
    reviewCount: number;
    image: string;
    images?: string[];
    description: string;
    difficulty?: string;
    groupSize?: string;
    highlights?: string[];
    included?: string[];
    excluded?: string[];
    itinerary?: ItineraryDay[];
    tourInfo?: TourInfo[];
    faqs?: FAQ[];
    featured: boolean;
    createdAt: Date;
}
export declare class Tour implements ITour {
    id: number;
    title: string;
    location: string;
    category: string;
    duration: string;
    price: string;
    originalPrice?: string;
    rating: string;
    reviewCount: number;
    image: string;
    images?: string[];
    description: string;
    difficulty?: string;
    groupSize?: string;
    highlights?: string[];
    included?: string[];
    excluded?: string[];
    itinerary?: ItineraryDay[];
    tourInfo?: TourInfo[];
    faqs?: FAQ[];
    featured: boolean;
    createdAt: Date;
}
//# sourceMappingURL=Tour.d.ts.map