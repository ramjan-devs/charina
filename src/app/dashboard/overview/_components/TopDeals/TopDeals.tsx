'use client';

import CustomTable from '@/components/dashboard/CustomTable/CustomTable';
import DynamicBadge from '@/components/dashboard/DynamicBadge/DynamicBadge';
import { Circle } from 'lucide-react';

const dealsData = [
  {
    merchant: 'Golden Fork Hospitality',
    contact: 'Marcus Reed',
    status: 'Funded',
    tier: 'A',
    requested: '$675,000',
  },
  {
    merchant: 'Metro Staffing Partners',
    contact: 'Marcus Reed',
    status: 'Underwriting',
    tier: 'A',
    requested: '$520,000',
  },
  {
    merchant: 'Sunset Dental Group',
    contact: 'Marcus Reed',
    status: 'Approved',
    tier: 'A',
    requested: '$400,000',
  },
  {
    merchant: 'Beacon Home Services',
    contact: 'Marcus Reed',
    status: 'Approved',
    tier: 'B',
    requested: '$310,000',
  },
  {
    merchant: 'Harbor Point Logistics',
    contact: 'Marcus Reed',
    status: 'Underwriting',
    tier: 'B',
    requested: '$250,000',
  },
];

const getStatusColor = (status: string) => {
  if (status === 'Funded') return '#10b981';
  if (status === 'Approved') return '#10b981';
  if (status === 'Underwriting') return '#f59e0b';
  return '#3b82f6';
};

const getTierColor = (tier: string) => {
  if (tier === 'A') return '#10b981';
  if (tier === 'B') return '#8b5cf6';
  return '#3b82f6';
};

const columns = [
  {
    header: 'Merchant',
    cell: (row: any) => (
      <div className="flex flex-col">
        <span className="text-foreground font-medium">{row.merchant}</span>
        <span className="text-muted-foreground text-xs">{row.contact}</span>
      </div>
    ),
  },
  {
    header: 'Status',
    cell: (row: any) => (
      <DynamicBadge 
        text={row.status} 
        color={getStatusColor(row.status)} 
        icon={Circle} 
        size="sm" 
      />
    ),
  },
  {
    header: 'Tier',
    cell: (row: any) => (
      <DynamicBadge 
        text={row.tier} 
        color={getTierColor(row.tier)} 
        size="xs" 
        className="px-2"
      />
    ),
  },
  {
    header: 'Requested',
    cell: (row: any) => <span className="text-foreground font-medium">{row.requested}</span>,
  },
];

export default function TopDeals() {
  return (
    <div className="bg-card border-border flex h-full flex-col overflow-hidden rounded-xl border">
      <div className="flex items-center justify-between p-5 pb-3">
        <h3 className="text-base font-semibold">Top deals by requested amount</h3>
        <button className="text-muted-foreground hover:text-foreground text-xs font-medium transition-colors">
          View all
        </button>
      </div>
      <div className="flex-1">
        <CustomTable columns={columns} data={dealsData} />
      </div>
    </div>
  );
}
