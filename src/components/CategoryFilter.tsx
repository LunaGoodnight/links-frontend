'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Category } from '@/types/link';

interface CategoryFilterProps {
  categories: Category[];
  currentCategoryId?: number;
  variant?: 'horizontal' | 'sidebar';
}

// Shared between both variants so light and dark stay in sync
const ACTIVE = 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400';
const FOCUS =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ' +
  'dark:focus-visible:ring-blue-400 focus-visible:ring-offset-2 ' +
  'focus-visible:ring-offset-gray-50 dark:focus-visible:ring-offset-gray-950';

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
    const sidebarIdle =
      'text-gray-700 hover:bg-gray-100 hover:text-gray-900 ' +
      'dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100';
    const sidebarBase = `w-full text-left px-3 py-2 rounded-lg text-sm font-medium
      cursor-pointer transition-colors ${FOCUS}`;

    return (
      <nav className="space-y-1">
        <h3 className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
          Categories
        </h3>
        <button
          onClick={() => handleCategoryChange(null)}
          className={`${sidebarBase} ${!currentCategoryId ? ACTIVE : sidebarIdle}`}
        >
          All Links
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryChange(category.id)}
            className={`${sidebarBase} ${
              currentCategoryId === category.id ? ACTIVE : sidebarIdle
            }`}
          >
            {category.name}
          </button>
        ))}
      </nav>
    );
  }

  const pillIdle =
    'bg-gray-100 text-gray-700 hover:bg-gray-200 ' +
    'dark:bg-gray-800 dark:text-gray-300 dark:inset-ring dark:inset-ring-white/10 ' +
    'dark:hover:bg-gray-700 dark:hover:text-gray-100 dark:hover:inset-ring-white/20';
  const pillBase = `px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-colors ${FOCUS}`;

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => handleCategoryChange(null)}
        className={`${pillBase} ${!currentCategoryId ? ACTIVE : pillIdle}`}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => handleCategoryChange(category.id)}
          className={`${pillBase} ${
            currentCategoryId === category.id ? ACTIVE : pillIdle
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}
