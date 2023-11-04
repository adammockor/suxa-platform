import {
  getSession,
  getSubscription,
  getUserDetails
} from './../supabase-server';
import { redirect } from 'next/navigation';
import Card from './../profile/Card';
import { getMembers } from '@/utils/supabase-admin';
import Link from 'next/link';
import button from '../../components/ui/Button/Button.module.css';
import cn from 'classnames';

export default async function Dashboard() {
  const [session, subscription, members, userDetails] = await Promise.all([
    getSession(),
    getSubscription(),
    getMembers(),
    getUserDetails()
  ]);

  let profileIncomplete =
    !userDetails?.job_role || !userDetails?.name || !userDetails?.surename;

  if (!session) {
    redirect('/profile');
  }

  // if (!subscription) {
  //   return (
  //     <>
  //       <p className="max-w-2xl m-auto mb-8 mt-5 text-xl text-zinc-200 sm:text-center sm:text-2xl">
  //         Členský príspevok ešte nemáš uhradený.
  //       </p>
  //       <Link
  //         className={cn(
  //           button.root,
  //           button.cta,
  //           button.slim,
  //           'max-w-max',
  //           'self-center'
  //         )}
  //         href={'/support'}
  //       >
  //         Ísť do Moje členské
  //       </Link>
  //     </>
  //   );
  // }

  if (profileIncomplete) {
    return (
      <>
        <p className="max-w-2xl m-auto mb-8 mt-5 text-xl text-zinc-200 sm:text-center sm:text-2xl">
          Pomôž ostatným lepšie ťa spoznať. Vyplň pár detailov o sebe.
        </p>
        <Link
          className={cn(
            button.root,
            button.cta,
            button.slim,
            'max-w-max',
            'self-center'
          )}
          href={'/profile'}
        >
          Ísť do Profilu
        </Link>
      </>
    );
  }

  return (
    <>
      <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
        Zoznam členov
      </h1>

      <div className="text-center max-w-3xl self-center">
        <p className="mb-4">
          V tomto zozname nájdeš všetkých členov SUXA. Kliknutím o nich zistíš
          viac
        </p>
      </div>
      <div className="p-4">
        <Members members={members} />
      </div>
    </>
  );
}

function Members({ members }: { members?: Member[] }) {
  if (!members?.length) {
    return (
      <div className="text-center max-w-3xl self-center">
        <p className="mb-4">Staň sa prvým členom</p>
      </div>
    );
  }

  return members.map((member) => <MemberCard member={member} />);
}

type Member = {
  name?: string | null;
  surename?: string | null;
  job_role?: string | null;
  email?: string | null;
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
