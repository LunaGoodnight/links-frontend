import Link from 'next/link';
import { getLinks } from '@/lib/api';
import type { Link as LinkType } from '@/types/link';

const FEATURED_CATEGORIES = ['News', 'Streaming', 'Shopping', 'Funny', 'Music'];
const LINKS_PER_CATEGORY = 12;

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
    <div className="space-y-12 flex flex-wrap gap-14">

      {categoryLinks.map(({ category, links }) => (
        links.length > 0 && (
          <section key={category}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-blue-500">{category}</h2>
            </div>
            <ul className="flex flex-col gap-3 mt-4">
              {links.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 font-medium hover:text-blue-600 hover:underline truncate block"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )
      ))}
    </div>
  );
}
