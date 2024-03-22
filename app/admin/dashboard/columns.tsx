'use client';

import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from './DataTableColumnHeader';
import { Member } from '@/app/(dashboard)/MemberCard';
import { getUsers } from './getUsers';

type Unpacked<T> = T extends (infer U)[] ? U : T;

type User = Unpacked<Awaited<ReturnType<typeof getUsers>>>;

export const columns: ColumnDef<User>[] = [
  {
    id: 'email',
    accessorFn: (row) =>
      `${!row.email_confirmed_at ? '(nepotvrdený) ' : ''}${row.email}`,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => <div>{row.getValue('email')}</div>
  },
  {
    id: 'fullName',
    accessorFn: (row) =>
      `${
        row.name && row.surename
          ? `${row.name} ${row.surename}`
          : 'Nevyplnený profil'
      }`,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Meno" />
    ),
    cell: ({ row }) => {
      return <div>{row.getValue('fullName')}</div>;
    }
  },
  {
    id: 'subscriptions',
    accessorFn: (row) => {
      if (!row.subscriptions.length) {
        return 'Nemá členské';
      }
      return row.subscriptions
        .map((subscription) => formatSubscription(subscription))
        .join('\r\n');
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Členské" />
    ),
    cell: ({ row }) => (
      <div>
        {row.getValue('subscriptions')}
        {row.original.stripe_customer_id ? (
          <>
            {' '}
            <a
              href={`https://dashboard.stripe.com/customers/${row.original.stripe_customer_id}`}
            >
              (Stripe)
            </a>
          </>
        ) : (
          ''
        )}
      </div>
    )
  },
  {
    id: 'created_at',
    accessorFn: (row) => (row.created_at ? formatDate(row.created_at) : ''),
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Vytvorený" />
    ),
    cell: ({ row }) => <div>{row.getValue('created_at')}</div>
  },
  {
    id: 'last_sign_in_at',
    accessorFn: (row) =>
      row.last_sign_in_at ? formatDate(row.last_sign_in_at) : '',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Posledné prihlásenie" />
    ),
    cell: ({ row }) => <div>{row.getValue('last_sign_in_at')}</div>
  },
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => <div>{row.getValue('id')}</div>
  }
];

function formatSubscription(subscription: Unpacked<User['subscriptions']>) {
  const status = formatSubscriptionStatus(subscription.status);
  const endDate = formatDate(subscription.current_period_end);
  const amount = subscription.unit_amount
    ? formatPrice(subscription.unit_amount)
    : '';

  return `${status} do ${endDate}${amount && ` za ${amount}`}`;
}

function formatSubscriptionStatus(
  status: Unpacked<User['subscriptions'][0]['status']>
) {
  switch (status) {
    case 'active':
      return 'Aktívne';
    case 'incomplete':
    case 'past_due':
    case 'unpaid':
      return 'Nezaplatené';
    case 'incomplete_expired':
      return 'Expirované';
    case 'canceled':
      return 'Zrušené';
    default:
      return 'Stav nezistený';
  }
}

function formatDate(date: string) {
  const parsedDate = Date.parse(date);
  return new Intl.DateTimeFormat('sk-SK').format(parsedDate);
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('sk-SK', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0
  }).format(price / 100);
}
