import { Suspense } from 'react';
import { getLinks, getCategories } from '@/lib/api';
import { LinkGrid } from '@/components/LinkGrid';
import { CategoryFilter } from '@/components/CategoryFilter';
import { SearchBar } from '@/components/SearchBar';

interface LinksPageProps {
  searchParams: Promise<{
    category?: string;
    tag?: string;
    search?: string;
  }>;
}

export default async function LinksPage({ searchParams }: LinksPageProps) {
  const params = await searchParams;
  const [links, categories] = await Promise.all([
    getLinks({
      category: params.category,
      tag: params.tag,
      search: params.search,
    }),
    getCategories(),
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <Suspense fallback={<div className="h-10 w-64 bg-gray-200 animate-pulse rounded-lg" />}>
          <SearchBar initialSearch={params.search} />
        </Suspense>
      </div>

      {categories.length > 0 && (
        <Suspense fallback={<div className="h-10 w-full bg-gray-200 animate-pulse rounded-lg" />}>
          <CategoryFilter categories={categories} currentCategory={params.category} />
        </Suspense>
      )}

      <LinkGrid links={links} />
    </div>
  );
}
