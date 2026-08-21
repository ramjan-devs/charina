'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Loader2, LucideIcon, Plus } from 'lucide-react';
import Link from 'next/link';

interface DynamicButtonProps {
  type?: 'submit' | 'button';
  label?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: 'default' | 'outline' | 'danger' | 'secondary';
  disabled?: boolean;
  isLoading?: boolean;
  icon?: LucideIcon | null;
  showIcon?: boolean;
  target?: string;
}

const DynamicActionButton = ({
  type = 'button',
  label,
  href,
  onClick,
  className,
  variant = 'default',
  disabled = false,
  isLoading = false,
  icon: Icon = Plus,
  showIcon = false,
  target,
}: DynamicButtonProps) => {
  const variantStyles = {
    default: 'bg-brand text-white hover:bg-primary/90',
    outline: 'bg-transparent border-border text-primary hover:bg-muted',
    danger: 'bg-destructive text-destructive-foreground border-destructive hover:bg-destructive/90',
    secondary: 'bg-muted text-primary border-border hover:bg-muted/80',
  };

  const combinedClasses = cn(
    'group relative h-10 text-xs w-fit cursor-pointer sm:text-base transition-all duration-300 border px-8 active:scale-95 flex items-center justify-center gap-2 font-semibold overflow-hidden rounded-md',
    variantStyles[variant],
    className,
  );

  const buttonContent = (
    <>
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        showIcon && Icon && <Icon size={18} strokeWidth={2.5} />
      )}
      {label && <span className="relative z-10 text-sm">{label}</span>}
    </>
  );

  if (href && !disabled) {
    return (
      <Button asChild className={combinedClasses}>
        <Link
          href={href}
          className="flex items-center"
          target={target}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
        >
          {buttonContent}
        </Link>
      </Button>
    );
  }

  return (
    <Button
      type={type}
      onClick={onClick}
      className={combinedClasses}
      disabled={disabled || isLoading}
    >
      {buttonContent}
    </Button>
  );
};

export default DynamicActionButton;
