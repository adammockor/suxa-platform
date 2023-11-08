import {
  getUserDetails,
  getSubscription,
  getSession
} from '@/app/supabase-server';
import { redirect } from 'next/navigation';
import ProfileForm from './Profile';

export default async function Profile() {
  const [session, userDetails] = await Promise.all([
    getSession(),
    getUserDetails()
  ]);

  const user = session?.user;

  if (!user || !userDetails) {
    redirect('/signin');
  }

  return (
    <section className="mb-3">
      <div className="max-w-6xl px-4 py-8 mx-auto sm:px-6 sm:pt-24 lg:px-8">
        <div className="sm:align-center sm:flex sm:flex-col">
          <h1 className="text-4xl lg:text-6xl font-extrabold text-white text-center">
            Profil
          </h1>
          <div className="text-center max-w-3xl self-center">
            <p className="">
              Tu môžeš meniť a spravovať všetky údaje, ktoré sa nachádzajú v
              tvojom profile.
            </p>
          </div>
        </div>
      </div>
      <div className="p-4">
        <ProfileForm userDetails={userDetails} user={user} />
      </div>
    </section>
  );
}
