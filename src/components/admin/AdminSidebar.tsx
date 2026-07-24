'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminSidebar() {
  const pathname = usePathname();
  
  const links = [
    { href: '/admin', label: 'Dashboard' },
    { href: '/admin/leads', label: 'Leads' },
    { href: '/admin/portfolio', label: 'Portfolio' },
    { href: '/admin/content', label: 'Content' },
    { href: '/admin/media', label: 'Media Library' },
    { href: '/admin/trust-center', label: 'Trust Center' },
    { href: '/admin/site-settings', label: 'Settings' },
  ];

  if (pathname === '/admin/login') return null;

  return (
    <div className="w-64 bg-midnight text-white flex flex-col">
      <div className="p-6">
        <h2 className="text-2xl font-bold font-[family-name:var(--font-space-grotesk)] text-bronze">ARKAVENA</h2>
        <p className="text-xs text-gray-400 mt-1">Admin Portal</p>
      </div>
      <nav className="flex-1 px-4 space-y-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`block px-4 py-2 rounded-md transition-colors ${
              pathname === link.href ? 'bg-slate text-white' : 'text-gray-300 hover:bg-slate/50 hover:text-white'
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-slate">
        <button className="w-full text-left px-4 py-2 text-gray-300 hover:text-white transition-colors">
          Logout
        </button>
      </div>
    </div>
  );
}
