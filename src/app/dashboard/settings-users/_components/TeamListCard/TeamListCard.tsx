'use client';

import DynamicActionButton from '@/components/dashboard/DynamicActionButton/DynamicActionButton';
import DynamicBadge from '@/components/dashboard/DynamicBadge/DynamicBadge';
import { Circle } from 'lucide-react';

const teamMembers = [
  {
    initials: 'EV',
    name: 'Elena Vasquez',
    email: 'elena@fondosinc.com',
    desk: 'Executive',
    role: 'Admin / Manager',
    status: 'Active',
  },
  {
    initials: 'MR',
    name: 'Marcus Reed',
    email: 'marcus@fondosinc.com',
    desk: 'Desk A',
    role: 'Sales Agent',
    status: 'Active',
  },
  {
    initials: 'AF',
    name: 'Alina Fischer',
    email: 'alina@fondosinc.com',
    desk: 'Desk A',
    role: 'Sales Agent',
    status: 'Active',
  },
  {
    initials: 'JW',
    name: 'Jordan Wells',
    email: 'jordan@fondosinc.com',
    desk: 'Desk B',
    role: 'Sales Agent',
    status: 'Suspended',
  },
  {
    initials: 'PS',
    name: 'Priyanka Shah',
    email: 'priyanka@fondosinc.com',
    desk: 'Credit',
    role: 'Underwriter',
    status: 'Active',
  },
];

export default function TeamListCard() {
  return (
    <div className="bg-card border-border flex h-full flex-col rounded-xl border">
      <div className="border-border flex items-center justify-between border-b p-5">
        <div className="flex flex-col">
          <h3 className="text-base font-semibold">Team</h3>
          <p className="text-muted-foreground text-xs">5 seats - 4 active</p>
        </div>
        <DynamicActionButton 
          href="/dashboard/settings-users/invite"
          label="Invite user" 
          showIcon={false}
          className="bg-[#10b981] hover:bg-[#10b981]/90 text-white border-none h-8 px-4"
        />
      </div>
      
      <div className="flex flex-col">
        {teamMembers.map((member, index) => (
          <div key={index} className="border-border flex items-center justify-between border-b p-4 last:border-0 hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="bg-primary/20 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold">
                {member.initials}
              </div>
              <div className="flex flex-col">
                <span className="text-foreground font-medium">{member.name}</span>
                <span className="text-muted-foreground text-xs">{member.email}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-6 text-sm">
              <span className="text-muted-foreground hidden sm:block">{member.desk}</span>
              <span className="text-muted-foreground hidden sm:block">{member.role}</span>
              <div className="w-24 text-right">
                <DynamicBadge 
                  text={member.status} 
                  color={member.status === 'Active' ? '#10b981' : '#64748b'} 
                  icon={Circle} 
                  size="xs" 
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
