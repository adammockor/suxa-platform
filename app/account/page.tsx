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

export default async function Account() {
  const [session, userDetails, subscription] = await Promise.all([
    getSession(),
    getUserDetails(),
    getSubscription()
  ]);

  const user = session?.user;

  if (!session) {
    return redirect('/signin');
  }

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
      <form id="account" action={update} className="">
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

          <div className="w-full max-w-3xl m-auto my-8 flex">
            <Button
              variant="slim"
              type="submit"
              form="account"
              className="ml-auto"
            >
              Update profile
            </Button>
          </div>
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
        </div>
      </form>
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
