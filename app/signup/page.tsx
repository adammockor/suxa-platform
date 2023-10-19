import { getSession } from '@/app/supabase-server';
import AuthUI from './AuthUI';

import { redirect } from 'next/navigation';

export default async function SignIn() {
  const session = await getSession();

  if (session) {
    return redirect('/');
  }

  return (
    <div className="mt-16">
      <div className="align-center">
        <h1 className="text-center">Registrácia</h1>
        <p className="mb-8 text-center">
          Prvým krokom registrácie nového člena SUXA je overenie emailovej
          adresy.
        </p>
      </div>
      <div className="flex flex-col justify-between max-w-lg p-3 m-auto w-80 ">
        <AuthUI />
      </div>
    </div>
  );
}
