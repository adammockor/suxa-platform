'use client';

import { experimental_useFormStatus as useFormStatus } from 'react-dom';
import { experimental_useFormState as useFormState } from 'react-dom';
import Button from '@/components/ui/Button';
import { update } from './actions';
import { User } from '@supabase/supabase-js';
import { Database } from '@/types_db';
import ProfileFormFactory from './ProfileFormFactory';

const initialState = {
  type: null
};

function ProfileForm({
  userDetails,
  user
}: {
  userDetails: Database['public']['Tables']['users']['Row'];
  user: User;
}) {
  const [{ type }, formAction] = useFormState(update, initialState);

  return (
    <ProfileFormFactory
      action={formAction}
      userDetails={userDetails}
      user={user}
      submitButton={<SubmitButton type={type} />}
    />
  );
}

export default ProfileForm;

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

