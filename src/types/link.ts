export interface Link {
  id: number;
  title: string;
  url: string;
  description?: string;
  category?: string;
  tags: string[];
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
  order: number;
}
