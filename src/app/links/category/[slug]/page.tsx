import { getLinks, getCategories } from '@/lib/api';
import { LinkGrid } from '@/components/LinkGrid';
import { CategoryFilter } from '@/components/CategoryFilter';
import { notFound } from 'next/navigation';

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

  const [links, categories] = await Promise.all([
    getLinks({ category }),
    getCategories(),
  ]);

  if (!categories.includes(category)) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{category}</h1>
        <p className="text-gray-600">{links.length} links in this category</p>
      </div>

      <CategoryFilter categories={categories} currentCategory={category} />

      <LinkGrid links={links} />
    </div>
  );
}
