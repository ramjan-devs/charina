'use client';

import DynamicActionButton from '@/components/dashboard/DynamicActionButton/DynamicActionButton';
import InputField from '@/components/dashboard/Fields/InputField/InputField';
import SelectField from '@/components/dashboard/Fields/SelectField/SelectField';
import { useDialog } from '@/context/DialogContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const scheduleSchema = z.object({
  customerName: z.string().min(1, 'Customer name is required'),
  amount: z.string().min(1, 'Amount is required'),
  job: z.string().min(1, 'Job is required'),
  date: z.string().min(1, 'Date is required'),
  assignCrew: z.string().min(1, 'Assign crew is required'),
});

type ScheduleFormValues = z.infer<typeof scheduleSchema>;

export default function AddScheduleModal() {
  const { data, closeDialog } = useDialog();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ScheduleFormValues>({
    resolver: zodResolver(scheduleSchema),
    defaultValues: {
      customerName: '',
      amount: '',
      job: 'Roof Repair',
      date: data?.date || '2024-12-09',
      assignCrew: 'Jone Khan',
    },
  });

  const onSubmit = (values: ScheduleFormValues) => {
    const eventId = `evt-${values.customerName.toLowerCase().replace(/\s+/g, '-')}-${values.job.toLowerCase().replace(/\s+/g, '-')}`;
    const newEvent = {
      id: eventId,
      customerName: values.customerName,
      amount: values.amount.startsWith('$') ? values.amount : `$${values.amount}`,
      job: values.job,
      dayIndex: data?.dayIndex ?? 0,
      startHour: data?.startHour ?? 2,
      endHour: (data?.startHour ?? 2) + 2.5,
      timeLabel: data?.timeLabel || '10:30 AM',
      status: 'Scheduled' as const,
      statusVariant: 'blue' as const,
      weatherRisk: false,
    };

    // Dispatch event to add to calendar
    window.dispatchEvent(new CustomEvent('ADD_SCHEDULE_EVENT', { detail: newEvent }));
    closeDialog();
  };

  const crewOptions = [
    { label: 'Jone Khan', value: 'Jone Khan' },
    { label: 'Crew A', value: 'Crew A' },
    { label: 'Crew B', value: 'Crew B' },
    { label: 'Crew C', value: 'Crew C' },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <InputField
          label="Customer Name"
          name="customerName"
          control={control}
          placeholder="Enter customer name"
          required
          error={errors.customerName?.message}
        />

        <InputField
          label="Amount"
          name="amount"
          control={control}
          placeholder="Enter amount (e.g. $5000)"
          required
          error={errors.amount?.message}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <InputField
          label="Job"
          name="job"
          control={control}
          placeholder="Roof Repair"
          required
          error={errors.job?.message}
        />

        <InputField
          label="Date"
          name="date"
          type="date"
          control={control}
          placeholder="21 July 2026"
          required
          error={errors.date?.message}
        />
      </div>

      <SelectField
        label="Assign Crew"
        name="assignCrew"
        control={control}
        options={crewOptions}
        placeholder="Select crew"
        required
        error={errors.assignCrew?.message}
      />

      <div className="border-border mt-4 flex items-center justify-center gap-3 border-t pt-4">
        <DynamicActionButton
          type="button"
          label="Cancel"
          variant="outline"
          onClick={closeDialog}
          className="flex-1"
        />
        <DynamicActionButton type="submit" label="Schedule" className="flex-1" />
      </div>
    </form>
  );
}
