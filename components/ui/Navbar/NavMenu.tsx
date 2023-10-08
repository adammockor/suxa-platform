'use client';

import cn from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import s from './Navbar.module.css';

function NavMenu() {
  const currentRoute = usePathname();

  return (
    <nav className="hidden ml-6 space-x-2 lg:block">
      <Link href="/" className={cn(s.link, currentRoute === '/' && s.current)}>
        Dashboard
      </Link>
      <Link
        href="/profile"
        className={cn(s.link, currentRoute === '/profile' && s.current)}
      >
        Profil
      </Link>
    </nav>
  );
}

export default NavMenu;
