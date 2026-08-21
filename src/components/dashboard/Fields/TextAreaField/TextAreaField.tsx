/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

interface TextAreaFieldProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  placeholder?: string;
  error?: any;
  control: Control<T>;
  required?: boolean;
  readOnly?: boolean;
  rows?: number;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextAreaField = <T extends FieldValues>({
  label,
  name,
  placeholder,
  error,
  control,
  required = false,
  readOnly = false,
  rows,
  value,
  onChange,
}: TextAreaFieldProps<T>) => {
  return (
    <div className="space-y-2">
      <Label className="block font-medium">
        {label} {required && <span className="text-error">*</span>}
      </Label>

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Textarea
            {...field}
            value={value !== undefined ? value : (field.value ?? '')}
            onChange={(e) => {
              field.onChange(e);
              onChange?.(e);
            }}
            placeholder={placeholder}
            readOnly={readOnly}
            rows={rows}
            className={cn(
              'border-border bg-card text-foreground placeholder:text-muted-foreground custom-scrollbar max-h-75 min-h-30 w-full resize-none overflow-y-auto rounded-sm border p-3 text-sm leading-relaxed shadow-none transition-all outline-none',
              'focus-visible:border-primary/50 focus-visible:ring-primary/20 focus-visible:ring-1 focus-visible:ring-offset-0',
              {
                'bg-muted cursor-default opacity-60': readOnly,
                'border-error/50 focus-visible:border-error focus-visible:ring-error/10': error,
              },
            )}
          />
        )}
      />

      {error && <p className="text-error text-xs font-medium">{error}</p>}
    </div>
  );
};

export default TextAreaField;
