import { redirect } from 'next/navigation';
import { getSession } from './supabase-server';
import { User } from '@supabase/supabase-js';

export async function isUserLogged() {
  const session = await getSession();

  if (!session) {
    return redirect('/signin');
  }

  return { user: session.user, session };
}

export async function hasUserRegistrationComplete(user: User) {
  console.log('user: ', user);
}
