import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function InviteHeader() {
  return (
    <div className="mb-6 flex flex-col gap-3">
      <Link href="/dashboard/settings-users" className="text-muted-foreground hover:text-foreground flex w-fit items-center gap-1 text-sm font-medium transition-colors">
        <ArrowLeft size={16} />
        Back to Settings
      </Link>
      <div>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Invite User</h1>
        <p className="text-muted-foreground mt-1 text-sm">Manage your team members and their access levels.</p>
      </div>
    </div>
  );
}
