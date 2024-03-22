'use client';

import { ComponentProps } from 'react';
import { DataTable } from './DataTable';
import { columns } from './columns';

function getRowColor(rowOriginal) {
  // if
  if (
    !rowOriginal.subscriptions.find(
      (subscription) => subscription.status === 'active'
    )
  ) {
    return 'bg-red-900';
  }

  return '';
}

export function UsersTable({
  data
}: {
  data: ComponentProps<typeof DataTable>['data'];
}) {
  return (
    <DataTable data={data} columns={columns} getRowClassName={getRowColor} />
  );
}
