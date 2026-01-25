import { Link } from '@/types/link';
import { LinkCard } from './LinkCard';

interface LinkGridProps {
  links: Link[];
}

export function LinkGrid({ links }: LinkGridProps) {
  if (links.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No links found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {links.map((link) => (
        <LinkCard key={link.id} link={link} />
      ))}
    </div>
  );
}
