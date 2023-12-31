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
          <h1 className="text-4xl lg:text-6xl font-extrabold text-white text-center">
            Registrácia
          </h1>
          <p>
            Tu prosím, vyplň svoje základné údaje. Niektoré z nich budú dostupné
            v zozname členov, ktorý je pre každého v SUXA skvelým zdrojom
            príležitostí na networking.
          </p>
        </div>
      </div>
      <div className="p-4">
        <RegistrationForm userDetails={userDetails} user={user} />
      </div>
    </section>
  );
}
