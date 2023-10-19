import {
  getUserDetails,
  getSubscription,
  getSession
} from '@/app/supabase-server';
import { redirect } from 'next/navigation';
import ProfileForm from '../profile/ProfileForm';

export default async function Profile() {
  const [session, userDetails, subscription] = await Promise.all([
    getSession(),
    getUserDetails(),
    getSubscription()
  ]);

  const user = session?.user;

  if (!user || !userDetails) {
    redirect('/signin');
  }

  let profileComplete =
    userDetails?.job_role && userDetails?.name && userDetails?.surename;

  if (profileComplete) {
    redirect('/profile');
  }

  return (
    <section className="mb-3">
      <div className="max-w-6xl px-4 py-8 mx-auto sm:px-6 sm:pt-24 lg:px-8">
        <div className="sm:align-center sm:flex sm:flex-col">
          <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
            Registrácia
          </h1>
        </div>
      </div>
      <div className="p-4">
        <ProfileForm userDetails={userDetails} user={user} />
      </div>
    </section>
  );
}
