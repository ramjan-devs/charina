'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, LogOut, User as UserIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function UserDropdown() {
  const router = useRouter();

  const handleLogout = () => {
    router.push('/login');
  };

  const userName = 'Smith Landscape llc';
  // const userRole = 'Super Admin';
  const userAvatar = '';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="hover:bg-muted group flex cursor-pointer items-center gap-2.5 rounded-sm border-transparent bg-transparent px-3 py-2 transition-all outline-none">
          <Avatar className="h-9 w-9">
            <AvatarImage src={userAvatar} />
            <AvatarFallback className="bg-primary text-primary-foreground text-xs font-black">
              {userName.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="hidden flex-col items-start md:flex">
            <span className="text-primary text-sm leading-none font-bold">{userName}</span>
            {/* <span className="text-secondary mt-1 text-[11px] font-medium">{userRole}</span> */}
          </div>
          <ChevronDown
            size={14}
            className="text-secondary ml-1 hidden transition-transform group-data-[state=open]:rotate-180 md:block"
          />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="border-border/60 bg-popover text-popover-foreground w-56 rounded-md border shadow-md"
        align="end"
        sideOffset={8}
      >
        <DropdownMenuGroup className="space-y-0.5 py-1">
          <DropdownMenuItem className="text-secondary hover:text-primary hover:bg-muted focus:bg-muted flex cursor-pointer items-center gap-3 rounded-sm px-3 py-2.5 text-sm font-medium transition-all outline-none">
            <UserIcon size={15} className="text-secondary" />
            Profile Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="bg-border/60" />

        <DropdownMenuItem
          onClick={handleLogout}
          className="text-error hover:bg-error/10 hover:text-error focus:bg-error/10 focus:text-error flex cursor-pointer items-center gap-3 rounded-sm px-3 py-2.5 text-sm font-semibold transition-all outline-none"
        >
          <LogOut size={15} className="text-error" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
