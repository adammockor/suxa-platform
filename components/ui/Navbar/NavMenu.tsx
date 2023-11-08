'use client';

import cn from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import s from './Navbar.module.css';

function NavMenu({ isUserMember }: { isUserMember: boolean }) {
  return (
    <nav className="ml-6 space-x-2 block">
      <NavMenuList isUserMember={isUserMember} />
    </nav>
  );
}

export default NavMenu;

export function NavMenuList({ isUserMember }: { isUserMember: boolean }) {
  const currentRoute = usePathname();
  return (
    <>
      {' '}
      <Link href="/" className={cn(s.link, currentRoute === '/' && s.current)}>
        Zoznam členov
      </Link>
      {isUserMember ? (
        <Link
          className={cn(s.link)}
          href="https://suxa.slack.com/"
          target="_blank"
        >
          Slack
        </Link>
      ) : null}
      {isUserMember ? (
        <Link
          href="/services"
          className={cn(s.link, currentRoute === '/services' && s.current)}
        >
          Dalšie služby
        </Link>
      ) : null}
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