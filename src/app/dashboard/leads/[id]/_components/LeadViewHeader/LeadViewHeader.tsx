'use client';

import DynamicActionButton from '@/components/dashboard/DynamicActionButton/DynamicActionButton';
import DynamicBadge from '@/components/dashboard/DynamicBadge/DynamicBadge';
import { ArrowLeft, Circle } from 'lucide-react';
import Link from 'next/link';

export default function LeadViewHeader() {
  return (
    <div className="mb-6 flex flex-col gap-4">
      <Link href="/dashboard/leads" className="text-muted-foreground hover:text-foreground flex w-fit items-center gap-1 text-sm font-medium transition-colors">
        <ArrowLeft size={16} />
        Back to Leads
      </Link>
      
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Redline Auto Parts</h1>
            <DynamicBadge text="New Lead" color="#3b82f6" icon={Circle} size="sm" className="uppercase" />
          </div>
          <p className="text-muted-foreground mt-1 text-sm">Lead ID: L-9042 &bull; Added on Oct 12, 2023</p>
        </div>
        <DynamicActionButton 
          label="Convert to Deal" 
          showIcon={false} 
          className="bg-[#10b981] hover:bg-[#10b981]/90 text-white border-none h-10"
        />
      </div>
    </div>
  );
}
