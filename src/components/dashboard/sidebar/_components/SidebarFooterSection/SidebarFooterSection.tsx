'use client';

import { SidebarFooter, SidebarMenu, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

export default function SidebarFooterSection() {
  const { state } = useSidebar();
  const isExpanded = state === 'expanded';

  const time = new Date();

  return (
    <SidebarFooter className={cn('border-border border-t transition-all duration-300')}>
      <SidebarMenu>
        <SidebarMenuItem>
          {isExpanded ? (
            <div className="border-border bg-sidebar-accent/50 rounded-sm border px-3 py-3">
              <p suppressHydrationWarning className="text-sidebar-foreground text-sm font-bold">
                {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
              </p>
              <p suppressHydrationWarning className="text-secondary text-xs font-medium">
                {time.toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex h-7 w-7 items-center justify-center rounded-sm">
                <span className="text-xs font-black">J</span>
              </div>
            </div>
          )}
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
}
