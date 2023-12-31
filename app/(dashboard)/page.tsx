import {
  getSession,
  getSubscription,
  getUserDetails
} from './../supabase-server';
import { redirect } from 'next/navigation';
import { getMembers } from '@/utils/supabase-admin';
import Link from 'next/link';
import button from '../../components/ui/Button/Button.module.css';
import cn from 'classnames';
import MemberCard, { Member } from './MemberCard';

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
    redirect('/signin');
  }

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
          href={'/registration'}
        >
          Ísť do Registrácie
        </Link>
      </>
    );
  }

  if (!subscription) {
    return (
      <>
        <p className="max-w-2xl m-auto mb-8 mt-5 text-xl text-zinc-200 sm:text-center sm:text-2xl">
          Táto sekcia je dostupná až po uhradení členského príspevku.
        </p>
        <Link
          className={cn(
            button.root,
            button.cta,
            button.slim,
            'max-w-max',
            'self-center'
          )}
          href={'/member'}
        >
          Uhradiť členské
        </Link>
      </>
    );
  }

  return (
    <>
      <h1 className="text-4xl lg:text-6xl font-extrabold text-white text-center">
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

  return (
    <div className="grid lg:grid-cols-3 gap-x-8">
      {members.map((member) => (
        <MemberCard key={member.email} member={member} />
      ))}
    </div>
  );
}

