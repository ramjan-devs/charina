'use client';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { Control, FieldValues, Path, useController } from 'react-hook-form';

interface SelectFieldProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  options: { value: string; label: string }[];
  error?: string;
  control: Control<T>;
  required?: boolean;
  placeholder?: string;
  maxHeight?: string;
  readOnly?: boolean;
}

const SelectField = <T extends FieldValues>({
  label,
  name,
  options,
  error,
  control,
  required,
  maxHeight,
  placeholder = 'Select an option',
  readOnly = false,
}: SelectFieldProps<T>) => {
  const {
    field: { onChange, value },
  } = useController({
    name,
    control,
  });

  return (
    <div className="space-y-2">
      <Label className="block font-medium">
        {label} {required && <span className="text-error">*</span>}
      </Label>

      <Select onValueChange={onChange} value={value || ''} disabled={readOnly}>
        <SelectTrigger
          className={cn(
            'border-border bg-background text-foreground w-full rounded-sm border p-3 py-6 text-sm shadow-none transition-all outline-none',
            'focus:border-primary/50 focus-visible:border-primary/50 focus-visible:ring-primary/20 focus-visible:ring-1 focus-visible:ring-offset-0',
            {
              'bg-muted cursor-default opacity-60': readOnly,
              'border-error/50 focus:border-error focus-visible:border-error focus-visible:ring-error/10':
                error,
            },
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="border-border bg-popover text-popover-foreground border">
          <div style={maxHeight ? { maxHeight, overflowY: 'auto' } : undefined}>
            {options.map((opt) => (
              <SelectItem
                key={opt.value}
                value={opt.value}
                className="focus:bg-muted focus:text-foreground cursor-pointer transition-colors"
              >
                {opt.label}
              </SelectItem>
            ))}
          </div>
        </SelectContent>
      </Select>
      {error && <p className="text-error mt-1 text-xs font-medium">{error}</p>}
    </div>
  );
};

export default SelectField;
