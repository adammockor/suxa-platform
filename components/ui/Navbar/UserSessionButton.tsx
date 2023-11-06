'use client';

import { useSupabase } from '@/app/supabase-provider';
import { usePathname, useRouter } from 'next/navigation';

import s from './Navbar.module.css';
import Link from 'next/link';
import { User } from '@supabase/supabase-js';

export default function UserSessionButton({ user }: { user?: User }) {
  const currentRoute = usePathname();

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <div className="flex justify-end flex-1 space-x-8">{children}</div>
  );

  if (currentRoute === '/signin') {
    return (
      <Wrapper>
        <Link href="/signup" className={s.link}>
          Registrovať sa
        </Link>
      </Wrapper>
    );
  }

  if (currentRoute === '/signup') {
    return (
      <Wrapper>
        <Link href="/signin" className={s.link}>
          Prihlásiť sa
        </Link>
      </Wrapper>
    );
  }

  if (user) {
    return (
      <Wrapper>
        <SignOutButton />
      </Wrapper>
    );
  }

  return null;
}

export function SignOutButton() {
  const router = useRouter();
  const { supabase } = useSupabase();
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <button className={s.link} onClick={handleSignOut}>
      Odhlásiť sa
    </button>
  );
}
