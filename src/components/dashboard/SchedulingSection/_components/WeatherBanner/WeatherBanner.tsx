'use client';

import WeatherBg from '@/assets/Weather.jpg';
import DynamicActionButton from '@/components/dashboard/DynamicActionButton/DynamicActionButton';
import DynamicBadge from '@/components/dashboard/DynamicBadge/DynamicBadge';
import { AlertTriangle } from 'lucide-react';
import Image from 'next/image';

interface WeatherBannerProps {
  onReviewSchedule?: () => void;
}

export default function WeatherBanner({ onReviewSchedule }: WeatherBannerProps) {
  return (
    <div className="relative flex min-h-75 items-center justify-center overflow-hidden rounded-md border border-sky-200 p-8 shadow-sm transition-all dark:border-sky-900/50">
      <Image
        src={WeatherBg}
        alt="Weather Background"
        fill
        priority
        className="object-cover object-center"
      />

      {/* Subtle overlay for text contrast */}
      <div className="absolute inset-0 bg-white/10 dark:bg-black/40" />

      <div className="relative z-10 flex flex-col items-center justify-center space-y-4 text-center">
        {/* Weather Conflict Badge */}
        <DynamicBadge text="3 Weather Conflict" icon={AlertTriangle} color="#ea580c" size="sm" />

        {/* Main Headline */}
        <h2 className="max-w-2xl text-xl font-extrabold drop-shadow-xs sm:text-2xl dark:text-white">
          Heavy rain expected tomorrow. 3 scheduled jobs are affected.
        </h2>

        <DynamicActionButton label="Review Schedule" onClick={onReviewSchedule} />
      </div>
    </div>
  );
}
