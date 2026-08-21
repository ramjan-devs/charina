import { Briefcase, LayoutDashboard, Settings, Users } from 'lucide-react';

export type roleTypes = 'user';

export const ROLE_DASHBOARD_PREFIX: Record<roleTypes, string> = {
  user: '/dashboard',
};

export const ROLE_DASHBOARD_HOME: Record<roleTypes, string> = {
  user: '/dashboard/overview',
};

export const userRoutes = [
  {
    group: '',
    items: [
      {
        title: 'Dashboard',
        url: '/dashboard/overview',
        icon: LayoutDashboard,
      },
      {
        title: 'Deals',
        url: '/dashboard/deals',
        icon: Briefcase,
        badge: '5',
      },
      {
        title: 'Leads',
        url: '/dashboard/leads',
        icon: Users,
      },
      {
        title: 'Settings / Users',
        url: '/dashboard/settings-users',
        icon: Settings,
      },
    ],
  },
];
