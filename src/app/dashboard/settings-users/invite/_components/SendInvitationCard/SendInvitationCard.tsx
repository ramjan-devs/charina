/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import DynamicActionButton from '@/components/dashboard/DynamicActionButton/DynamicActionButton';
import InputField from '@/components/dashboard/Fields/InputField/InputField';
import SelectField from '@/components/dashboard/Fields/SelectField/SelectField';

import { useForm } from 'react-hook-form';

export default function SendInvitationCard() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      role: 'Editor',
    }
  });

  const roleOptions = [
    { label: 'Editor', value: 'Editor' },
    { label: 'Admin', value: 'Admin' },
    { label: 'Viewer', value: 'Viewer' },
  ];

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="bg-card border-border mb-6 flex flex-col rounded-xl border">
      <div className="border-border border-b p-5">
        <h3 className="text-base font-semibold">Send an Invitation</h3>
      </div>
      
      <div className="p-5">
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Left Column */}
          <div className="flex flex-col gap-5">
            <InputField
              label="Email Address"
              name="email"
              type="email"
              placeholder="example@company.com"
              control={control}
              error={errors.email?.message}
              required
            />
            <SelectField
              label="Assign Role"
              name="role"
              options={roleOptions}
              control={control}
              error={errors.role?.message as string}
              required
            />
          </div>
          
          {/* Right Column - Custom Permissions */}
          <div className="flex flex-col gap-4">
            <span className="text-muted-foreground text-sm font-medium">Custom Permissions</span>
            
            <div className="flex flex-col gap-3">
              <label className="flex cursor-pointer items-center gap-3">
                <input type="checkbox" defaultChecked className="border-border bg-input text-primary focus:ring-primary focus:ring-offset-background h-4 w-4 rounded" />
                <span className="text-foreground text-sm">View sensitive deal data</span>
              </label>
              
              <label className="flex cursor-pointer items-center gap-3">
                <input type="checkbox" defaultChecked className="border-border bg-input text-primary focus:ring-primary focus:ring-offset-background h-4 w-4 rounded" />
                <span className="text-foreground text-sm">Edit merchant details</span>
              </label>
              
              <label className="flex cursor-pointer items-center gap-3 opacity-60">
                <input type="checkbox" className="border-border bg-input text-primary focus:ring-primary focus:ring-offset-background h-4 w-4 rounded" />
                <span className="text-foreground text-sm">Approve capital deployment</span>
              </label>
              
              <label className="flex cursor-pointer items-center gap-3 opacity-60">
                <input type="checkbox" className="border-border bg-input text-primary focus:ring-primary focus:ring-offset-background h-4 w-4 rounded" />
                <span className="text-foreground text-sm">Export workspace logs</span>
              </label>
            </div>
          </div>
          
          <div className="col-span-1 flex justify-end md:col-span-2">
            <DynamicActionButton 
              type="submit"
              label="Send Invitation"
              showIcon={false}
              className="bg-[#8b5cf6] hover:bg-[#8b5cf6]/90 h-10 border-none px-6 text-white"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
