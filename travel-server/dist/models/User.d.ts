export interface IUser {
    id: number;
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'editor' | 'viewer';
    avatar?: string;
    createdAt: Date;
}
export declare class User implements IUser {
    id: number;
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'editor' | 'viewer';
    avatar?: string;
    createdAt: Date;
}
//# sourceMappingURL=User.d.ts.map