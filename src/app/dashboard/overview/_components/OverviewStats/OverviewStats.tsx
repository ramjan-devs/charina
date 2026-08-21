import { TrendingUp } from 'lucide-react';

const stats = [
  {
    label: 'Total Capital Deployed',
    value: '$5.1M',
    trend: '+12.4%',
    trendText: 'vs. last quarter',
    trendColor: 'text-success bg-success/10',
  },
  {
    label: 'Pipeline Value',
    value: '$1.9M',
    trend: '+8.1%',
    trendText: '10 files in book',
    trendColor: 'text-success bg-success/10',
  },
  {
    label: 'Deals Closed',
    value: '2',
    trend: '+16.7%',
    trendText: 'funded this month',
    trendColor: 'text-success bg-success/10',
  },
  {
    label: 'Active Deals',
    value: '5',
    trend: '+4.2%',
    trendText: 'in underwriting or approved',
    trendColor: 'text-success bg-success/10',
  },
];

export default function OverviewStats() {
  return (
    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, i) => (
        <div key={i} className="bg-card border-border flex flex-col justify-between rounded-xl border p-5 transition-all hover:shadow-sm">
          <div className="flex flex-col gap-1">
            <p className="text-muted-foreground text-xs md:text-sm">{stat.label}</p>
            <h3 className="text-2xl font-bold md:text-3xl">{stat.value}</h3>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <div className={`flex items-center gap-1 rounded px-1.5 py-0.5 text-[11px] font-semibold ${stat.trendColor}`}>
              <TrendingUp size={12} strokeWidth={3} />
              {stat.trend}
            </div>
            <span className="text-muted-foreground text-xs">{stat.trendText}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
