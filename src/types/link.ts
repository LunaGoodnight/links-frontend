export interface Link {
  id: number;
  title: string;
  url: string;
  description?: string;
  categoryId?: number;
  categoryName?: string;
  tags: string[];
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
  order: number;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}
