'use client';

import { Link } from '@/types/link';
import Image from 'next/image';
import { trackOutboundClick } from '@/lib/analytics';

interface LinkCardProps {
  link: Link;
}

export function LinkCard({ link }: LinkCardProps) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-white dark:bg-gray-800 rounded-lg overflow-hidden
        shadow-md hover:shadow-lg
        ring-1 ring-transparent dark:ring-white/10 dark:hover:ring-white/25
        transition duration-200
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
        dark:focus-visible:ring-blue-400 focus-visible:ring-offset-2
        focus-visible:ring-offset-gray-50 dark:focus-visible:ring-offset-gray-950"
      onClick={() => trackOutboundClick(link.title, link.url)}
    >
      <div className="relative aspect-video w-full overflow-hidden bg-gray-100 dark:bg-gray-700">
        {link.imageUrl ? (
          <Image
            src={link.imageUrl}
            alt={link.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-500 text-sm">
            no image
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 dark:text-amber-50 group-hover:text-blue-600 dark:group-hover:text-amber-200 transition-colors line-clamp-2">
          {link.title}
        </h3>
        {link.description && (
          <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm line-clamp-3">{link.description}</p>
        )}
        <div className="mt-3 flex flex-wrap gap-2">
          {link.categoryName && (
            <span
              className="px-2 py-1 text-xs rounded-full transition-colors
                bg-blue-100 text-blue-800 group-hover:bg-blue-200
                dark:bg-blue-500/15 dark:text-blue-300
                dark:inset-ring dark:inset-ring-blue-400/25
                dark:group-hover:bg-blue-500/25 dark:group-hover:text-blue-200"
            >
              {link.categoryName}
            </span>
          )}
          {link.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs rounded-full transition-colors
                bg-gray-100 text-gray-600 group-hover:bg-gray-200 group-hover:text-gray-800
                dark:bg-gray-700/60 dark:text-gray-300
                dark:inset-ring dark:inset-ring-white/10
                dark:group-hover:bg-gray-600/70 dark:group-hover:text-gray-100"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
}
