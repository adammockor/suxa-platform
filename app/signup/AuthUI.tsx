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
        redirectTo={`${getURL()}/auth/callback?source=signup`}
        localization={{
          variables: {
            magic_link: {
              email_input_label: 'E-mail',
              email_input_placeholder: 'Tvoja e-mailová adresa',
              button_label: 'Overiť',
              loading_button_label: 'Posielam overovací e-mail ...',
              // link_text: 'Pošli overovací email',
              confirmation_text:
                'Super! Poslali sme ti overovací e-mail, v ktorom nájdeš link. Pre pokračovanie registrácie naň klikni.'
            }
          }
        }}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: '#017aff',
                brandAccent: '#3495ff',
                inputText: '#fff'
              }
            }
          }
        }}
        theme="dark"
      />
    </div>
  );
}
