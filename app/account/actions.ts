'use server';

import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { getSession } from '../supabase-server';
import { Database } from '@/types_db';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

export async function update(formData: FormData) {
  const supabase = createServerActionClient<Database>({ cookies });
  const session = await getSession();
  const user = session?.user;

  const name = formData.get('name') as string;
  const surename = formData.get('surename') as string;
  const organization = formData.get('organization') as string;
  const job_role = formData.get('job_role') as string;
  const job_role_other = formData.get('job_role_other') as string;
  const years_of_experience = formData.get('years_of_experience') as string;
  const city = formData.get('city') as string;
  const bio = formData.get('bio') as string;
  const linkedin = formData.get('linkedin') as string;
  const website = formData.get('website') as string;

  const { error: usersError } = await supabase
    .from('users')
    .update({
      name,
      surename,
      organization,
      years_of_experience: parseInt(years_of_experience),
      city,
      job_role: job_role_other ? job_role_other : job_role,
      bio,
      linkedin,
      website
    })
    .eq('id', user?.id);

  const newEmail = formData.get('email') as string;
  const { error: userError } = await supabase.auth.updateUser({
    email: newEmail
  });

  if (usersError || userError) {
    return { message: 'Failed to update' };
  }

  console.log(`User ${user?.id} profile updated`);

  revalidatePath('/account');
}
