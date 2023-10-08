import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/types_db';
import { cookies } from 'next/headers';
import { getSession, getSubscription } from './supabase-server';
import { redirect } from 'next/navigation';

export default async function Dashboard() {
  const [session, subscription] = await Promise.all([
    getSession(),
    getSubscription()
  ]);

  if (!session || !subscription) {
    redirect('/profile');
  }

  const supabase = createServerComponentClient<Database>({ cookies });
  const { data, error } = await supabase
    .from('subscriptions')
    .select('users ( name, surename )');

  console.log(data, error);

  return <div>Dashboard</div>;
}
