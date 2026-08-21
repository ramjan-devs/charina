import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function OverviewHeader() {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Company overview</h1>
        <p className="text-muted-foreground mt-1 text-sm">All desks, all funding routes — August 2026.</p>
      </div>
      <Link href="/dashboard/deals" className="text-muted-foreground hover:text-foreground flex items-center gap-1 text-sm font-medium transition-colors">
        Go to pipeline
        <ArrowRight size={16} />
      </Link>
    </div>
  );
}
