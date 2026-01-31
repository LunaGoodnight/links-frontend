import Link from 'next/link';
import { LinkCard } from '@/components/LinkCard';
import { getLinks } from '@/lib/api';

const FEATURED_CATEGORIES = ['News', 'Streaming', 'Shopping', 'Funny', 'Music'];
const LINKS_PER_CATEGORY = 6;

export default async function Home() {
  const categoryLinks = await Promise.all(
    FEATURED_CATEGORIES.map(async (category) => {
      const links = await getLinks({ category });
      return {
        category,
        links: links.slice(0, LINKS_PER_CATEGORY),
      };
    })
  );

  return (
    <div className="space-y-12">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome</h1>
        <p className="text-gray-600 mb-4">Recommended links for you</p>
        <Link
          href="/links"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Browse All Links
          <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
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
