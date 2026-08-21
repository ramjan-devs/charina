'use client';

import DynamicActionButton from '@/components/dashboard/DynamicActionButton/DynamicActionButton';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import { useEffect, useState } from 'react';

interface WeatherRiskCard {
  id: string;
  jobId: string;
  customerName: string;
  currentDateStr: string;
  recommendedDates: {
    id: string;
    label: string;
    dayIndex: number;
    selected: boolean;
  }[];
  notifyCustomer: boolean;
  notifyCrew: boolean;
}

const initialCardsData: WeatherRiskCard[] = [
  {
    id: 'evt-1',
    jobId: '#256',
    customerName: 'Tim Jone',
    currentDateStr: 'MON 9 AM',
    recommendedDates: [
      { id: 'd1', label: 'TUE 10 (Sunny Day)', dayIndex: 1, selected: false },
      { id: 'd2', label: 'THU 12 (Sunny Day)', dayIndex: 3, selected: true },
    ],
    notifyCustomer: true,
    notifyCrew: true,
  },
  {
    id: 'evt-6',
    jobId: '#258',
    customerName: 'Tim Jone',
    currentDateStr: 'SAT 10 AM',
    recommendedDates: [
      { id: 'd1', label: 'SUN 15 (Sunny Day)', dayIndex: 6, selected: true },
      { id: 'd2', label: 'MON 16 (Sunny Day)', dayIndex: 0, selected: false },
    ],
    notifyCustomer: true,
    notifyCrew: true,
  },
];

export default function WeatherCheckCards() {
  const [cards, setCards] = useState<WeatherRiskCard[]>(initialCardsData);
  const [highlightedCardId] = useState<string | null>(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      return window.location.hash.substring(1);
    }
    return null;
  });

  // Auto-scroll to specific targeted card if hash is present in URL
  useEffect(() => {
    if (highlightedCardId) {
      const el = document.getElementById(highlightedCardId);
      if (el) {
        const timer = setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 150);
        return () => clearTimeout(timer);
      }
    }
  }, [highlightedCardId]);

  const toggleDateSelection = (cardId: string, dateId: string) => {
    setCards((prev) =>
      prev.map((card) => {
        if (card?.id !== cardId) return card;
        return {
          ...card,
          recommendedDates: card?.recommendedDates.map((d) => ({
            ...d,
            selected: d.id === dateId,
          })),
        };
      }),
    );
  };

  const toggleNotify = (cardId: string, type: 'customer' | 'crew') => {
    setCards((prev) =>
      prev.map((card) => {
        if (card?.id !== cardId) return card;
        return {
          ...card,
          notifyCustomer: type === 'customer' ? !card?.notifyCustomer : card?.notifyCustomer,
          notifyCrew: type === 'crew' ? !card?.notifyCrew : card?.notifyCrew,
        };
      }),
    );
  };

  const handleRescheduleSubmit = (card: WeatherRiskCard) => {
    const selectedRec = card?.recommendedDates.find((d) => d.selected);
    if (!selectedRec) return;

    window.dispatchEvent(
      new CustomEvent('RESCHEDULE_WEATHER_JOB', {
        detail: {
          eventId: card?.id,
          newDayIndex: selectedRec.dayIndex,
          newDateLabel: selectedRec.label,
        },
      }),
    );

    setCards((prev) => prev.filter((c) => c.id !== card?.id));
  };

  return (
    <section className="space-y-4">
      {cards.length === 0 ? (
        <div className="border-border bg-card text-secondary rounded-md border p-6 text-center text-sm font-semibold">
          All weather risk jobs have been rescheduled!
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {cards.map((card) => {
            const cardElementId = `weather-card-${card?.id}`;
            const isHighlighted =
              highlightedCardId === cardElementId || highlightedCardId === card?.id;

            return (
              <div
                key={card?.id}
                id={cardElementId}
                className={cn(
                  'border-border bg-card space-y-4 rounded-md border p-5 transition-all duration-300',
                  isHighlighted && 'border-amber-500 shadow-md ring-2 ring-amber-500/30',
                )}
              >
                {/* Header Title */}
                <h3 className="text-primary text-lg font-bold">
                  Weather Risk Detected (Heavy Rain)
                </h3>

                {/* Job Details */}
                <div className="text-secondary space-y-1 text-sm">
                  <p>
                    Job Id <span className="text-primary font-semibold">{card?.jobId}</span> (Roof
                    Repair)
                  </p>
                  <p className="text-primary font-medium">{card?.customerName}</p>
                  <p>
                    Current Date{' '}
                    <span className="text-primary font-semibold">{card?.currentDateStr}</span>
                  </p>
                </div>

                <hr className="border-border" />

                {/* Recommended Dates */}
                <div className="space-y-3">
                  <h4 className="text-primary text-sm font-bold">Recommended Dates (Reschedule)</h4>

                  <div className="space-y-2">
                    {card?.recommendedDates.map((d) => (
                      <label
                        key={d.id}
                        onClick={() => toggleDateSelection(card?.id, d.id)}
                        className="text-secondary hover:text-primary flex cursor-pointer items-center gap-2.5 text-sm font-medium"
                      >
                        <span
                          className={cn(
                            'flex size-4 items-center justify-center rounded border transition-colors',
                            d.selected
                              ? 'border-success bg-success text-white'
                              : 'border-border bg-background',
                          )}
                        >
                          {d.selected && <Check size={12} strokeWidth={3} />}
                        </span>
                        <span>{d.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <hr className="border-border" />

                {/* Notification Checkboxes */}
                <div className="text-secondary flex flex-wrap items-center gap-6 text-sm font-medium">
                  <label
                    onClick={() => toggleNotify(card?.id, 'customer')}
                    className="hover:text-primary flex cursor-pointer items-center gap-2"
                  >
                    <span
                      className={cn(
                        'flex size-4 items-center justify-center rounded border transition-colors',
                        card?.notifyCustomer
                          ? 'border-success bg-success text-white'
                          : 'border-border bg-background',
                      )}
                    >
                      {card?.notifyCustomer && <Check size={12} strokeWidth={3} />}
                    </span>
                    <span>Notify Customer</span>
                  </label>

                  <label
                    onClick={() => toggleNotify(card?.id, 'crew')}
                    className="hover:text-primary flex cursor-pointer items-center gap-2"
                  >
                    <span
                      className={cn(
                        'flex size-4 items-center justify-center rounded border transition-colors',
                        card?.notifyCrew
                          ? 'border-success bg-success text-white'
                          : 'border-border bg-background',
                      )}
                    >
                      {card?.notifyCrew && <Check size={12} strokeWidth={3} />}
                    </span>
                    <span>Notify Crew</span>
                  </label>
                </div>

                {/* Action Button */}
                <div className="pt-2">
                  <DynamicActionButton
                    label="Reschedule"
                    onClick={() => handleRescheduleSubmit(card)}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
