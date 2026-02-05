import type {Link as LinkType, Category} from '@/types/link';

export const FEATURED_CATEGORIES: Category[] = [
    { id: 17, name: 'Miou', order: 0, createdAt: '', updatedAt: '' },
    { id: 19, name: 'News', order: 1, createdAt: '', updatedAt: '' },
    { id: 26, name: 'Streaming', order: 2, createdAt: '', updatedAt: '' },
    { id: 24, name: 'Shopping', order: 3, createdAt: '', updatedAt: '' },
    { id: 12, name: 'Funny', order: 4, createdAt: '', updatedAt: '' },
    { id: 18, name: 'Music', order: 5, createdAt: '', updatedAt: '' },
];
export const LINKS_PER_CATEGORY = 12;

export function generateMockLinks(category: Category, count: number): LinkType[] {
    return Array.from({length: count}, (_, i) => ({
        id: i + 1,
        title: `${category.name} Link ${i + 1}`,
        url: 'https://example.com',
        description: `This is a sample ${category.name.toLowerCase()} link for preview purposes.`,
        categoryId: category.id,
        categoryName: category.name,
        tags: ['sample', category.name.toLowerCase()],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        order: i + 1,
    }));
}
