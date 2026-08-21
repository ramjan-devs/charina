import { Suspense } from 'react';
import LeadsHeader from './_components/LeadsHeader/LeadsHeader';
import LeadsTable from './_components/LeadsTable/LeadsTable';

export default function LeadsPage() {
  return (
    <div className="flex h-full w-full flex-col">
      <div className="mx-auto w-full">
        <LeadsHeader />
        <Suspense fallback={<div className="p-4 text-sm text-muted-foreground">Loading leads...</div>}>
          <LeadsTable />
        </Suspense>
      </div>
    </div>
  );
}
