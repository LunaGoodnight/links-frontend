import { Suspense } from 'react';
import { getLinks, getCategories } from '@/lib/api';
import { LinkGrid } from '@/components/LinkGrid';
import { CategoryFilter } from '@/components/CategoryFilter';
import { SearchBar } from '@/components/SearchBar';
import type { Link, Category } from '@/types/link';

const MOCK_CATEGORIES: Category[] = [
  { id: 1, name: 'News', order: 0, createdAt: '', updatedAt: '' },
  { id: 2, name: 'Streaming', order: 1, createdAt: '', updatedAt: '' },
  { id: 3, name: 'Shopping', order: 2, createdAt: '', updatedAt: '' },
  { id: 4, name: 'Tech', order: 3, createdAt: '', updatedAt: '' },
  { id: 5, name: 'Gaming', order: 4, createdAt: '', updatedAt: '' },
];

function generateMockLinks(count: number): Link[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    title: `Sample Link ${i + 1}`,
    url: 'https://example.com',
    description: 'This is a sample link for preview purposes.',
    categoryId: MOCK_CATEGORIES[i % MOCK_CATEGORIES.length].id,
    categoryName: MOCK_CATEGORIES[i % MOCK_CATEGORIES.length].name,
    tags: ['sample', 'preview'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    order: i + 1,
  }));
}

interface LinksPageProps {
  searchParams: Promise<{
    categoryId?: string;
    tag?: string;
    search?: string;
  }>;
}

export default async function LinksPage({ searchParams }: LinksPageProps) {
  const params = await searchParams;
  const categoryId = params.categoryId ? parseInt(params.categoryId, 10) : undefined;

  let links: Link[];
  let categories: Category[];

  try {
    [links, categories] = await Promise.all([
      getLinks({
        categoryId,
        tag: params.tag,
        search: params.search,
      }),
      getCategories(),
    ]);
  } catch {
    // Fallback to mock data when API is unavailable (for local development)
    links = generateMockLinks(50);
    categories = MOCK_CATEGORIES;
  }

  return (
    <div className="flex flex-col lg:flex-row lg:h-[calc(100vh-72px)]">
      {/* Desktop Sidebar */}
      {categories.length > 0 && (
        <aside className="hidden lg:flex lg:flex-col w-64 flex-shrink-0 lg:overflow-y-auto custom-scrollbar p-6">
          <Suspense fallback={<div className="h-64 w-full bg-gray-200 animate-pulse rounded-lg" />}>
            <CategoryFilter categories={categories} currentCategoryId={categoryId} variant="sidebar" />
          </Suspense>
        </aside>
      )}

      {/* Main Content */}
      <div className="flex-1 min-w-0 space-y-6 lg:overflow-y-auto custom-scrollbar p-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <Suspense fallback={<div className="h-10 w-64 bg-gray-200 animate-pulse rounded-lg" />}>
            <SearchBar initialSearch={params.search} />
          </Suspense>
        </div>

        {/* Mobile Category Filter */}
        {categories.length > 0 && (
          <div className="lg:hidden">
            <Suspense fallback={<div className="h-10 w-full bg-gray-200 animate-pulse rounded-lg" />}>
              <CategoryFilter categories={categories} currentCategoryId={categoryId} />
            </Suspense>
          </div>
        )}

        <LinkGrid links={links} />
      </div>
    </div>
  );
}
