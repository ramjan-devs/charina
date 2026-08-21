'use client';

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { name: 'New Lead', value: 195, count: 2, color: '#3b82f6' },
  { name: 'Underwrit', value: 955, count: 3, color: '#f59e0b' },
  { name: 'Approved', value: 710, count: 2, color: '#10b981' },
  { name: 'Funded', value: 820, count: 2, color: '#2dd4bf' },
  { name: 'Declined', value: 90, count: 1, color: '#ef4444' },
];

export default function PipelineBreakdown() {
  return (
    <div className="bg-card border-border flex h-full min-h-[350px] flex-col rounded-xl border p-5">
      <div className="mb-2">
        <h3 className="text-base font-semibold">Pipeline Breakdown</h3>
        <p className="text-muted-foreground text-xs">Requested amount by status</p>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-6 xl:flex-row">
        {/* Chart */}
        <div className="relative h-[160px] w-[160px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={75}
                paddingAngle={2}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#131826', borderColor: '#1e2536', borderRadius: '8px', color: '#fff' }}
                itemStyle={{ color: '#fff' }}
                formatter={(value: any) => `$${value}K`}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-muted-foreground text-[10px] font-semibold tracking-widest uppercase">Total</span>
            <span className="text-lg font-bold">$2.8M</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-3">
          {data.map((item, i) => (
            <div key={i} className="flex items-center justify-between gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }}></span>
                <span className="text-muted-foreground">{item.name}</span>
                <span className="text-muted-foreground text-xs">{item.count}</span>
              </div>
              <span className="font-medium">${item.value}K</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
