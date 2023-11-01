'use client';

import cn from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import s from './Navbar.module.css';
import { User } from '@supabase/supabase-js';

async function NavMenu({ user }: { user?: User }) {
  const currentRoute = usePathname();

  if (!user) {
    return null;
  }

  return (
    <nav className="ml-6 space-x-2 block">
      <Link href="/" className={cn(s.link, currentRoute === '/' && s.current)}>
        Dashboard
      </Link>
      <Link
        href="/profile"
        className={cn(s.link, currentRoute === '/profile' && s.current)}
      >
        Profil
      </Link>
      <Link
        href="/support"
        className={cn(s.link, currentRoute === '/support' && s.current)}
      >
        Členské
      </Link>
    </nav>
  );
}

export default NavMenu;
