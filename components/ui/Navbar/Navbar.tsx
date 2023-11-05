import Link from 'next/link';

import Logo from '@/components/icons/Logo';

import s from './Navbar.module.css';
import NavMenu from './NavMenu';
import UserSessionButton from './UserSessionButton';
import { getSession } from '@/app/supabase-server';
import MobileMeni from './MobileMenu';
import MobileMenu from './MobileMenu';

export default async function Navbar() {
  const session = await getSession();
  const user = session?.user;

  return (
    <nav className={s.root}>
      <a href="#skip" className="sr-only focus:not-sr-only">
        Skip to content
      </a>
      <div className="max-w-6xl px-4 py-4 lg:px-6 lg:py-6 mx-auto">
        <div className="relative flex flex-row justify-between align-center">
          <div className="flex">
            <Link href="/" className={s.logo} aria-label="Logo">
              <Logo />
            </Link>
            <div className="hidden lg:block">
              <NavMenu user={user} />
            </div>
          </div>
          <div className="flex justify-end flex-1 space-x-2 lg:space-x-8">
            <div className="hidden lg:block">
              <UserSessionButton user={user} />
            </div>
            <div className="lg:hidden">
              <MobileMenu />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
