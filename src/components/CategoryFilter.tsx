'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Category } from '@/types/link';

interface CategoryFilterProps {
  categories: Category[];
  currentCategoryId?: number;
  variant?: 'horizontal' | 'sidebar';
}

export function CategoryFilter({ categories, currentCategoryId, variant = 'horizontal' }: CategoryFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCategoryChange = (categoryId: number | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (categoryId) {
      params.set('categoryId', categoryId.toString());
    } else {
      params.delete('categoryId');
    }
    router.push(`/links?${params.toString()}`);
  };

  if (variant === 'sidebar') {
    return (
      <nav className="space-y-1">
        <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Categories
        </h3>
        <button
          onClick={() => handleCategoryChange(null)}
          className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            !currentCategoryId
              ? 'bg-blue-600 text-white'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          All Links
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryChange(category.id)}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              currentCategoryId === category.id
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            {category.name}
          </button>
        ))}
      </nav>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => handleCategoryChange(null)}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          !currentCategoryId
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => handleCategoryChange(category.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            currentCategoryId === category.id
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}
