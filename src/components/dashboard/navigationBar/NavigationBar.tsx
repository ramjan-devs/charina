'use client';

import { SidebarTrigger } from '@/components/ui/sidebar';
import RightSection from './_components/RightSection/RightSection';
import { Search } from 'lucide-react';

export default function NavigationBar() {
  return (
    <header className="border-border bg-card sticky top-0 z-50 flex w-full shrink-0 items-center border-b px-4 py-3 lg:px-6">
      <div className="flex w-full items-center justify-between gap-4">
        {/* Left */}
        <div className="flex flex-1 items-center gap-4">
          <SidebarTrigger className="text-muted-foreground hover:text-foreground hover:bg-muted border-border h-9 w-9 cursor-pointer rounded-sm border transition-colors" />
          
          <div className="relative hidden w-full max-w-md lg:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <input
              type="text"
              placeholder="Search merchants, deals, leads..."
              className="border-border bg-background text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20 h-10 w-full rounded-md border pl-10 pr-4 text-sm transition-all focus:outline-none focus:ring-1"
            />
          </div>
        </div>

        {/* Right */}
        <RightSection />
      </div>
    </header>
  );
}
