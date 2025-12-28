export interface IPage {
    id: number;
    image: string;
    topTitle: string;
    heading: string;
    status: 'published' | 'draft';
    createdAt: Date;
}
export declare class Page implements IPage {
    id: number;
    image: string;
    topTitle: string;
    heading: string;
    status: 'published' | 'draft';
    createdAt: Date;
}
//# sourceMappingURL=Page.d.ts.map