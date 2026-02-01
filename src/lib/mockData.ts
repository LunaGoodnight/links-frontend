import type {Link as LinkType} from '@/types/link';

export const FEATURED_CATEGORIES = ['Miou', 'News', 'Streaming', 'Shopping', 'Funny', 'Music'];
export const LINKS_PER_CATEGORY = 12;

export function generateMockLinks(category: string, count: number): LinkType[] {
    return Array.from({length: count}, (_, i) => ({
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
