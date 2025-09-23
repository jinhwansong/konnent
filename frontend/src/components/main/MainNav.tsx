import Link from 'next/link';

const mainNav = [
  { href: '/mentors', name: '멘토 찾기' },
  { href: '/schedule', name: '멘토링 일정' },
  { href: '/articles', name: '아티클' },
];

export default function MainNav() {
  return (
    <nav className="hidden lg:block">
      <ul className="flex gap-8">
        {mainNav.map(item => (
          <li key={item.name}>
            <Link
              href={item.href}
              className="text-sm font-medium text-[var(--text-sub)] hover:text-[var(--primary)]"
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
