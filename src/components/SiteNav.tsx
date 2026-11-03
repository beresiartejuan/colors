import React from 'react';
import { Link, useRoute } from 'wouter';

const links = [
  { href: '/', label: 'Paleta' },
  { href: '/templates', label: 'Plantillas' },
];

export const BrandMark: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
  <span
    className={`${className} rounded-lg bg-gradient-to-br from-custom-primary to-custom-secondary grid place-items-center shadow-sm`}
    aria-hidden="true"
  >
    <span className="flex gap-0.5">
      <span className="w-1.5 h-1.5 rounded-full bg-custom-gradient-contrast" />
      <span className="w-1.5 h-1.5 rounded-full bg-custom-gradient-contrast/60" />
    </span>
  </span>
);

const NavLink: React.FC<{ href: string; label: string }> = ({ href, label }) => {
  const [active] = useRoute(href === '/' ? '/' : `${href}/*?`);
  return (
    <Link
      href={href}
      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
        active
          ? 'bg-custom-primary/10 text-custom-primary'
          : 'text-custom-text/70 hover:text-custom-text hover:bg-custom-text/5'
      }`}
    >
      {label}
    </Link>
  );
};

const SiteNav: React.FC = () => (
  <header className="sticky top-0 z-40 border-b border-custom-border/60 bg-custom-bg/75 backdrop-blur-md">
    <div className="container mx-auto flex h-14 items-center justify-between px-4">
      <Link href="/" className="flex items-center gap-2.5 font-semibold tracking-tight text-custom-text">
        <BrandMark />
        Colors
      </Link>
      <nav className="flex items-center gap-1" aria-label="Principal">
        {links.map((l) => (
          <NavLink key={l.href} {...l} />
        ))}
      </nav>
    </div>
  </header>
);

export default SiteNav;
