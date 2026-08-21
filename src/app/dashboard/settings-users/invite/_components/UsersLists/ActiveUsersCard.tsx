/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import CustomTable from '@/components/dashboard/CustomTable/CustomTable';
import DynamicBadge from '@/components/dashboard/DynamicBadge/DynamicBadge';
import { Circle } from 'lucide-react';

const activeData = [
  {
    initials: 'MR',
    name: 'Marcus Reed',
    email: 'marcus@finance-tech.io',
    role: 'Admin',
    status: 'Active',
    roleColor: '#10b981'
  },
  {
    initials: 'AF',
    name: 'Alina Fischer',
    email: 'alina.f@finance-tech.io',
    role: 'Editor',
    status: 'Active',
    roleColor: '#3b82f6'
  },
  {
    initials: 'JW',
    name: 'Jordan Wells',
    email: 'j.wells@finance-tech.io',
    role: 'Editor',
    status: 'Active',
    roleColor: '#3b82f6'
  },
];

const columns = [
  {
    header: 'User',
    cell: (row: any) => (
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white" style={{ backgroundColor: row.roleColor }}>
          {row.initials}
        </div>
        <div className="flex flex-col">
          <span className="text-foreground font-medium">{row.name}</span>
          <span className="text-muted-foreground mt-0.5 text-xs">{row.email}</span>
        </div>
      </div>
    ),
  },
  {
    header: 'Role',
    cell: (row: any) => (
      <DynamicBadge text={row.role} color={row.roleColor} size="xs" />
    ),
  },
  {
    header: 'Status',
    cell: (row: any) => (
      <DynamicBadge text={row.status} color="#10b981" icon={Circle} size="xs" />
    ),
  },
  {
    header: 'Action',
    cell: () => (
      <button className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors cursor-pointer">
        Edit
      </button>
    ),
  },
];

export default function ActiveUsersCard() {
  return (
    <div className="bg-card border-border flex flex-col overflow-hidden rounded-xl border">
      <div className="border-border border-b p-5">
        <h3 className="text-base font-semibold">Active Users</h3>
      </div>
      <div className="p-0">
        <CustomTable columns={columns} data={activeData} />
      </div>
    </div>
  );
}
