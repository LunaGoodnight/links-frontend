import {getLinks} from '@/lib/api';
import {FEATURED_CATEGORIES, generateMockLinks, LINKS_PER_CATEGORY} from '@/lib/mockData';
import {getQuote, quoteList} from '@/lib/quotes';
import Image from "next/image";
import Link from "next/link";
import {OutboundLink} from '@/components/OutboundLink';

export default async function Home() {
    const categoryLinks = await Promise.all(
        FEATURED_CATEGORIES.map(async (category) => {
            try {
                const links = await getLinks({categoryId: category.id});
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
        <div>
            <div className="mb-5 flex gap-6 items-end pb-10">
                <div className="flex flex-col gap-4">
                    <Image width={600} height={200} src="https://picsum.photos/600/200" alt="picsum"/>
                    <div>{getQuote(quoteList)}</div>
                </div>
                <Link href="/links" className="text-blue-500 font-bold">See more links</Link>
            </div>

            <div className="space-y-12 flex flex-wrap gap-14">
                {categoryLinks.map(({category, links}) => (
                    links.length > 0 && (
                        <section key={category.id}>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-2xl font-bold text-blue-500">{category.name}</h2>
                            </div>
                            <ul className="flex flex-col gap-3 mt-4">
                                {links.map((link) => (
                                    <li key={link.id}>
                                        <OutboundLink
                                            href={link.url}
                                            linkText={link.title}
                                            className="text-blue-400 font-medium hover:text-blue-600 truncate block"
                                        >
                                            {link.title}
                                        </OutboundLink>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )
                ))}
            </div>
        </div>
    );
}
