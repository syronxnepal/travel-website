export interface IShortTour {
    id: number;
    title: string;
    location: string;
    category: string;
    duration: string;
    price: string;
    rating: string;
    reviewCount: number;
    image: string;
    description: string;
    highlights?: string[];
    featured: boolean;
    createdAt: Date;
}
export declare class ShortTour implements IShortTour {
    id: number;
    title: string;
    location: string;
    category: string;
    duration: string;
    price: string;
    rating: string;
    reviewCount: number;
    image: string;
    description: string;
    highlights?: string[];
    featured: boolean;
    createdAt: Date;
}
//# sourceMappingURL=ShortTour.d.ts.map