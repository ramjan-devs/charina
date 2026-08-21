import DynamicBadge from '@/components/dashboard/DynamicBadge/DynamicBadge';
import { Mail, Phone } from 'lucide-react';

export default function ContactInfoCard() {
  return (
    <div className="bg-card border-border flex h-full flex-col overflow-hidden rounded-xl border">
      {/* Primary Contact Section */}
      <div className="border-border flex flex-col gap-5 border-b p-5">
        <h3 className="text-muted-foreground text-xs font-bold tracking-wider uppercase">Primary Contact</h3>
        
        <div className="flex items-center gap-3">
          <div className="bg-primary/20 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-bold">
            VS
          </div>
          <div className="flex flex-col">
            <span className="text-foreground font-bold">Victor Salas</span>
            <span className="text-muted-foreground text-sm">Owner / Director</span>
          </div>
        </div>
        
        <div className="flex flex-col gap-3 text-sm">
          <div className="text-muted-foreground flex items-center gap-3">
            <Mail size={16} />
            <span className="text-foreground">vsalas@redlineparts.com</span>
          </div>
          <div className="text-muted-foreground flex items-center gap-3">
            <Phone size={16} />
            <span className="text-foreground">(714) 220-9911</span>
          </div>
        </div>
      </div>
      
      {/* Internal Team Section */}
      <div className="flex flex-col gap-5 p-5">
        <h3 className="text-muted-foreground text-xs font-bold tracking-wider uppercase">Internal Team</h3>
        
        <div className="flex flex-col gap-1.5">
          <span className="text-muted-foreground text-xs">Assigned Agent</span>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex h-6 w-6 overflow-hidden rounded-full bg-slate-300">
              <img src="https://i.pravatar.cc/150?u=marcus" alt="Avatar" className="h-full w-full object-cover" />
            </div>
            <span className="text-foreground font-semibold text-sm">Marcus Reed</span>
          </div>
        </div>
        
        <div className="flex flex-col gap-2 mt-2">
          <span className="text-muted-foreground text-xs">Lead Source</span>
          <DynamicBadge text="UCC Filings" color="#8b5cf6" size="sm" />
        </div>
      </div>
    </div>
  );
}
