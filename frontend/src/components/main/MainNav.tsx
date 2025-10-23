import Link from 'next/link';
import { usePathname } from 'next/navigation';

const mainNav = [
  { href: '/mentors', name: '멘토 찾기' },
  { href: '/schedule', name: '멘토링 일정' },
  { href: '/articles', name: '아티클' },
];

export default function MainNav() {
  const pathname = usePathname();

  return (
    <nav className="hidden lg:block">
      <ul className="flex space-x-8">
        {mainNav.map(item => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          
          return (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`relative text-sm font-medium transition-colors duration-200 ${
                  isActive 
                    ? 'text-[var(--primary)]' 
                    : 'text-[var(--text-sub)] hover:text-[var(--text)]'
                }`}
              >
                {item.name}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[var(--primary)] rounded-full" />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
