'use client';

import DynamicActionButton from '@/components/dashboard/DynamicActionButton/DynamicActionButton';
import InputField from '@/components/dashboard/Fields/InputField/InputField';
import SelectField from '@/components/dashboard/Fields/SelectField/SelectField';
import TextAreaField from '@/components/dashboard/Fields/TextAreaField/TextAreaField';
import { useDialog } from '@/context/DialogContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const rescheduleSchema = z.object({
  customerName: z.string().min(1, 'Customer name is required'),
  amount: z.string().min(1, 'Amount is required'),
  job: z.string().min(1, 'Job is required'),
  date: z.string().min(1, 'Date is required'),
  assignCrew: z.string().min(1, 'Assign crew is required'),
  rescheduleNote: z.string().optional(),
});

type RescheduleFormValues = z.infer<typeof rescheduleSchema>;

export default function RescheduleModal() {
  const { data, closeDialog } = useDialog();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RescheduleFormValues>({
    resolver: zodResolver(rescheduleSchema),
    defaultValues: {
      customerName: data?.customerName || 'Tim Jone',
      amount: data?.amount || '$5000',
      job: data?.job || 'Roof Repair',
      date: data?.date || '2026-07-21',
      assignCrew: data?.assignCrew || 'Jone Khan',
      rescheduleNote: data?.rescheduleNote || 'For heavy rainfall',
    },
  });

  const onSubmit = () => {
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
          placeholder="Enter amount"
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

      <TextAreaField
        label="Reschedule Note"
        name="rescheduleNote"
        control={control}
        placeholder="For heavy rainfall"
        rows={3}
      />

      <div className="border-border mt-4 flex items-center justify-center gap-3 border-t pt-4">
        <DynamicActionButton
          type="button"
          label="Cancel"
          variant="outline"
          onClick={closeDialog}
          className="flex-1"
        />
        <DynamicActionButton type="submit" label="Reschedule" className="flex-1" />
      </div>
    </form>
  );
}
