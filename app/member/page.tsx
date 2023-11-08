import {
  getUserDetails,
  getSubscription,
  getActiveProductsWithPrices,
  getSession
} from '@/app/supabase-server';
import CardSubscription from './CardSubscription';
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
        <div className="sm:align-center sm:flex sm:flex-col mb-8">
          <h1 className="text-4xl lg:text-6xl font-extrabold text-white text-center">
            Členské
          </h1>
          <div className="text-center max-w-3xl self-center">
            <p className="mb-4">
              SUXA je nezisková organizácia, o ktorej prevádzku a projekty sa
              starajú dobrovoľníci.
            </p>
            <p className="mb-4">
              Okrem práce však stojí aj financie. Prevádzkujeme za ne Slack,
              newsletter a databázu členov, organizujeme World Usability Day či
              Bootcamp kurzy a podporujeme nápady členov komunity v grantoch.
            </p>
            <p className="mb-4">
              Väčšinu nákladov hradia sponzori, no časť aj členské príspevky,
              ktoré transparentne investujeme naspäť do komunity.
            </p>
            <p className="mb-4">
              Aj malým príspevkom teda pomáhaš SUXA prežiť a prinášať priestor
              pre výmenu znalostí a štart nových projektov.
            </p>
          </div>
        </div>
        <CardSubscription
          session={session}
          subscription={subscription}
          products={products}
        />
      </div>
    </section>
  );
}
