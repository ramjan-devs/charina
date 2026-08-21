import { cn } from '@/lib/utils';
import React from 'react';

interface StatsCardProps {
  label: string;
  value: string | number;
  sub?: string;
  subColorClass?: string;
  icon: React.ElementType;
  iconColor?: string;
  className?: string;
  trendValue?: string;
  trendColorClass?: string;
  trendIcon?: React.ElementType;
}

const StatsCard = ({
  label,
  value,
  sub,
  subColorClass = 'text-muted-foreground',
  icon: Icon,
  iconColor,
  className = '',
  trendValue,
  trendColorClass = 'text-success',
  trendIcon: TrendIcon,
}: StatsCardProps) => {
  // Append '1A' for 10% opacity in hex if iconColor is provided
  const bgWithOpacity = iconColor ? `${iconColor}1A` : undefined;

  return (
    <div
      className={cn(
        'border-border bg-card flex flex-col rounded-xl border p-5 transition-all hover:shadow-xs',
        className,
      )}
    >
      {/* Top Row: Icon and Trend */}
      <div className="flex items-center justify-between">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-full"
          style={iconColor ? { color: iconColor, backgroundColor: bgWithOpacity } : undefined}
        >
          <Icon size={18} className={!iconColor ? 'text-primary' : ''} />
        </div>
        {trendValue && (
          <div className={cn('flex items-center gap-1 text-sm font-semibold', trendColorClass)}>
            {TrendIcon && <TrendIcon size={16} strokeWidth={2.5} />}
            <span>{trendValue}</span>
          </div>
        )}
      </div>

      {/* Bottom Content */}
      <div className="mt-4 flex flex-col gap-1">
        <p className="text-2xl font-bold md:text-3xl">{value}</p>
        <h3 className="text-muted-foreground text-sm">{label}</h3>
        {sub && <p className={cn('mt-1 text-xs', subColorClass)}>{sub}</p>}
      </div>
    </div>
  );
};

export default StatsCard;
