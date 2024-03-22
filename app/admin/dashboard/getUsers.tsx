import { Database } from '@/types_db';
import { supabaseAdmin } from '@/utils/supabase-client-admin';

type User = Database['public']['Views']['auth_users']['Row'] &
  Pick<Database['public']['Tables']['customers']['Row'], 'stripe_customer_id'> &
  Pick<Database['public']['Tables']['users']['Row'], 'name' | 'surename'> & {
    subscriptions: (Pick<
      Database['public']['Tables']['subscriptions']['Row'],
      'status' | 'current_period_end'
    > &
      Pick<Database['public']['Tables']['prices']['Row'], 'unit_amount'>)[];
  };

export async function getUsers() {
  const { data, error, ...other } = await supabaseAdmin
    .from('auth_users')
    .select(
      '*, ...customers(stripe_customer_id), ...users (name, surename, subscriptions (status, current_period_end, ...prices (unit_amount)))'
    )
    // .not('users(subscriptions)', 'is', false)
    // .count('subscriptions')
    // .eq('subscriptions(current_period_end)', {
    //   foreignTable: 'users(subscriptions)',
    //   ascending: false
    // })
    .range(0, 50)
    .returns<User[]>();
  // .eq('status', 'active')
  // .order('users(subscriptions(status))', { ascending: false });

  if (error) {
    throw error;
  }

  if (!data?.length) {
    return [];
  }

  return data;

  // const members = data.map((item) => {
  //   // @ts-ignore not sure why the type not exists
  //   const { auth_users, ...other } = item.users;
  //   return {
  //     ...other,
  //     email: other.email_visible ? auth_users.email : null
  //   };
  // });

  // return members;
}
