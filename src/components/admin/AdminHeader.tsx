'use client';
import { usePathname } from 'next/navigation';

export default function AdminHeader() {
  const pathname = usePathname();
  if (pathname === '/admin/login') return null;

  return (
    <header className="bg-white shadow-sm h-16 flex items-center justify-between px-6 border-b border-gray-200">
      <div className="flex items-center">
        <span className="text-sm text-muted">Demo Mode Active</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 rounded-full bg-slate flex items-center justify-center text-white text-sm font-medium">
          AD
        </div>
      </div>
    </header>
  );
}
