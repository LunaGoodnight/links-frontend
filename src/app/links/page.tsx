import { Suspense } from 'react';
import { getLinks, getCategories } from '@/lib/api';
import { LinkGrid } from '@/components/LinkGrid';
import { CategoryFilter } from '@/components/CategoryFilter';
import { SearchBar } from '@/components/SearchBar';
import type { Link } from '@/types/link';

const MOCK_CATEGORIES = ['News', 'Streaming', 'Shopping', 'Funny', 'Music'];

function generateMockLinks(count: number): Link[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    title: `Sample Link ${i + 1}`,
    url: 'https://example.com',
    description: 'This is a sample link for preview purposes.',
    category: MOCK_CATEGORIES[i % MOCK_CATEGORIES.length],
    tags: ['sample', 'preview'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    order: i + 1,
  }));
}

interface LinksPageProps {
  searchParams: Promise<{
    category?: string;
    tag?: string;
    search?: string;
  }>;
}

export default async function LinksPage({ searchParams }: LinksPageProps) {
  const params = await searchParams;

  let links: Link[];
  let categories: string[];

  try {
    [links, categories] = await Promise.all([
      getLinks({
        category: params.category,
        tag: params.tag,
        search: params.search,
      }),
      getCategories(),
    ]);
  } catch {
    // Fallback to mock data when API is unavailable (for local development)
    links = generateMockLinks(12);
    categories = MOCK_CATEGORIES;
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Desktop Sidebar */}
      {categories.length > 0 && (
        <aside className="hidden lg:block w-56 flex-shrink-0">
          <div className="sticky top-6">
            <Suspense fallback={<div className="h-64 w-full bg-gray-200 animate-pulse rounded-lg" />}>
              <CategoryFilter categories={categories} currentCategory={params.category} variant="sidebar" />
            </Suspense>
          </div>
        </aside>
      )}

      {/* Main Content */}
      <div className="flex-1 min-w-0 space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <Suspense fallback={<div className="h-10 w-64 bg-gray-200 animate-pulse rounded-lg" />}>
            <SearchBar initialSearch={params.search} />
          </Suspense>
        </div>

        {/* Mobile Category Filter */}
        {categories.length > 0 && (
          <div className="lg:hidden">
            <Suspense fallback={<div className="h-10 w-full bg-gray-200 animate-pulse rounded-lg" />}>
              <CategoryFilter categories={categories} currentCategory={params.category} />
            </Suspense>
          </div>
        )}

        <LinkGrid links={links} />
      </div>
    </div>
  );
}
