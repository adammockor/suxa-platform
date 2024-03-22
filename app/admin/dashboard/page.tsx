import { getSession, getUserRoles } from './../../supabase-server';
import { redirect } from 'next/navigation';
import { getMembers } from '@/utils/supabase-admin';

import { getUsers } from './getUsers';
import { UsersTable } from './UsersTable';

export default async function Dashboard() {
  const [session, userRoles, members] = await Promise.all([
    getSession(),
    getUserRoles(),
    getMembers()
  ]);

  const users = await getUsers();

  if (!session) {
    redirect('/signin');
  }

  if (!userRoles?.includes('admin')) {
    redirect('/');
  }

  return (
    <section className="mb-3">
      <div className="max-w-6xl px-4 py-8 mx-auto sm:px-6 sm:pt-24 lg:px-8">
        <h1 className="text-4xl lg:text-6xl font-extrabold text-white text-center">
          Zoznam členov
        </h1>
        <UsersTable data={users} />
      </div>
    </section>
  );
}
