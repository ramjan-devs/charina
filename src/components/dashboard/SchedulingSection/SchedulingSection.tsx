'use client';

import { roleTypes } from '@/components/dashboard/sidebar/sidebarRoutes';
import { useRouter } from 'next/navigation';
import { Suspense } from 'react';
import SchedulingCalendar from './_components/SchedulingCalendar/SchedulingCalendar';
import SchedulingHeader from './_components/SchedulingHeader/SchedulingHeader';
import WeatherBanner from './_components/WeatherBanner/WeatherBanner';

interface SchedulingSectionProps {
  role?: roleTypes | 'superadmin';
}

export default function SchedulingSection({ role = 'superadmin' }: SchedulingSectionProps) {
  const router = useRouter();
  const isSuperAdmin = role === 'superadmin';

  const handleReviewSchedule = () => {
    router.push('/dashboard/superadmin/scheduling/weather-intelligence');
  };

  return (
    <section className="space-y-6">
      {/* Scheduling Page Header */}
      <SchedulingHeader role={role} />

      {/* Weather Hero Banner - Only for SuperAdmin */}
      {isSuperAdmin && <WeatherBanner onReviewSchedule={handleReviewSchedule} />}

      {/* Scheduling Calendar */}
      <Suspense fallback={<div>Loading calendar...</div>}>
        <SchedulingCalendar role={role} />
      </Suspense>
    </section>
  );
}
