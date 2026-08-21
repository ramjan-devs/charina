'use client';

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const data = [
  { name: 'Feb', submitted: 3.2, funded: 1.4 },
  { name: 'Mar', submitted: 4.1, funded: 1.9 },
  { name: 'Apr', submitted: 3.8, funded: 2.2 },
  { name: 'May', submitted: 5.2, funded: 2.8 },
  { name: 'Jun', submitted: 6.1, funded: 3.5 },
  { name: 'Jul', submitted: 5.5, funded: 4.1 },
  { name: 'Aug', submitted: 7.2, funded: 4.6 },
];

export default function DealFlowTrend() {
  return (
    <div className="bg-card border-border flex h-full min-h-[350px] flex-col rounded-xl border p-5">
      <div className="mb-6">
        <h3 className="text-base font-semibold">Deal Flow Trend</h3>
        <p className="text-muted-foreground text-xs">Submitted vs. funded volume, last 7 months</p>
      </div>
      
      <div className="h-[250px] w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorSubmitted" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorFunded" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2dd4bf" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#2dd4bf" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#8b95a5' }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#8b95a5' }} tickFormatter={(value) => `$${value}M`} />
            <Tooltip
              contentStyle={{ backgroundColor: '#131826', borderColor: '#1e2536', borderRadius: '8px', color: '#fff' }}
              itemStyle={{ color: '#fff' }}
            />
            <Area type="monotone" dataKey="submitted" stroke="#8b5cf6" strokeWidth={2} fillOpacity={1} fill="url(#colorSubmitted)" />
            <Area type="monotone" dataKey="funded" stroke="#2dd4bf" strokeWidth={2} fillOpacity={1} fill="url(#colorFunded)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex items-center justify-center gap-6">
        <div className="text-muted-foreground flex items-center gap-2 text-xs">
          <span className="h-2 w-2 rounded-full bg-[#8b5cf6]"></span> Submitted
        </div>
        <div className="text-muted-foreground flex items-center gap-2 text-xs">
          <span className="h-2 w-2 rounded-full bg-[#2dd4bf]"></span> Funded
        </div>
      </div>
    </div>
  );
}
