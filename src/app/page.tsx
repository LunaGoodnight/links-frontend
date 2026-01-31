import Link from 'next/link';
import { LinkCard } from '@/components/LinkCard';
import { getLinks } from '@/lib/api';
import type { Link as LinkType } from '@/types/link';

const FEATURED_CATEGORIES = ['News', 'Streaming', 'Shopping', 'Funny', 'Music'];
const LINKS_PER_CATEGORY = 6;

function generateMockLinks(category: string, count: number): LinkType[] {
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

export default async function Home() {
  const categoryLinks = await Promise.all(
    FEATURED_CATEGORIES.map(async (category) => {
      try {
        const links = await getLinks({ category });
        return {
          category,
          links: links.slice(0, LINKS_PER_CATEGORY),
        };
      } catch {
        // Fallback to mock data when API is unavailable (for local development)
        return {
          category,
          links: generateMockLinks(category, LINKS_PER_CATEGORY),
        };
      }
    })
  );

  return (
    <div className="space-y-12">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome</h1>
        <p className="text-gray-600 mb-4">Recommended links for you</p>
      </div>

      {categoryLinks.map(({ category, links }) => (
        links.length > 0 && (
          <section key={category}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">{category}</h2>
              <Link
                href={`/links?category=${encodeURIComponent(category)}`}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {links.map((link) => (
                <LinkCard key={link.id} link={link} />
              ))}
            </div>
          </section>
        )
      ))}
    </div>
  );
}
