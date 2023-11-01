import Link from 'next/link';

import Logo from '@/components/icons/Logo';

import s from './Navbar.module.css';
import NavMenu from './NavMenu';
import UserSessionButton from './UserSessionButton';
import { getSession } from '@/app/supabase-server';

export default async function Navbar() {
  const session = await getSession();
  const user = session?.user;

  return (
    <nav className={s.root}>
      <a href="#skip" className="sr-only focus:not-sr-only">
        Skip to content
      </a>
      <div className="max-w-6xl px-6 mx-auto">
        <div className="relative flex flex-row justify-between py-4 align-center md:py-6">
          <div className="flex items-center">
            <Link href="/" className={s.logo} aria-label="Logo">
              <Logo />
            </Link>
            <NavMenu user={user} />
          </div>
          <div className="flex justify-end flex-1 space-x-8">
            <UserSessionButton user={user} />
          </div>
        </div>
      </div>
    </nav>
  );
}
