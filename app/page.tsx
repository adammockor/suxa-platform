import { getSession, getSubscription } from './supabase-server';
import { redirect } from 'next/navigation';
import Card from './profile/Card';
import { getMembers } from '@/utils/supabase-admin';

export default async function Dashboard() {
  const [session, subscription, members] = await Promise.all([
    getSession(),
    getSubscription(),
    getMembers()
  ]);

  if (!session || !subscription) {
    redirect('/profile');
  }

  return (
    <section className="mb-3">
      <div className="max-w-6xl px-4 py-8 mx-auto sm:px-6 sm:pt-24 lg:px-8">
        <div className="sm:align-center sm:flex sm:flex-col">
          <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
            Zoznam členov
          </h1>
        </div>
        <div className="p-4">
          <Members members={members} />
        </div>
      </div>
    </section>
  );
}

function Members({ members }) {
  if (!members?.length) {
    return 'Nemáme členov';
  }

  return members.map((member) => <MemberCard member={member} />);
}

function MemberCard({ member }) {
  return (
    <Card title={`${member.name} ${member.surename}`}>
      Email: {member.email}
      <br />
      Pracovná pozícia: {member.job_role}
    </Card>
  );
}
