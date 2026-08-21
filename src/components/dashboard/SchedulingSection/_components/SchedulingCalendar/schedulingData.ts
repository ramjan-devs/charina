export interface IScheduleEvent {
  id: string;
  customerName: string;
  amount: string;
  job: string;
  dayIndex: number; // 0: MON, 1: TUE, 2: WED, 3: THU, 4: FRI, 5: SAT, 6: SUN
  startHour: number; // e.g., 1 for 1 AM, 2 for 2 AM...
  endHour: number; // e.g., 3.5 for 3:30 AM
  timeLabel: string;
  status: 'Scheduled' | 'Rescheduled' | 'In Progress';
  statusVariant: 'blue' | 'purple' | 'green' | 'orange';
  weatherRisk?: boolean;
  notes?: string;
}

export const hoursYAxisData = [
  '12 AM',
  '1 AM',
  '2 AM',
  '3 AM',
  '4 AM',
  '5 AM',
  '6 AM',
  '7 AM',
  '8 AM',
  '9 AM',
  '10 AM',
  '11 AM',
];

// Helper to generate dynamic week days for any given baseDate
export const getCurrentWeekDays = (baseDate: Date) => {
  const today = new Date();
  const currentDay = baseDate.getDay(); // 0: Sun, 1: Mon, ..., 6: Sat
  const distanceToMon = currentDay === 0 ? -6 : 1 - currentDay;
  const monday = new Date(baseDate);
  monday.setDate(baseDate.getDate() + distanceToMon);

  const dayNames = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  return dayNames.map((name, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);

    const isToday =
      d.getDate() === today.getDate() &&
      d.getMonth() === today.getMonth() &&
      d.getFullYear() === today.getFullYear();

    return {
      dayName: name,
      dayNumber: d.getDate(),
      fullDate: d,
      isToday,
    };
  });
};

export const scheduleEventsData: IScheduleEvent[] = [
  {
    id: 'evt-1',
    customerName: 'Tim Jone',
    amount: '$5000',
    job: 'Roof Repair',
    dayIndex: 0, // MON
    startHour: 1.2,
    endHour: 3.5,
    timeLabel: '10:30 AM',
    status: 'Scheduled',
    statusVariant: 'blue',
    weatherRisk: true,
    notes: 'For heavy rainfall risk',
  },
  {
    id: 'evt-2',
    customerName: 'Tim Jone',
    amount: '$5000',
    job: 'Roof Repair',
    dayIndex: 0, // MON
    startHour: 5.2,
    endHour: 7.5,
    timeLabel: '10:30 AM',
    status: 'In Progress',
    statusVariant: 'green',
    weatherRisk: false,
  },
  {
    id: 'evt-3',
    customerName: 'Tim Jone',
    amount: '$5000',
    job: 'Roof Repair',
    dayIndex: 1, // TUE
    startHour: 2.2,
    endHour: 4.5,
    timeLabel: '10:30 AM',
    status: 'Rescheduled',
    statusVariant: 'purple',
    weatherRisk: false,
    notes: 'Rescheduled due to client request',
  },
  {
    id: 'evt-4',
    customerName: 'Tim Jone',
    amount: '$5000',
    job: 'Roof Repair',
    dayIndex: 3, // THU
    startHour: 3.2,
    endHour: 5.5,
    timeLabel: '10:30 AM',
    status: 'Rescheduled',
    statusVariant: 'orange',
    weatherRisk: true,
    notes: 'For heavy rainfall',
  },
  {
    id: 'evt-5',
    customerName: 'Tim Jone',
    amount: '$5000',
    job: 'Roof Repair',
    dayIndex: 4, // FRI
    startHour: 4.2,
    endHour: 6.5,
    timeLabel: '10:30 AM',
    status: 'Scheduled',
    statusVariant: 'blue',
    weatherRisk: false,
  },
  {
    id: 'evt-6',
    customerName: 'Tim Jone',
    amount: '$5000',
    job: 'Roof Repair',
    dayIndex: 5, // SAT
    startHour: 6.2,
    endHour: 8.5,
    timeLabel: '10:30 AM',
    status: 'Scheduled',
    statusVariant: 'blue',
    weatherRisk: true,
    notes: 'High wind advisory',
  },
];
