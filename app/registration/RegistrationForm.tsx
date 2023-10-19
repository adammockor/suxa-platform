'use client';

import { Database } from '@/types_db';
import { User } from '@supabase/supabase-js';
import { experimental_useFormStatus as useFormStatus } from 'react-dom';
import { experimental_useFormState as useFormState } from 'react-dom';
import { update } from '../profile/actions';
import ProfileFormFactory from '../profile/ProfileFormFactory';
import Button from '@/components/ui/Button';
import { redirect } from 'next/navigation';
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
    <ProfileFormFactory
      action={formAction}
      userDetails={userDetails}
      user={user}
      submitButton={<SubmitButton type={type} />}
    />
  );
}

const SubmitButton = ({ type }: { type: string }) => {
  const { pending } = useFormStatus();

  let message;
  if (type === 'success') {
    redirect('/support');
  }

  if (type === 'error') {
    message = 'Nastala chyba pri aktualizacii profilu';
  }

  return (
    <>
      {!pending ? <span className="ml-auto mr-0">{message}</span> : null}
      <Button variant="slim" type="submit" form="profile" className="ml-auto">
        {pending ? 'Registrujem profil' : 'Registrovať sa'}
      </Button>
    </>
  );
};

export default RegistrationForm;
