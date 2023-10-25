'use client';

import Card from './Card';
import CardJob from './CardJob';
import { User } from '@supabase/supabase-js';
import { Database } from '@/types_db';

function ProfileFormFactory({
  action,
  submitButton,
  userDetails,
  user
}: {
  action: (formData: FormData) => void;
  userDetails: Database['public']['Tables']['users']['Row'];
  user: User;
  submitButton: React.ReactNode;
}) {
  return (
    <form id="profile" action={action} className="">
      <CardName name={userDetails.name} surename={userDetails.surename} />
      <CardEmail email={user.email} emailVisible={userDetails.email_visible} />
      <CardJob
        organization={userDetails.organization}
        job_role={userDetails.job_role}
        years_of_experience={userDetails.years_of_experience}
        city={userDetails.city}
      />
      <CardBio
        bio={userDetails.bio}
        linkedin={userDetails.linkedin}
        website={userDetails.website}
      />
      <CardCommunity
        expectations={userDetails.expectations}
        interests={userDetails.interests}
      />
      <GDPRConsent gdprConsent={userDetails.gdpr_consent} />
      <div className="w-full max-w-3xl m-auto my-8 flex items-center justify-end gap-4">
        {submitButton}
      </div>
    </form>
  );
}

export default ProfileFormFactory;

function CardEmail({
  email,
  emailVisible
}: {
  email?: string | null;
  emailVisible?: boolean | null;
}) {
  return (
    <Card
      title="Kontaktné údaje"
      description="E-mail bude vašim vstupom do komunity a budeme naň posielať SUXA newsletter. Môžete sa rozhodnúť nezobrazovať ho v zozname členov."
    >
      <div className="mt-4 mb-4 text-xl font-semibold flex gap-4">
        <div className="w-1/2 mt-4">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-white"
          >
            Email (povinné)
          </label>
          <input
            type="text"
            name="email"
            className="w-full p-3 rounded-md bg-zinc-400 text-black"
            defaultValue={email ?? ''}
            placeholder="Tvoj email"
            required
            readOnly
          />
        </div>
      </div>
      <div className="mt-4 text-xl flex gap-4">
        <div className="w-1/2">
          <div className="flex items-center mb-4">
            <input
              id="email_visible"
              name="email_visible"
              type="checkbox"
              defaultChecked={emailVisible ?? true}
              className="w-6 h-4 text-blue-600 bg-gray-100 border-gray-300 round"
            />
            <label htmlFor="email_visible" className="ml-2">
              Zobrazovať e-mail v zozname členov
            </label>
          </div>
        </div>
      </div>
    </Card>
  );
}

function CardName({
  name,
  surename
}: {
  name?: string | null;
  surename?: string | null;
}) {
  return (
    <Card
      title="Meno a priezvisko"
      description="Stávate sa súčasťou komunity, vaše meno bude dostupné všetkým ostatným členom."
    >
      <div className="mt-4 mb-4 text-xl font-semibold flex gap-4">
        <div className="w-full mt-4">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-white"
          >
            Meno (povinné)
          </label>
          <input
            type="text"
            name="name"
            className="w-full p-3 rounded-md bg-white text-black"
            defaultValue={name ?? ''}
            placeholder="Meno"
            maxLength={64}
            required
          />
        </div>
        <div className="w-full mt-4">
          <label
            htmlFor="surename"
            className="block mb-2 text-sm font-medium text-white"
          >
            Priezvisko (povinné)
          </label>
          <input
            type="text"
            name="surename"
            className="w-full p-3 rounded-md bg-white text-black"
            defaultValue={surename ?? ''}
            placeholder="Priezvisko"
            maxLength={64}
            required
          />
        </div>
      </div>
    </Card>
  );
}

function CardBio({
  bio,
  linkedin,
  website
}: {
  bio?: string | null;
  linkedin?: string | null;
  website?: string | null;
}) {
  return (
    <Card
      title="Váš profil"
      description="Doplňte detaily o Vás, ktoré pomôžu ostatným v komunite vás spoznať."
    >
      <div className="mt-4 mb-2 text-xl font-semibold flex gap-4">
        <div className="w-full mt-4">
          <label
            htmlFor="bio"
            className="block mb-2 text-sm font-medium text-white"
          >
            O vás
          </label>
          <textarea
            name="bio"
            className="w-full p-3 rounded-md bg-white text-black"
            defaultValue={bio ?? ''}
            placeholder="O vás"
            maxLength={500}
          />
        </div>
      </div>
      <div className="mb-2 text-xl font-semibold flex gap-4">
        <div className="w-full mt-4">
          <label
            htmlFor="linkedin"
            className="block mb-2 text-sm font-medium text-white"
          >
            Linkedin profil
          </label>
          <input
            type="text"
            name="linkedin"
            className="w-full p-3 rounded-md bg-white text-black"
            defaultValue={linkedin ?? ''}
            placeholder="Linkedin profil url"
            maxLength={64}
          />
        </div>
      </div>
      <div className="mb-2 text-xl font-semibold flex gap-4">
        <div className="w-full mt-4">
          <label
            htmlFor="website"
            className="block mb-2 text-sm font-medium text-white"
          >
            Osobný web
          </label>
          <input
            type="text"
            name="website"
            className="w-full p-3 rounded-md bg-white text-black"
            defaultValue={website ?? ''}
            placeholder="Osobný web url"
            maxLength={64}
          />
        </div>
      </div>
    </Card>
  );
}

function CardCommunity({
  interests,
  expectations
}: {
  interests?: string | null;
  expectations?: string | null;
}) {
  return (
    <Card
      title="Tvoje záujmy"
      description="Radi by sme sa dozvedeli ako lepšie tvoriť SUXA pre teba. Povedz nám čo ťa zaujíma."
    >
      <div className="mt-4 mb-2 text-xl font-semibold flex gap-4">
        <div className="w-full mt-4">
          <label
            htmlFor="interests"
            className="block mb-2 text-sm font-medium text-white"
          >
            Aké obsahové témy ťa zaujímajú?
          </label>
          <textarea
            name="interests"
            className="w-full p-3 rounded-md bg-white text-black"
            defaultValue={interests ?? ''}
            maxLength={500}
          />
        </div>
      </div>
      <div className="mt-4 mb-2 text-xl font-semibold flex gap-4">
        <div className="w-full mt-4">
          <label
            htmlFor="expectations"
            className="block mb-2 text-sm font-medium text-white"
          >
            Aké sú tvoje očakávania od členstva v SUXA?
          </label>
          <textarea
            name="expectations"
            className="w-full p-3 rounded-md bg-white text-black"
            defaultValue={expectations ?? ''}
            maxLength={500}
          />
        </div>
      </div>
    </Card>
  );
}

function GDPRConsent({ gdprConsent }: { gdprConsent?: boolean | null }) {
  return (
    <Card title="Spracovanie osobných údajov">
      <div className="mt-4 text-xl flex gap-4">
        <div className="w-full">
          <div className="flex items-center mb-4">
            <input
              id="gdpr_consent"
              name="gdpr_consent"
              type="checkbox"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 round"
              required
              defaultChecked={gdprConsent ?? false}
            />
            <label htmlFor="gdpr_consent" className="ml-2">
              Súhlasím so spracovaním údajov (povinné)
            </label>
          </div>
        </div>
      </div>
    </Card>
  );
}