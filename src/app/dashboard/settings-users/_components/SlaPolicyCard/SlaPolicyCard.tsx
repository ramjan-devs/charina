export default function SlaPolicyCard() {
  const policies = [
    { label: 'New Lead first contact', value: '15 minutes' },
    { label: 'Underwriting decision', value: '4 hours' },
    { label: 'Approved to contract sent', value: '1 business day' },
  ];

  return (
    <div className="bg-card border-border flex h-fit flex-col rounded-xl border">
      <div className="border-border flex flex-col border-b p-5">
        <h3 className="text-base font-semibold">SLA policy</h3>
        <p className="text-muted-foreground text-xs">Drives the pipeline timers</p>
      </div>
      
      <div className="flex flex-col">
        {policies.map((policy, index) => (
          <div key={index} className="border-border flex items-center justify-between border-b p-5 last:border-0 hover:bg-muted/50 transition-colors">
            <span className="text-muted-foreground text-sm">{policy.label}</span>
            <span className="text-foreground text-sm font-medium">{policy.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
