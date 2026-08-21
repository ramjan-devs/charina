'use client';

import DynamicActionButton from '@/components/dashboard/DynamicActionButton/DynamicActionButton';
import SectionHeader from '@/components/dashboard/SectionHeader/SectionHeader';
import { roleTypes } from '@/components/dashboard/sidebar/sidebarRoutes';
import { useDialog } from '@/context/DialogContext';
import { Plus } from 'lucide-react';

interface SchedulingHeaderProps {
  role?: roleTypes | 'superadmin';
}

export default function SchedulingHeader({ role = 'superadmin' }: SchedulingHeaderProps) {
  const { openDialog } = useDialog();
  const isSuperAdmin = role === 'superadmin';

  const handleAddSchedule = () => {
    openDialog({
      view: 'ADD_SCHEDULE',
      title: 'Add Schedule',
      description: 'Add Schedule',
    });
  };

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <SectionHeader title="Scheduling" description="Manage all job from schedule" />

      {isSuperAdmin && (
        <div>
          <DynamicActionButton label="Add Schedule" icon={Plus} onClick={handleAddSchedule} />
        </div>
      )}
    </div>
  );
}
