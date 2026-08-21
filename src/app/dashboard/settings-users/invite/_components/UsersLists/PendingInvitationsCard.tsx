/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import CustomTable from '@/components/dashboard/CustomTable/CustomTable';
import DynamicBadge from '@/components/dashboard/DynamicBadge/DynamicBadge';
import { Circle } from 'lucide-react';

const pendingData = [
  {
    user: 'sarah.jones@example.com',
    subtitle: 'Sent 2 hours ago',
    role: 'Viewer',
    status: 'Pending',
  }
];

const columns = [
  {
    header: 'User',
    cell: (row: any) => (
      <div className="flex flex-col">
        <span className="text-foreground font-medium">{row.user}</span>
        <span className="text-muted-foreground mt-0.5 text-xs">{row.subtitle}</span>
      </div>
    ),
  },
  {
    header: 'Role',
    cell: (row: any) => (
      <DynamicBadge text={row.role} color="#475569" size="xs" />
    ),
  },
  {
    header: 'Status',
    cell: (row: any) => (
      <DynamicBadge text={row.status} color="#f59e0b" icon={Circle} size="xs" />
    ),
  },
  {
    header: 'Action',
    cell: () => (
      <button className="text-[#ef4444] hover:text-[#ef4444]/80 text-sm font-medium transition-colors cursor-pointer">
        Revoke
      </button>
    ),
  },
];

export default function PendingInvitationsCard() {
  return (
    <div className="bg-card border-border mb-6 flex flex-col overflow-hidden rounded-xl border">
      <div className="border-border border-b p-5">
        <h3 className="text-base font-semibold">Pending Invitations</h3>
      </div>
      <div className="p-0">
        <CustomTable columns={columns} data={pendingData} />
      </div>
    </div>
  );
}
