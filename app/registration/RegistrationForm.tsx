'use client';

import { Database } from '@/types_db';
import { User } from '@supabase/supabase-js';
import { experimental_useFormStatus as useFormStatus } from 'react-dom';
import { experimental_useFormState as useFormState } from 'react-dom';
import { update } from '../profile/actions';
import ProfileForm from '../profile/ProfileForm';
import Button from '@/components/ui/Button';
import { redirect } from 'next/navigation';
import CardName from '../profile/CardName';
import CardEmail from '../profile/CardEmail';
import CardJob from '../profile/CardJob';
import CardBio from '../profile/CardBio';
import CardCommunity from '../profile/CardCommunity';
import GDPRConsent from '../profile/GDPRConsent';
const initialState = {
  type: null
};

function RegistrationForm({
  userDetails,
  user
}: {
  userDetails: Database['public']['Tables']['users']['Row'];
  user: User;
  redirectOnSuccess?: string;
}) {
  const [{ type }, formAction] = useFormState(update, initialState);

  return (
    <ProfileForm
      action={formAction}
      submitButton={<SubmitButton type={type} />}
    >
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
    </ProfileForm>
  );
}

const SubmitButton = ({ type }: { type: string }) => {
  const { pending } = useFormStatus();

  let message;
  if (type === 'success') {
    redirect('/member');
  }

  if (type === 'error') {
    message = (
      <div className="text-red-600">Nastala chyba pri aktualizacii profilu</div>
    );
  }

  return (
    <>
      {!pending && message ? message : null}
      <Button
        variant="slim"
        type="submit"
        form="profile"
        className="ml-auto w-full lg:w-auto"
      >
        {pending ? 'Registrujem profil' : 'Registrovať sa'}
      </Button>
    </>
  );
};

export default RegistrationForm;
