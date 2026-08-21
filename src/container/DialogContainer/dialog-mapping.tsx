'use client';

import AddScheduleModal from '@/components/dashboard/SchedulingSection/_components/AddScheduleModal/AddScheduleModal';
import RescheduleModal from '@/components/dashboard/SchedulingSection/_components/RescheduleModal/RescheduleModal';
import { TDialogView } from '@/types/dialog.types';

export const DIALOG_COMPONENTS: Record<TDialogView, React.ReactNode> = {
  NONE: null,
  ADD_SCHEDULE: <AddScheduleModal />,
  RESCHEDULE_JOB: <RescheduleModal />,
  VIEW_EMPLOYEE_JOB_DETAILS: null,
};
