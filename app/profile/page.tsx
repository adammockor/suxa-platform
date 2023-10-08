import {
  getUserDetails,
  getSubscription,
  getActiveProductsWithPrices,
  getSession
} from '@/app/supabase-server';
import CardSubscription from './CardSubscription';
import { redirect } from 'next/navigation';
import ProfileForm from './ProfileForm';

export default async function Profile() {
  const [session, userDetails, subscription, products] = await Promise.all([
    getSession(),
    getUserDetails(),
    getSubscription(),
    getActiveProductsWithPrices()
  ]);

  const user = session?.user;

  if (!user) {
    redirect('/signin');
  }

  let profileIncomplete =
    !userDetails?.job_role || !userDetails?.name || !userDetails?.surename;

  return (
    <section className="mb-3">
      <div className="max-w-6xl px-4 py-8 mx-auto sm:px-6 sm:pt-24 lg:px-8">
        <div className="sm:align-center sm:flex sm:flex-col">
          <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
            Váš profil
          </h1>
          <p className="max-w-2xl m-auto mb-8 mt-5 text-xl text-zinc-200 sm:text-center sm:text-2xl">
            {profileIncomplete || !subscription
              ? `🙏 Prosíme, ${[
                  profileIncomplete && 'vyplňte povinné informácie',
                  !subscription && 'zaplaťte členský poplatok'
                ]
                  .filter(Boolean)
                  .join(' a ')}`
              : 'Ďakujeme, že podporujete rozvoj User Experience dizajnu na Slovensku'}
          </p>
        </div>
      </div>
      <div className="p-4">
        <h2 className="text-3xl font-extrabold text-white sm:text-center sm:text-5xl">
          Vaše členské
        </h2>
        <CardSubscription
          session={session}
          subscription={subscription}
          products={products}
        />
        <hr className="h-px my-8 bg-zinc-700 border-0 dark:bg-gray-700" />
        <ProfileForm userDetails={userDetails} user={user} />
      </div>
    </section>
  );
}
