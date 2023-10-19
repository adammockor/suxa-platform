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
      <h2 className="text-3xl font-extrabold text-white sm:text-center sm:text-5xl">
        O vás
      </h2>
      <CardName name={userDetails?.name} surename={userDetails?.surename} />
      <CardEmail
        email={user?.email ?? ''}
        emailVisible={userDetails?.email_visible ?? false}
      />
      <CardJob
        organization={userDetails?.organization ?? ''}
        job_role={userDetails?.job_role ?? ''}
        years_of_experience={userDetails?.years_of_experience?.toString() ?? ''}
        city={userDetails?.city ?? ''}
      />
      <CardBio
        bio={userDetails?.bio ?? ''}
        linkedin={userDetails?.linkedin ?? ''}
        website={userDetails?.website ?? ''}
      />
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
  email: string;
  emailVisible: boolean;
}) {
  return (
    <Card
      title="Váš email"
      description="Vyplň váš prihlasovací email."
      footer={
        <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
          <p className="pb-4 sm:pb-0">Zmenu verifikujeme cez email.</p>
        </div>
      }
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
            className="w-full p-3 rounded-md bg-zinc-800"
            defaultValue={email ?? ''}
            placeholder="Tvoj email"
            required
            maxLength={64}
          />
        </div>
      </div>
      <div className="mt-4 text-xl font-semibold flex gap-4">
        <div className="w-1/2">
          <div className="flex items-center mb-4">
            <input
              id="email_visible"
              name="email_visible"
              type="checkbox"
              defaultChecked={emailVisible}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 round"
            />
            <label htmlFor="email_visible" className="ml-2">
              Email dostupný pre členov
            </label>
          </div>
        </div>
      </div>
    </Card>
  );
}

function CardName({ name, surename }: { name?: string; surename?: string }) {
  return (
    <Card
      title="Vaše meno"
      description="Vypľňte vaše meno a priezvisko"
      footer={
        <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
          <p className="pb-4 sm:pb-0">Maximálne 64 znakov</p>
        </div>
      }
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
            className="w-full p-3 rounded-md bg-zinc-800"
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
            className="w-full p-3 rounded-md bg-zinc-800"
            defaultValue={surename}
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
  bio?: string;
  linkedin?: string;
  website?: string;
}) {
  return (
    <Card
      title="Ďalšie informácie"
      description="Ďalšie informácie o vás"
      footer={
        <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
          <p className="pb-4 sm:pb-0">
            Maximálne 500 znakov v bio, 64 v ostatných poliach
          </p>
        </div>
      }
    >
      <div className="mt-4 mb-2 text-xl font-semibold flex gap-4">
        <div className="w-full mt-4">
          <label
            htmlFor="bio"
            className="block mb-2 text-sm font-medium text-white"
          >
            Bio
          </label>
          <textarea
            name="bio"
            className="w-full p-3 rounded-md bg-zinc-800"
            defaultValue={bio ?? ''}
            placeholder="Bio"
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
            Linkedin
          </label>
          <input
            type="text"
            name="linkedin"
            className="w-full p-3 rounded-md bg-zinc-800"
            defaultValue={linkedin}
            placeholder="Linkedin"
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
            Osobná stránka
          </label>
          <input
            type="text"
            name="website"
            className="w-full p-3 rounded-md bg-zinc-800"
            defaultValue={website}
            placeholder="Stránka"
            maxLength={64}
          />
        </div>
      </div>
    </Card>
  );
}
