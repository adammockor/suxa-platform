import {
  getSession,
  getUserDetails,
  getUserRoles
} from './../../supabase-server';
import { redirect } from 'next/navigation';
import { getMembers } from '@/utils/supabase-admin';

export default async function Dashboard() {
  const [session, userRoles, members] = await Promise.all([
    getSession(),
    getUserRoles(),
    getMembers()
  ]);

  if (!session) {
    redirect('/signin');
  }

  if (!userRoles?.includes('admin')) {
    redirect('/');
  }

  console.log(members);

  return <>admin dashboard</>;
}
