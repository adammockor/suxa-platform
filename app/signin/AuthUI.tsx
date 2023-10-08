'use client';

import { useSupabase } from '@/app/supabase-provider';
import { getURL } from '@/utils/helpers';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

export default function AuthUI() {
  const { supabase } = useSupabase();
  return (
    <div className="flex flex-col space-y-4">
      <Auth
        supabaseClient={supabase}
        providers={[]}
        view="magic_link"
        magicLink={true}
        showLinks={false}
        redirectTo={`${getURL()}/auth/callback`}
        localization={{
          variables: {
            magic_link: {
              email_input_label: 'Email',
              email_input_placeholder: 'Vaša emailová adresa',
              button_label: 'Pošli magic link',
              loading_button_label: 'Posielam magic link ...',
              link_text: 'Pošli magic link email',
              confirmation_text: 'Nájdi magic link vo svojom emaile'
            }
          }
        }}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: '#404040',
                brandAccent: '#52525b'
              }
            }
          }
        }}
        theme="dark"
      />
    </div>
  );
}
