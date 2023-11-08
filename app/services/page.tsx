import {
  getUserDetails,
  getSession,
  getSubscription
} from '@/app/supabase-server';
import { redirect } from 'next/navigation';
import Card from '../profile/Card';
import Link from 'next/link';
import cn from 'classnames';
import button from '@/components/ui/Button/Button.module.css';

export default async function Profile() {
  const [session, userDetails, subscription] = await Promise.all([
    getSession(),
    getUserDetails(),
    getSubscription()
  ]);

  const user = session?.user;

  if (!user || !userDetails) {
    redirect('/signin');
  }

  if (!subscription) {
    redirect('/member');
  }

  return (
    <section className="mb-3">
      <div className="max-w-6xl px-4 py-8 mx-auto sm:px-6 sm:pt-24 lg:px-8">
        <div className="sm:align-center sm:flex sm:flex-col">
          <h1 className="text-4xl lg:text-6xl font-extrabold text-white">
            Ďalšie SUXA služby
          </h1>
          <div className="text-center max-w-3xl self-center mb-8">
            <p className="mb-4">
              Víziou SUXA je spájať komunitu a poskytnúť priestor pre štart
              nových komunitných projektov. Toto je rozcestník našich projektov:
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-x-8">
            <CardSlack />
            <CardSlite />
            <CardMembers />
            <CardCommunityProject />
            <CardBenefits />
          </div>
        </div>
      </div>
    </section>
  );
}
function CardSlack() {
  return (
    <Card title="SUXA Slack">
      <ul className="list-disc ml-4 mb-4">
        <li>diskutuj o odborných témách</li>
        <li>informuj sa o nových podujatiach</li>
        <li>tvor nové komunity</li>
      </ul>
      <Link
        href="https://suxa.slack.com/"
        className={cn(button.root, button.slim)}
      >
        Slack
      </Link>
    </Card>
  );
}

function CardSlite() {
  return (
    <Card title="SUXA Slite">
      <ul className="list-disc ml-4 mb-4">
        <li>prečítaj si stratégiu SUXA</li>
        <li>pozri si ako SUXA funguje</li>
        <li>pridaj sa k pracovným skupinám a buď aktívny</li>
      </ul>
      <Link
        href="https://suxa.slite.com/"
        className={cn(button.root, button.slim)}
      >
        Slite
      </Link>
    </Card>
  );
}

function CardMembers() {
  return (
    <Card title="Zoznam členov">
      <ul className="list-disc ml-4 mb-4">
        <li>nájdi si partnera pre diskusiu alebo svoj nápad</li>
        <li>pozri sa kto ďalší je v komunite</li>
        <li>prezentuj sa</li>
      </ul>
      <Link href="/" className={cn(button.root, button.slim)}>
        Zoznam členov
      </Link>
    </Card>
  );
}

function CardCommunityProject() {
  return (
    <Card title="Rozbehni svoj komunitný projekt">
      <ul className="list-disc ml-4 mb-4">
        <li>nájdi ľudí, ktorí chcú rozbehnúť podobný nápad</li>
        <li>požiadaj o finančný grant pre tvoj nápad</li>
        <li>využi databázu kontaktov SUXA na zozdielanie</li>
      </ul>
      <Link
        href="https://suxa.slite.com/app/docs/oAARYmfwBKlv7B"
        className={cn(button.root, button.slim)}
      >
        Podpora pre nápady
      </Link>
    </Card>
  );
}

function CardBenefits() {
  return (
    <Card title="Pozri si kompletné benefity SUXA">
      <ul className="list-disc ml-4 mb-4">
        <li>kandiduj do Rady a ovplyvni chod SUXA</li>
        <li>získaj prednostný vstup na naše podujatia</li>
        <li>pochváľ sa členstvom v SUXA</li>
      </ul>
      <Link
        href="https://suxa.slite.com/app/docs/-4Yz1arafxqCId"
        className={cn(button.root, button.slim)}
      >
        Benefity členstva
      </Link>
    </Card>
  );
}
