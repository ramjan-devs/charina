/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import NavigationBar from '@/components/dashboard/navigationBar/NavigationBar';
import { AppSidebar } from '@/components/dashboard/sidebar/AppSidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

import { ThemeProvider } from '@/providers/theme-provider';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      forcedTheme="dark"
      disableTransitionOnChange
    >
      <SidebarProvider>
        <AppSidebar role="user" />
        <SidebarInset>
          <NavigationBar />
          <main className="bg-background text-foreground h-full w-full overflow-hidden p-4">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  );
};
export default DashboardLayout;
