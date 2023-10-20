import { getUserDetails, getSession } from '@/app/supabase-server';
import { redirect } from 'next/navigation';
import RegistrationForm from './RegistrationForm';

export default async function Registration() {
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
          <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
            Registrácia
          </h1>
          <p>
            Radi by sme ťa spoznali! Jedným z hlavných cieľov SUXA je networking
            členov. Preto zbierame základné údaje, ktoré budú dostupné v zozname
            členov.
          </p>
        </div>
      </div>
      <div className="p-4">
        <RegistrationForm userDetails={userDetails} user={user} />
      </div>
    </section>
  );
}
