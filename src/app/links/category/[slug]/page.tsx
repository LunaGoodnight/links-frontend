import { getLinks, getCategories } from '@/lib/api';
import { LinkGrid } from '@/components/LinkGrid';
import { CategoryFilter } from '@/components/CategoryFilter';
import { notFound } from 'next/navigation';
import type { Link } from '@/types/link';

const MOCK_CATEGORIES = ['News', 'Streaming', 'Shopping', 'Funny', 'Music'];

function generateMockLinks(category: string, count: number): Link[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    title: `${category} Link ${i + 1}`,
    url: 'https://example.com',
    description: `This is a sample ${category.toLowerCase()} link for preview purposes.`,
    category,
    tags: ['sample', category.toLowerCase()],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    order: i + 1,
  }));
}

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = decodeURIComponent(slug);
  return {
    title: `${category} - Links`,
    description: `Browse links in the ${category} category`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = decodeURIComponent(slug);

  let links: Link[];
  let categories: string[];

  try {
    [links, categories] = await Promise.all([
      getLinks({ category }),
      getCategories(),
    ]);
  } catch {
    // Fallback to mock data when API is unavailable (for local development)
    links = generateMockLinks(category, 6);
    categories = MOCK_CATEGORIES;
  }

  if (!categories.includes(category)) {
    notFound();
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:h-[calc(100vh-120px)]">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col w-56 flex-shrink-0 lg:overflow-y-auto">
        <CategoryFilter categories={categories} currentCategory={category} variant="sidebar" />
      </aside>

      {/* Main Content */}
      <div className="flex-1 min-w-0 space-y-6 lg:overflow-y-auto">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{category}</h1>
          <p className="text-gray-600">{links.length} links in this category</p>
        </div>

        {/* Mobile Category Filter */}
        <div className="lg:hidden">
          <CategoryFilter categories={categories} currentCategory={category} />
        </div>

        <LinkGrid links={links} />
      </div>
    </div>
  );
}
