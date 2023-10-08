import { getSession, getSubscription } from './supabase-server';
import { redirect } from 'next/navigation';
import Card from './profile/Card';
import { getMembers } from '@/utils/supabase-admin';
import Link from 'next/link';

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

function Members({ members }: { members?: Member[] }) {
  if (!members?.length) {
    return 'Nemáme členov';
  }

  return members.map((member) => <MemberCard member={member} />);
}

type Member = {
  name?: string;
  surename?: string;
  job_role?: string;
  email?: string;
  organization?: string | null;
  years_of_experience?: number | null;
  bio?: string | null;
  linkedin?: string | null;
  website?: string | null;
  city?: string | null;
};

function MemberCard({ member }: { member: Member }) {
  const {
    bio,
    linkedin,
    website,
    email,
    years_of_experience,
    organization,
    city
  } = member;
  return (
    <Card title={`${member.name} ${member.surename}`}>
      {email ? (
        <>
          Email: <Link href={`mailto:${email}`}>{email}</Link>
          <br />
        </>
      ) : null}
      Pracovná pozícia: {member.job_role}
      {years_of_experience ? ` (${years_of_experience})` : null}
      {organization ? ` @ ${organization}` : null}
      {city ? `, ${city}` : null}
      {bio || linkedin || website ? (
        <details>
          <summary>Viac</summary>
          {bio ? (
            <>
              Bio: {bio}
              <br />
            </>
          ) : null}
          {linkedin ? (
            <>
              LinkedIn: <Link href={linkedin}>{linkedin}</Link>
              <br />
            </>
          ) : null}
          {website ? (
            <>
              Stránka: <Link href={website}>{website}</Link>
            </>
          ) : null}
        </details>
      ) : null}
    </Card>
  );
}
