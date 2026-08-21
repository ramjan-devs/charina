import InviteHeader from './_components/InviteHeader/InviteHeader';
import SendInvitationCard from './_components/SendInvitationCard/SendInvitationCard';
import ActiveUsersCard from './_components/UsersLists/ActiveUsersCard';
import PendingInvitationsCard from './_components/UsersLists/PendingInvitationsCard';

export default function InviteUserPage() {
  return (
    <div className=" flex h-full w-full flex-col">
      <div className="mx-auto w-full">
        <InviteHeader />
        <SendInvitationCard />
        <PendingInvitationsCard />
        <ActiveUsersCard />
      </div>
    </div>
  );
}
