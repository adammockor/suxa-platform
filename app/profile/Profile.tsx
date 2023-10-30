'use client';

import { experimental_useFormStatus as useFormStatus } from 'react-dom';
import { experimental_useFormState as useFormState } from 'react-dom';
import Button from '@/components/ui/Button';
import { update } from './actions';
import { User } from '@supabase/supabase-js';
import { Database } from '@/types_db';
import ProfileForm from './ProfileForm';
import CardName from './CardName';
import CardEmail from './CardEmail';
import CardJob from './CardJob';
import CardBio from './CardBio';
import CardCommunity from './CardCommunity';

const initialState = {
  type: null
};

function Profile({
  userDetails,
  user
}: {
  userDetails: Database['public']['Tables']['users']['Row'];
  user: User;
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
    </ProfileForm>
  );
}

export default Profile;

const SubmitButton = ({ type }: { type: string }) => {
  const { pending } = useFormStatus();

  let message;
  if (type === 'success') {
    message = <span className="text-green-600">Profil aktualizovany</span>;
  }

  if (type === 'error') {
    message = (
      <span className="text-red-600">
        Nastala chyba pri aktualizacii profilu
      </span>
    );
  }

  return (
    <>
      {!pending ? <span className="ml-auto mr-0">{message}</span> : null}
      <Button variant="slim" type="submit" form="profile" className="ml-auto">
        {pending ? 'Aktualizujem profil' : 'Aktualizovať profil'}
      </Button>
    </>
  );
};
