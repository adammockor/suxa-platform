import ManageSubscriptionButton from './ManageSubscriptionButton';
import {
  getSession,
  getUserDetails,
  getSubscription
} from '@/app/supabase-server';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { update } from './actions';
import Card from './Card';
import CardJob from './CardJob';
import { isUserLogged } from '../userAccess';

export default async function Account() {
  const [{ user, session }, userDetails, subscription] = await Promise.all([
    isUserLogged(),
    getUserDetails(),
    getSubscription()
  ]);

  const subscriptionPrice =
    subscription &&
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: subscription?.prices?.currency!,
      minimumFractionDigits: 0
    }).format((subscription?.prices?.unit_amount || 0) / 100);

  return (
    <section className="mb-32 bg-black">
      <div className="max-w-6xl px-4 py-8 mx-auto sm:px-6 sm:pt-24 lg:px-8">
        <div className="sm:align-center sm:flex sm:flex-col">
          <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
            Account
          </h1>
          <p className="max-w-2xl m-auto mt-5 text-xl text-zinc-200 sm:text-center sm:text-2xl">
            We partnered with Stripe for a simplified billing.
          </p>
        </div>
      </div>
      <div className="p-4">
        <Card
          title="Your Plan"
          description={
            subscription
              ? `You are currently on the ${subscription?.prices?.products?.name} plan.`
              : 'You are not currently subscribed to any plan.'
          }
          footer={<ManageSubscriptionButton session={session} />}
        >
          <div className="mt-8 mb-4 text-xl font-semibold">
            {subscription ? (
              `${subscriptionPrice}/${subscription?.prices?.interval}`
            ) : (
              <Link href="/">Choose your plan</Link>
            )}
          </div>
        </Card>
        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
        <form id="profile" action={update} className="">
          <h2 className="text-3xl font-extrabold text-white sm:text-center sm:text-5xl">
            Profil
          </h2>
          <CardName name={userDetails?.name} surename={userDetails?.surename} />
          <CardEmail email={user?.email} />
          <CardJob
            organization={userDetails?.organization ?? ''}
            job_role={userDetails?.job_role ?? ''}
            years_of_experience={
              userDetails?.years_of_experience?.toString() ?? ''
            }
            city={userDetails?.city ?? ''}
          />
          <CardBio
            bio={userDetails?.bio ?? ''}
            linkedin={userDetails?.linkedin ?? ''}
            website={userDetails?.website ?? ''}
          />
          <div className="w-full max-w-3xl m-auto my-8 flex">
            <Button
              variant="slim"
              type="submit"
              form="profile"
              className="ml-auto"
            >
              Update profile
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}

function CardEmail({ email }: { email?: string }) {
  return (
    <Card
      title="Your Email"
      description="Please enter the email address you want to use to login."
      footer={
        <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
          <p className="pb-4 sm:pb-0">
            We will email you to verify the change.
          </p>
        </div>
      }
    >
      <div className="mt-8 mb-4 text-xl font-semibold flex gap-4">
        <div className="w-1/2 mt-4">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-white"
          >
            Email
          </label>
          <input
            type="text"
            name="email"
            className="w-full p-3 rounded-md bg-zinc-800"
            defaultValue={email ?? ''}
            placeholder="Your email"
            maxLength={64}
          />
        </div>
      </div>
    </Card>
  );
}

function CardName({ name, surename }: { name?: string; surename?: string }) {
  return (
    <Card
      title="Your Name"
      description="Please enter your name, or a display name you are comfortable with."
      footer={
        <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
          <p className="pb-4 sm:pb-0">64 characters maximum</p>
        </div>
      }
    >
      <div className="mt-8 mb-4 text-xl font-semibold flex gap-4">
        <div className="w-1/2 mt-4">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-white"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            className="w-full p-3 rounded-md bg-zinc-800"
            defaultValue={name ?? ''}
            placeholder="Your name"
            maxLength={64}
            required
          />
        </div>
        <div className="w-1/2 mt-4">
          <label
            htmlFor="surename"
            className="block mb-2 text-sm font-medium text-white"
          >
            Surename
          </label>
          <input
            type="text"
            name="surename"
            className="p-3 rounded-md bg-zinc-800"
            defaultValue={surename}
            placeholder="Your surename"
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
      title="Your Name"
      description="Please enter your name, or a display name you are comfortable with."
      footer={
        <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
          <p className="pb-4 sm:pb-0">
            500 characters maximum for bio, 64 for rest
          </p>
        </div>
      }
    >
      <div className="mt-8 mb-4 text-xl font-semibold flex gap-4">
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
            placeholder="Your bio"
            maxLength={500}
          />
        </div>
      </div>
      <div className="mt-8 mb-4 text-xl font-semibold flex gap-4">
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
            placeholder="Your linkedin"
            maxLength={64}
          />
        </div>
      </div>
      <div className="mt-8 mb-4 text-xl font-semibold flex gap-4">
        <div className="w-full mt-4">
          <label
            htmlFor="website"
            className="block mb-2 text-sm font-medium text-white"
          >
            Website
          </label>
          <input
            type="text"
            name="website"
            className="w-full p-3 rounded-md bg-zinc-800"
            defaultValue={website}
            placeholder="Your website"
            maxLength={64}
          />
        </div>
      </div>
    </Card>
  );
}