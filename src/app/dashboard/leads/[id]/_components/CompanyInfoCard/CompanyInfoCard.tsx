export default function CompanyInfoCard() {
  return (
    <div className="bg-card border-border flex flex-col overflow-hidden rounded-xl border">
      <div className="border-border border-b p-5">
        <h3 className="font-semibold">Company Information</h3>
      </div>
      
      <div className="grid grid-cols-1 gap-6 p-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <span className="text-muted-foreground text-xs font-bold tracking-wider uppercase">Company Website</span>
          <a href="https://www.redlineparts.com" target="_blank" rel="noreferrer" className="text-info hover:underline font-medium">
            www.redlineparts.com
          </a>
        </div>
        
        <div className="flex flex-col gap-1.5">
          <span className="text-muted-foreground text-xs font-bold tracking-wider uppercase">Industry</span>
          <span className="text-foreground font-medium">Automotive Services</span>
        </div>
        
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <span className="text-muted-foreground text-xs font-bold tracking-wider uppercase">Physical Address</span>
          <span className="text-foreground font-medium">842 Industrial Way, Suite 200, Irvine, CA 92618</span>
        </div>
        
        <div className="flex flex-col gap-1.5">
          <span className="text-muted-foreground text-xs font-bold tracking-wider uppercase">Est. Annual Revenue</span>
          <span className="text-foreground font-medium">$2.4M - $3.8M</span>
        </div>
        
        <div className="flex flex-col gap-1.5">
          <span className="text-muted-foreground text-xs font-bold tracking-wider uppercase">Years in Business</span>
          <span className="text-foreground font-medium">8 Years</span>
        </div>
      </div>
    </div>
  );
}
