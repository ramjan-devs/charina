'use client';

import { SidebarHeader, useSidebar } from '@/components/ui/sidebar';
import Link from 'next/link';

function SidebarHeaderSection() {
  const { state } = useSidebar();
  const isExpanded = state === 'expanded';

  return (
    <SidebarHeader className="border-border border-b px-4 py-4.5">
      <Link href="/" className="flex items-center gap-3">
        {/* Icon — always visible */}
        <div className="bg-sidebar-primary text-sidebar-primary-foreground flex h-9 w-9 shrink-0 items-center justify-center rounded-sm">
          <span className="text-base font-black">J</span>
        </div>

        {/* Text — only when expanded */}
        {isExpanded && (
          <div className="flex flex-col leading-tight">
            <span className="text-sidebar-foreground text-lg font-black">
              Job<span className="text-info font-black">Core</span>
            </span>
            <span className="text-secondary text-[10px] font-semibold tracking-[0.15em] uppercase">
              Dashboard
            </span>
          </div>
        )}
      </Link>
    </SidebarHeader>
  );
}

export default SidebarHeaderSection;
