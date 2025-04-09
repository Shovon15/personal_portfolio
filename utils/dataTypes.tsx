export interface ICategory {
  index: number;
  _id: string;
  name: string;
  precedence: string;
  value: string;
  isEnabled: boolean;
}

export interface ICategoryFromDB extends ICategory {
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface ICv {
  index: number;
  _id: string;
  link: string;
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

export interface IContact {
  index: number;
  _id: string;
  name: string;
  email: string;
  details: string;
}
