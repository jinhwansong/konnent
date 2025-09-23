import LogoLink from './LogoLink';
import MainNav from './MainNav';
import NotificationMenu from './NotificationMenu';
import UserMenu from './UserMenu';

export default function Header() {
  return (
    <header className="border-b border-[var(--border-color)]">
      <div className="mx-auto flex w-full items-center justify-between px-5 py-3 md:px-8 lg:w-[1200px] lg:px-0">
        <div className="flex items-center gap-6 lg:gap-16">
          <LogoLink />
          <MainNav />
        </div>

        <div className="flex items-center lg:gap-2">
          <ul className="hidden items-center lg:flex">
            <NotificationMenu />
            <Divider />
            <UserMenu />
          </ul>
        </div>
      </div>
    </header>
  );
}

function Divider() {
  return (
    <div className="flex h-3.5 w-px flex-shrink-0 bg-[var(--border-color)]" />
  );
}
