// objects and such
export interface User {
    uid: string;
    email: string;
}

export interface Thing {
    id: number;
    name: string;
    description?: string;
    createdAt?: string;
    updatedAt?: string;
}
