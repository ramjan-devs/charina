import { Banknote, FileText, CheckCircle2, XCircle, Users, LayoutList } from 'lucide-react';

const activities = [
  {
    id: 1,
    icon: Banknote,
    color: 'text-[#10b981] bg-[#10b981]/10',
    title: <p className="text-sm"><span className="text-foreground font-medium">Marcus Reed</span> funded <span className="text-foreground font-medium">Golden Fork Hospitality</span></p>,
    time: '12m ago',
  },
  {
    id: 2,
    icon: FileText,
    color: 'text-[#f59e0b] bg-[#f59e0b]/10',
    title: <p className="text-sm"><span className="text-foreground font-medium">AI Underwriter</span> flagged for manual review <span className="text-foreground font-medium">Harbor Point Logistics</span></p>,
    time: '38m ago',
  },
  {
    id: 3,
    icon: LayoutList,
    color: 'text-[#8b5cf6] bg-[#8b5cf6]/10',
    title: <p className="text-sm"><span className="text-foreground font-medium">Alina Fischer</span> uploaded 3 bank statements to <span className="text-foreground font-medium">Cascade Print Works</span></p>,
    time: '1h ago',
  },
  {
    id: 4,
    icon: CheckCircle2,
    color: 'text-[#10b981] bg-[#10b981]/10',
    title: <p className="text-sm"><span className="text-foreground font-medium">Marcus Reed</span> approved <span className="text-foreground font-medium">Sunset Dental Group</span></p>,
    time: '2h ago',
  },
  {
    id: 5,
    icon: XCircle,
    color: 'text-[#ef4444] bg-[#ef4444]/10',
    title: <p className="text-sm"><span className="text-foreground font-medium">Jordan Wells</span> declined <span className="text-foreground font-medium">Nova Auto Collision</span></p>,
    time: '4h ago',
  },
  {
    id: 6,
    icon: Users,
    color: 'text-[#3b82f6] bg-[#3b82f6]/10',
    title: <p className="text-sm"><span className="text-foreground font-medium">System</span> imported 42 new UCC leads to <span className="text-foreground font-medium">Lead Database</span></p>,
    time: '6h ago',
  },
];

export default function RecentActivity() {
  return (
    <div className="bg-card border-border flex h-full flex-col rounded-xl border p-5">
      <div className="mb-5">
        <h3 className="text-base font-semibold">Recent activity</h3>
        <p className="text-muted-foreground text-xs">Across the workspace</p>
      </div>

      <div className="flex flex-col gap-5">
        {activities.map((activity) => {
          const Icon = activity.icon;
          return (
            <div key={activity.id} className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${activity.color}`}>
                  <Icon size={14} strokeWidth={2.5} />
                </div>
                <div className="text-muted-foreground">{activity.title}</div>
              </div>
              <span className="text-muted-foreground shrink-0 text-xs">{activity.time}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
