import { getSession } from '@/app/supabase-server';
import { redirect } from 'next/navigation';

export default async function Registration() {
  const [session] = await Promise.all([getSession()]);

  const user = session?.user;

  if (!user) {
    redirect('/signin');
  }

  return (
    <section className="mb-3">
      <div className="max-w-6xl px-4 py-8 mx-auto sm:px-6 sm:pt-24 lg:px-8">
        <div className="sm:align-center sm:flex sm:flex-col">
          <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl mb-12">
            Vitaj v SUXA!
          </h1>
          <p className="mb-4">
            Ďakujeme 💙 Ročný členský príspevok máte uhradený do … a ste
            plnohodnotným členom SUXA
          </p>
          <h2 className="text-xl font-extrabold">Čo ďalej?</h2>
          <p className="mb-4">
            <ul className="list-disc">
              <li>
                💬{' '}
                <a
                  href="https://join.slack.com/t/suxa/shared_invite/zt-cic8y6s3-0FI98I0jdc3RajDSPW~E~w"
                  target="_blank"
                >
                  Prihlás sa do Slacku
                </a>{' '}
                a začni debatovať so SUXA komunitou.
                <br />
                <span className="italic">
                  Tip: používaj svoje celé meno, aby sme sa ľahšie spoznali.
                </span>
              </li>
              <li>
                👀 Pozri sa kto ďalší je v SUXA v <a href="/">zozname členov</a>
                .
              </li>
              <li>
                📃 Prečítaj si o tom, aké ďalšie služby komunite SUXA poskytuje
                na{' '}
                <a
                  href="https://slite.com/organization/join-link/suxa/wvOqjzvVCrq9TnWcsfJyQZ/default"
                  target="_blank"
                >
                  našom Slite
                </a>
                .
              </li>
            </ul>
          </p>
          <h2 className="text-xl font-extrabold">
            Čo sme spravili automaticky?
          </h2>
          <p className="mb-4">
            <ul className="list-disc">
              <li>Poslali sme ti tieto informácie priamo do e-mailu.</li>
              <li>Pridali sme ťa do zoznamu členov.</li>
              <li>
                Prihlásili sme ťa do SUXA newslettera. Odhlásiť sa z neho môžeš
                pri najbližšom vydaní.
              </li>
            </ul>
          </p>
        </div>
      </div>
    </section>
  );
}
