'use client';

import DynamicActionButton from '@/components/dashboard/DynamicActionButton/DynamicActionButton';
import { Upload } from 'lucide-react';

export default function LeadsHeader() {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">My Leads</h1>
        <p className="text-muted-foreground mt-1 text-sm">10 records - sourced from UCC filings and Meta Ads</p>
      </div>
      <DynamicActionButton 
        label="Import CSV" 
        icon={Upload} 
        showIcon 
        className="bg-[#10b981] hover:bg-[#10b981]/90 text-white border-none h-10"
      />
    </div>
  );
}
