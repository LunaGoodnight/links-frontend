import { Link } from '@/types/link';
import Image from 'next/image';

interface LinkCardProps {
  link: Link;
}

export function LinkCard({ link }: LinkCardProps) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
    >
      {link.imageUrl && (
        <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
          <Image
            src={link.imageUrl}
            alt={link.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
          {link.title}
        </h3>
        {link.description && (
          <p className="mt-2 text-gray-600 text-sm line-clamp-3">{link.description}</p>
        )}
        <div className="mt-3 flex flex-wrap gap-2">
          {link.category && (
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
              {link.category}
            </span>
          )}
          {link.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
}
