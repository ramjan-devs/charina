/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { userRoutes, roleTypes } from '../../sidebarRoutes';

function SidebarContentSection({ role }: { role: roleTypes }) {
  const pathname = usePathname();
  const { setOpenMobile, isMobile, state } = useSidebar();

  const roleBaseRoutes: Record<roleTypes, any[]> = {
    user: userRoutes,
  };

  const menuGroups = roleBaseRoutes[role] || [];

  return (
    <SidebarContent className={`custom-scrollbar pt-4 ${state === 'expanded' ? 'px-3' : 'px-2'}`}>
      {menuGroups.map((group: any) => (
        <SidebarGroup key={group.group} className="px-0 py-1">
          {state !== 'collapsed' && group.group && (
            <SidebarGroupLabel className="mb-1 px-3 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              {group.group}
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu className="gap-1.5">
              {group.items.map((item: any) => {
                const isActive =
                  pathname === item?.url ||
                  item?.subItems?.some((sub: any) => pathname === sub.url);
                const Icon = item?.icon;

                if (item.subItems) {
                  return (
                    <Collapsible
                      key={item.title}
                      asChild
                      defaultOpen={isActive}
                      className="group/collapsible"
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton
                            tooltip={state === 'collapsed' ? item.title : undefined}
                            className={`rounded-md px-3 py-5 font-medium transition-all duration-200 ${
                              isActive
                                ? 'bg-primary/10 font-semibold text-primary'
                                : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'
                            }`}
                          >
                            {Icon && (
                              <Icon
                                size={18}
                                className={isActive ? 'text-primary' : 'text-muted-foreground'}
                              />
                            )}
                            {state !== 'collapsed' && (
                              <span className={`text-sm ${isActive ? 'text-primary' : ''}`}>
                                {item.title}
                              </span>
                            )}
                            {state !== 'collapsed' && (
                              <ChevronRight
                                className={`ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 ${
                                  isActive ? 'text-primary' : 'text-muted-foreground'
                                }`}
                              />
                            )}
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub className="mr-0 py-1 pr-0">
                            {item.subItems.map((subItem: any) => {
                              const isSubActive = pathname === subItem.url;
                              return (
                                <SidebarMenuSubItem key={subItem.title}>
                                  <SidebarMenuSubButton
                                    asChild
                                    isActive={isSubActive}
                                    className={`rounded-md px-3 py-5 font-medium transition-all duration-200 ${
                                      isSubActive
                                        ? 'bg-primary/10 font-semibold text-primary'
                                        : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'
                                    }`}
                                  >
                                    <Link
                                      href={subItem.url}
                                      onClick={() => isMobile && setOpenMobile(false)}
                                    >
                                      <span
                                        className={`text-sm ${isSubActive ? 'text-primary' : ''}`}
                                      >
                                        {subItem.title}
                                      </span>
                                    </Link>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              );
                            })}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  );
                }

                const isItemActive = pathname === item?.url;
                return (
                  <SidebarMenuItem key={item?.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isItemActive}
                      tooltip={state === 'collapsed' ? item?.title : undefined}
                      className={`rounded-md px-3 py-5 font-medium transition-all duration-200 ${
                        isItemActive
                          ? 'bg-primary/10 font-semibold text-primary'
                          : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'
                      }`}
                    >
                      <Link
                        href={item?.url}
                        onClick={() => isMobile && setOpenMobile(false)}
                        className="flex items-center gap-3"
                      >
                        {Icon && (
                          <Icon
                            size={18}
                            className={isItemActive ? 'text-primary' : 'text-muted-foreground'}
                          />
                        )}
                        {state !== 'collapsed' && (
                          <span className={`text-sm ${isItemActive ? 'text-primary' : ''}`}>
                            {item?.title}
                          </span>
                        )}
                        {/* Deals badge indicator if present */}
                        {state !== 'collapsed' && item.badge && (
                          <div className="bg-primary/20 text-primary ml-auto flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold">
                            {item.badge}
                          </div>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </SidebarContent>
  );
}

export default SidebarContentSection;
