/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import CustomTable from '@/components/dashboard/CustomTable/CustomTable';
import DynamicBadge from '@/components/dashboard/DynamicBadge/DynamicBadge';
import DynamicTableFilterBar from '@/components/dashboard/DynamicTableFilterBar/DynamicTableFilterBar';
import { ITableFilter } from '@/types/table-filter.types';
import { Circle, Eye, Mail, Phone } from 'lucide-react';
import Link from 'next/link';

const leadsData = [
  {
    id: 'L-9042',
    company: 'Redline Auto Parts',
    owner: 'Victor Salas',
    email: 'vsalas@redlineparts.com',
    phone: '(714) 220-9911',
    source: 'UCC',
    assigned: 'Marcus Reed',
    status: 'New Lead',
  },
  {
    id: 'L-9038',
    company: 'Peak Fitness Studios',
    owner: 'Nina Coleman',
    email: 'nina@peakfitstudios.com',
    phone: '(858) 441-2287',
    source: 'Meta Ads',
    assigned: 'Alina Fischer',
    status: 'Underwriting',
  },
  {
    id: 'L-9031',
    company: 'Brightline Electric',
    owner: 'Omar Haddad',
    email: 'omar@brightlineelectric.net',
    phone: '(617) 559-3320',
    source: 'UCC',
    assigned: 'Marcus Reed',
    status: 'New Lead',
  },
  {
    id: 'L-9027',
    company: 'Coastal Seafood Co.',
    owner: 'Lena Petrova',
    email: 'lena@coastalseafood.co',
    phone: '(910) 664-1178',
    source: 'Meta Ads',
    assigned: 'Jordan Wells',
    status: 'Approved',
  },
  {
    id: 'L-9019',
    company: 'Titan Roofing Group',
    owner: 'Chris Bello',
    email: 'chris@titanroofing.us',
    phone: '(407) 993-4402',
    source: 'UCC',
    assigned: 'Alina Fischer',
    status: 'Declined',
  },
  {
    id: 'L-9012',
    company: 'Verde Organics',
    owner: 'Sofia Marín',
    email: 'sofia@verdeorganics.com',
    phone: '(505) 220-8890',
    source: 'Meta Ads',
    assigned: 'Marcus Reed',
    status: 'Funded',
  },
];

const getStatusColor = (status: string) => {
  if (status === 'Approved' || status === 'Funded') return '#10b981'; // Green
  if (status === 'Underwriting') return '#f59e0b'; // Yellow
  if (status === 'Declined') return '#ef4444'; // Red
  return '#3b82f6'; // Blue
};

const getSourceColor = (source: string) => {
  if (source === 'UCC') return '#8b5cf6'; // Purple
  if (source === 'Meta Ads') return '#3b82f6'; // Blue
  return '#64748b'; // Gray
};

const columns = [
  {
    header: 'Company Name',
    cell: (row: any) => (
      <div className="flex flex-col">
        <span className="text-foreground font-semibold">{row.company}</span>
        <span className="text-muted-foreground text-xs">{row.id}</span>
      </div>
    ),
  },
  {
    header: 'Owner Name',
    cell: (row: any) => <span className="text-foreground font-medium">{row.owner}</span>,
  },
  {
    header: 'Contact',
    cell: (row: any) => (
      <div className="flex flex-col gap-1 text-xs">
        <div className="text-white flex items-center gap-1.5">
          <Mail size={12} />
          <span>{row.email}</span>
        </div>
        <div className="text-muted-foreground flex items-center gap-1.5">
          <Phone size={12} />
          <span>{row.phone}</span>
        </div>
      </div>
    ),
  },
  {
    header: 'Source',
    cell: (row: any) => (
      <DynamicBadge text={row.source} color={getSourceColor(row.source)} size="xs" className="px-2" />
    ),
  },
  {
    header: 'Assigned To',
    cell: (row: any) => <span className="text-foreground">{row.assigned}</span>,
  },
  {
    header: 'Status',
    cell: (row: any) => (
      <DynamicBadge text={row.status} color={getStatusColor(row.status)} icon={Circle} size="xs" />
    ),
  },
  {
    header: 'Action',
    cell: (row: any) => (
      <Link 
        href={`/dashboard/leads/${row.id}`}
        className="bg-accent/50 text-foreground hover:bg-accent flex w-fit items-center gap-2 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors"
      >
        <Eye size={14} />
        View
      </Link>
    ),
  },
];

const filters: ITableFilter[] = [
  {
    name: 'search',
    type: 'search',
    placeholder: 'Search company, owner or email',
  },
  {
    name: 'source',
    type: 'select',
    placeholder: 'All Sources',
    options: [
      { label: 'All Sources', value: 'all' },
      { label: 'UCC', value: 'ucc' },
      { label: 'Meta Ads', value: 'meta' },
    ],
  },
];

export default function LeadsTable() {
  return (
    <div className="bg-card border-border flex flex-col rounded-xl border">
      <div className="border-border border-b p-4">
        {/* We use standard flex utility to reverse the order since the original DynamicTableFilterBar puts search on the right */}
        <div className="[&>div]:flex-col-reverse [&>div]:lg:flex-row-reverse">
          <DynamicTableFilterBar fields={filters} />
        </div>
      </div>
      <div className="p-0">
        <CustomTable columns={columns} data={leadsData} />
      </div>
    </div>
  );
}
