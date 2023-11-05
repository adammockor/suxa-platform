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
      <NavMenuList />
    </nav>
  );
}

export default NavMenu;

export function NavMenuList() {
  const currentRoute = usePathname();
  return (
    <>
      {' '}
      <Link href="/" className={cn(s.link, currentRoute === '/' && s.current)}>
        Zoznam členov
      </Link>
      <Link
        className={cn(s.link)}
        href="https://suxa.slack.com/"
        target="_blank"
      >
        Slack
      </Link>
      <Link
        href="/services"
        className={cn(s.link, currentRoute === '/services' && s.current)}
      >
        Dalšie služby
      </Link>
      <Link
        href="/profile"
        className={cn(s.link, currentRoute === '/profile' && s.current)}
      >
        Môj profil
      </Link>
      <Link
        href="/member"
        className={cn(s.link, currentRoute === '/member' && s.current)}
      >
        Moje členské
      </Link>
    </>
  );
}