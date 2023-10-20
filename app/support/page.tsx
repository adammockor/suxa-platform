import {
  getUserDetails,
  getSubscription,
  getActiveProductsWithPrices,
  getSession
} from '@/app/supabase-server';
import CardSubscription from '../support/CardSubscription';
import { redirect } from 'next/navigation';

export default async function Profile() {
  const [session, userDetails, subscription, products] = await Promise.all([
    getSession(),
    getUserDetails(),
    getSubscription(),
    getActiveProductsWithPrices()
  ]);

  const user = session?.user;

  if (!user || !userDetails) {
    redirect('/signin');
  }

  return (
    <section className="mb-3">
      <div className="max-w-6xl px-4 py-8 mx-auto sm:px-6 sm:pt-24 lg:px-8">
        <div className="sm:align-center sm:flex sm:flex-col">
          <h1 className="text-3xl font-extrabold text-white sm:text-center sm:text-5xl mb-12">
            Členský príspevok
          </h1>
          <div className="text-center max-w-3xl self-center">
            <p className="mb-4">
              SUXA je priestorom na výmenu znalostí a štart nových komunitných
              projektov.
            </p>
            <p className="mb-4">
              Členský príspevok nám pomáha prevádzkovať Slack, newsletter,
              databázu členov; organizovať World Usability Day, Bootcamp kurzy a
              podporovať nápady, ktoré vzniknú z komunity.
            </p>
            <p className="mb-4">
              Všetky financie investujeme späť do komunity. Naše financie sú
              otvorené. Drobným príspevkom nám pomôžete prežiť.
            </p>
          </div>
          <CardSubscription
            session={session}
            subscription={subscription}
            products={products}
          />
        </div>
      </div>
    </section>
  );
}
