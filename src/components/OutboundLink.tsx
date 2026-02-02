'use client';

import { trackOutboundClick } from '@/lib/analytics';
import { ReactNode } from 'react';

interface OutboundLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  linkText?: string;
}

export function OutboundLink({ href, children, className, linkText }: OutboundLinkProps) {
  const text = linkText || (typeof children === 'string' ? children : '');

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => trackOutboundClick(text, href)}
    >
      {children}
    </a>
  );
}
