import { Link } from '@/types/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5010';

export async function getLinks(params?: {
  category?: string;
  tag?: string;
  search?: string;
}): Promise<Link[]> {
  const searchParams = new URLSearchParams();
  if (params?.category) searchParams.set('category', params.category);
  if (params?.tag) searchParams.set('tag', params.tag);
  if (params?.search) searchParams.set('search', params.search);

  const queryString = searchParams.toString();
  const url = `${API_URL}/api/links${queryString ? `?${queryString}` : ''}`;

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error('Failed to fetch links');
  return res.json();
}

export async function getLink(id: number): Promise<Link> {
  const res = await fetch(`${API_URL}/api/links/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error('Failed to fetch link');
  return res.json();
}

export async function getCategories(): Promise<string[]> {
  const res = await fetch(`${API_URL}/api/categories`, { cache: "no-store" });
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
}

export async function getTags(): Promise<string[]> {
  const res = await fetch(`${API_URL}/api/categories/tags`, { cache: "no-store" });
  if (!res.ok) throw new Error('Failed to fetch tags');
  return res.json();
}
