

export interface ICategory {
    index: number;
    _id: string;
    name: string;
    value: string;
    isEnabled: boolean;
}

export interface IProject {
    _id: string;
    title: string;
    slug: string;
    name: string;
    link: string;
    images: string[];
    category: string[];
    description: string;
    isEnabled: boolean;
}
