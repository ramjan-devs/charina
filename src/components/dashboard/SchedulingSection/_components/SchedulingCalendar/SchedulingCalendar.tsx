'use client';

import { useDialog } from '@/context/DialogContext';
import { cn } from '@/lib/utils';
import { AlertTriangle, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  getCurrentWeekDays,
  hoursYAxisData,
  IScheduleEvent,
  scheduleEventsData,
} from './schedulingData';

import { roleTypes } from '@/components/dashboard/sidebar/sidebarRoutes';

interface SchedulingCalendarProps {
  role?: roleTypes | 'superadmin';
}

export default function SchedulingCalendar({ role = 'superadmin' }: SchedulingCalendarProps) {
  const router = useRouter();
  const isSuperAdmin = role === 'superadmin';
  const { openDialog } = useDialog();
  const [currentView, setCurrentView] = useState<'Day' | 'Week' | 'Month'>('Week');
  const [currentDate, setCurrentDate] = useState<Date>(() => new Date());
  const [events, setEvents] = useState<IScheduleEvent[]>(scheduleEventsData);
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0);

  // Compute current week days dynamically
  const daysHeaderData = getCurrentWeekDays(currentDate);

  // Listen for new schedule additions & weather job reschedules
  useEffect(() => {
    const handleAddEvent = (e: Event) => {
      const customEvent = e as CustomEvent<IScheduleEvent>;
      if (customEvent.detail) {
        setEvents((prev) => [customEvent.detail, ...prev]);
      }
    };

    const handleRescheduleWeatherJob = (e: Event) => {
      const customEvent = e as CustomEvent<{
        eventId: string;
        newDayIndex: number;
      }>;

      if (customEvent.detail) {
        const { eventId, newDayIndex } = customEvent.detail;
        setEvents((prev) =>
          prev.map((evt) => {
            if (evt.id !== eventId) return evt;
            return {
              ...evt,
              dayIndex: newDayIndex,
              status: 'Rescheduled',
              statusVariant: 'orange',
              weatherRisk: false,
            };
          }),
        );
      }
    };

    window.addEventListener('ADD_SCHEDULE_EVENT', handleAddEvent);
    window.addEventListener('RESCHEDULE_WEATHER_JOB', handleRescheduleWeatherJob);
    return () => {
      window.removeEventListener('ADD_SCHEDULE_EVENT', handleAddEvent);
      window.removeEventListener('RESCHEDULE_WEATHER_JOB', handleRescheduleWeatherJob);
    };
  }, []);

  // Previous & Next navigation
  const handlePrevDate = () => {
    if (currentView === 'Month') {
      setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    } else {
      setCurrentDate((prev) => {
        const next = new Date(prev);
        next.setDate(prev.getDate() - 7);
        return next;
      });
    }
  };

  const handleNextDate = () => {
    if (currentView === 'Month') {
      setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    } else {
      setCurrentDate((prev) => {
        const next = new Date(prev);
        next.setDate(prev.getDate() + 7);
        return next;
      });
    }
  };

  const monthYearString = currentDate.toLocaleString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  const handleCardClick = (event: IScheduleEvent) => {
    if (!isSuperAdmin) {
      openDialog({
        view: 'VIEW_EMPLOYEE_JOB_DETAILS',
        title: 'Job Details',
        description: 'View employee job details',
        data: event,
      });
      return;
    }

    if (event.weatherRisk) {
      router.push(`/dashboard/superadmin/scheduling/weather-intelligence#weather-card-${event.id}`);
      return;
    }

    openDialog({
      view: 'RESCHEDULE_JOB',
      title: 'Reschedule',
      description: 'Reschedule',
      data: {
        customerName: event.customerName,
        amount: event.amount,
        job: event.job,
        date: '2026-07-21',
        assignCrew: 'Jone Khan',
        rescheduleNote: event.notes || 'For heavy rainfall',
      },
    });
  };

  // Month view days calculation
  const daysInMonthCount = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0,
  ).getDate();
  const monthDays: number[] = Array.from({ length: daysInMonthCount }, (_, i) => i + 1);

  return (
    <div className="border-border bg-card space-y-4 rounded-md border p-4">
      {/* Calendar Header Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-2">
        {/* Left: Month Year & Navigation */}
        <div className="flex items-center gap-4">
          <h3 className="text-primary text-xl font-bold">{monthYearString}</h3>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handlePrevDate}
              className="text-secondary hover:text-primary hover:bg-muted cursor-pointer rounded-md p-1.5 transition-colors"
              title="Previous"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={handleNextDate}
              className="text-secondary hover:text-primary hover:bg-muted cursor-pointer rounded-md p-1.5 transition-colors"
              title="Next"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Right: View mode switcher & Search */}
        <div className="flex items-center gap-3">
          <div className="border-border bg-muted/50 flex items-center rounded-md border p-1 text-xs font-semibold">
            {(['Day', 'Week', 'Month'] as const).map((view: 'Day' | 'Week' | 'Month') => (
              <button
                key={view}
                type="button"
                onClick={() => setCurrentView(view)}
                className={cn(
                  'cursor-pointer rounded-xs px-3 py-1.5 transition-all',
                  currentView === view
                    ? 'bg-card text-primary shadow-xs'
                    : 'text-secondary hover:text-primary',
                )}
              >
                {view}
              </button>
            ))}
          </div>

          <button
            type="button"
            className="border-border bg-card text-secondary hover:text-primary hover:bg-muted flex size-9 cursor-pointer items-center justify-center rounded-md border transition-colors"
            title="Search Schedule"
          >
            <Search size={16} />
          </button>
        </div>
      </div>

      {/* VIEW MODE 1: MONTH VIEW */}
      {currentView === 'Month' && (
        <div className="no-scrollbar overflow-x-auto">
          <div className="min-w-212.5">
            {/* Header Days */}
            <div className="border-border text-secondary grid grid-cols-7 border-b text-center text-xs font-bold">
              {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((d: string) => (
                <div key={d} className="border-border border-r p-2.5">
                  {d}
                </div>
              ))}
            </div>

            {/* Grid Days of Current Month */}
            <div className="grid grid-cols-7 border-t border-l">
              {monthDays.map((dayNum: number) => {
                const dayIndex = (dayNum - 1) % 7;
                const dayEvts = events.filter((e) => e.dayIndex === dayIndex);
                const isToday =
                  dayNum === new Date().getDate() &&
                  currentDate.getMonth() === new Date().getMonth() &&
                  currentDate.getFullYear() === new Date().getFullYear();

                return (
                  <div
                    key={dayNum}
                    className={cn(
                      'border-border hover:bg-muted/20 min-h-22.5 border-r border-b p-2 transition-colors',
                      isToday && 'bg-primary/5 font-bold',
                    )}
                  >
                    <span
                      className={cn(
                        'text-xs font-bold',
                        isToday ? 'text-primary underline' : 'text-secondary',
                      )}
                    >
                      {dayNum} {isToday && '(Today)'}
                    </span>
                    <div className="mt-1 space-y-1">
                      {dayEvts.map((evt: IScheduleEvent) => (
                        <div
                          key={evt.id}
                          onClick={() => handleCardClick(evt)}
                          className={cn(
                            'cursor-pointer truncate rounded px-1.5 py-1 text-[10px] font-bold text-white shadow-xs transition-transform hover:scale-[1.02]',
                            evt.statusVariant === 'blue' && 'bg-[#2563eb]',
                            evt.statusVariant === 'green' && 'bg-[#16a34a]',
                            evt.statusVariant === 'purple' && 'bg-[#9333ea]',
                            evt.statusVariant === 'orange' && 'bg-[#ea580c]',
                          )}
                        >
                          {evt.customerName} - {evt.amount}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* VIEW MODE 2 & 3: WEEK VIEW & DAY VIEW */}
      {currentView !== 'Month' && (
        <div className="no-scrollbar overflow-x-auto">
          <div className="min-w-212.5">
            {/* Table Header */}
            <div
              className={cn(
                'border-border grid border-b',
                currentView === 'Week'
                  ? 'grid-cols-[100px_repeat(7,1fr)]'
                  : 'grid-cols-[100px_1fr]',
              )}
            >
              {/* Empty top-left time cell */}
              <div className="border-border border-r p-3"></div>

              {/* Day View Header */}
              {currentView === 'Day' && (
                <div className="border-border border-r bg-[#5b6cf6] p-3 text-center font-bold text-white">
                  <p className="text-[11px] font-semibold tracking-wider uppercase">
                    {daysHeaderData[selectedDayIndex]?.dayName || 'MON'}
                  </p>
                  <p className="text-sm font-extrabold">
                    {daysHeaderData[selectedDayIndex]?.dayNumber}
                  </p>
                </div>
              )}

              {/* Week View Header Columns */}
              {currentView === 'Week' &&
                daysHeaderData.map(
                  (
                    day: { dayName: string; dayNumber: number; fullDate: Date; isToday: boolean },
                    idx: number,
                  ) => {
                    const hasTodayInWeek = daysHeaderData.some((d) => d.isToday);
                    const isHighlighted = hasTodayInWeek ? day.isToday : idx === 0;

                    return (
                      <div
                        key={`${day.dayName}-${day.dayNumber}`}
                        onClick={() => setSelectedDayIndex(idx)}
                        className={cn(
                          'border-border cursor-pointer border-r p-3 text-center transition-colors',
                          isHighlighted
                            ? 'bg-[#5b6cf6] font-bold text-white'
                            : 'text-secondary hover:bg-muted/40',
                        )}
                      >
                        <p className="text-[11px] font-semibold tracking-wider uppercase">
                          {day.dayName}
                        </p>
                        <p className="text-sm font-extrabold">{day.dayNumber}</p>
                      </div>
                    );
                  },
                )}
            </div>

            {/* Table Body Grid */}
            <div
              className={cn(
                'relative grid',
                currentView === 'Week'
                  ? 'grid-cols-[100px_repeat(7,1fr)]'
                  : 'grid-cols-[100px_1fr]',
              )}
            >
              {/* Y-Axis Hours Column */}
              <div className="border-border border-r">
                {hoursYAxisData.map((hour: string) => (
                  <div
                    key={hour}
                    className="border-border text-secondary flex h-16 items-center justify-center border-b px-2 text-xs font-semibold"
                  >
                    {hour}
                  </div>
                ))}
              </div>

              {/* Columns for Days */}
              {(currentView === 'Week' ? [0, 1, 2, 3, 4, 5, 6] : [selectedDayIndex]).map(
                (dayIdx: number) => {
                  const dayEvents = events.filter((e) => e.dayIndex === dayIdx);

                  return (
                    <div key={dayIdx} className="border-border relative border-r">
                      {/* Background hour grid lines */}
                      {hoursYAxisData.map((hour: string) => (
                        <div key={hour} className="border-border h-16 border-b" />
                      ))}

                      {/* Absolute Event Cards */}
                      {dayEvents.map((evt: IScheduleEvent) => {
                        const topOffset = evt.startHour * 64;
                        const cardHeight = (evt.endHour - evt.startHour) * 64;

                        return (
                          <div
                            key={evt.id}
                            onClick={() => handleCardClick(evt)}
                            style={{
                              top: `${topOffset}px`,
                              height: `${cardHeight}px`,
                            }}
                            className={cn(
                              'absolute inset-x-1.5 z-10 cursor-pointer rounded-lg border-l-4 p-2.5 shadow-xs transition-all hover:scale-[1.02] hover:shadow-md',
                              evt.statusVariant === 'blue' &&
                                'border-l-[#2563eb] bg-[#dbeafe] text-[#1e3a8a] dark:bg-blue-950/60 dark:text-blue-200',
                              evt.statusVariant === 'green' &&
                                'border-l-[#16a34a] bg-[#dcfce7] text-[#14532d] dark:bg-emerald-950/60 dark:text-emerald-200',
                              evt.statusVariant === 'purple' &&
                                'border-l-[#9333ea] bg-[#f3e8ff] text-[#581c87] dark:bg-purple-950/60 dark:text-purple-200',
                              evt.statusVariant === 'orange' &&
                                'border-l-[#ea580c] bg-[#ffedd5] text-[#7c2d12] dark:bg-amber-950/60 dark:text-amber-200',
                            )}
                          >
                            <div className="flex h-full flex-col justify-between">
                              <div className="space-y-1">
                                <h4 className="text-sm leading-tight font-bold">
                                  {evt.customerName}
                                </h4>
                                <p className="text-xs font-bold opacity-90">{evt.amount}</p>
                              </div>

                              <div className="space-y-1.5">
                                {/* Status Badge */}
                                <div>
                                  <span
                                    className={cn(
                                      'inline-block rounded-md px-2 py-0.5 text-[10px] font-bold text-white',
                                      evt.statusVariant === 'blue' && 'bg-[#2563eb]',
                                      evt.statusVariant === 'green' && 'bg-[#16a34a]',
                                      evt.statusVariant === 'purple' && 'bg-[#3b82f6]',
                                      evt.statusVariant === 'orange' && 'bg-[#ea580c]',
                                    )}
                                  >
                                    {evt.status}
                                  </span>
                                </div>

                                {/* Weather Risk Badge */}
                                {evt.weatherRisk && (
                                  <div>
                                    <span className="inline-flex items-center gap-1 rounded-md bg-[#f97316] px-2 py-0.5 text-[10px] font-bold text-white">
                                      <AlertTriangle size={11} />
                                      <span>Weather Risk</span>
                                    </span>
                                  </div>
                                )}

                                {/* Time Label */}
                                <p className="text-[11px] font-medium opacity-80">
                                  {evt.timeLabel}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                },
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
