/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Eye, EyeOff } from 'lucide-react';
import { useCallback, useRef, useState } from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';

interface InputFieldProps<T extends FieldValues> {
  label?: string;
  name: Path<T>;
  control: Control<T>;
  type?: string;
  placeholder?: string;
  error?: any;
  required?: boolean;
  readOnly?: boolean;
  className?: string;
}

const InputField = <T extends FieldValues>({
  label,
  name,
  control,
  type = 'text',
  placeholder,
  error,
  required = false,
  readOnly = false,
  className = '',
}: InputFieldProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const {
    field: { onChange, onBlur, value, ref: controllerRef },
  } = useController({
    name,
    control,
  });

  const isPassword = type === 'password';
  const isDate = type === 'date';
  const isTime = type === 'time';
  const isPickerField = isDate || isTime;
  const inputType = isPassword && showPassword ? 'text' : type;

  const handleRef = useCallback(
    (e: HTMLInputElement | null) => {
      controllerRef(e);
      inputRef.current = e;
    },
    [controllerRef],
  );

  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <Label className="block font-medium">
          {label} {required && <span className="text-error">*</span>}
        </Label>
      )}

      <div className="relative">
        <Input
          type={inputType}
          placeholder={placeholder}
          readOnly={readOnly}
          onChange={onChange}
          onBlur={onBlur}
          value={value ?? ''}
          ref={handleRef}
          onClick={() => !readOnly && isPickerField && inputRef.current?.showPicker()}
          className={cn(
            'h-auto w-full resize-none rounded-sm p-3 shadow-none transition-all',
            'border-border bg-background text-foreground placeholder:text-muted-foreground border',
            'focus-visible:border-primary/50 focus-visible:ring-primary/20 focus-visible:ring-1',
            `${isPickerField ? 'cursor-pointer' : ''}`,
            {
              'bg-muted cursor-default opacity-60': readOnly,
              'border-error/50 focus-visible:border-error focus-visible:ring-error/10': error,
              'pr-10': isPassword,
            },
          )}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer transition-colors focus:outline-none"
            tabIndex={-1}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <Eye className="size-5" /> : <EyeOff className="size-5" />}
          </button>
        )}
      </div>
      {error && <p className="text-error text-xs font-medium">{error}</p>}
    </div>
  );
};

export default InputField;
