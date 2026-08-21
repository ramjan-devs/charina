import SettingsHeader from './_components/SettingsHeader/SettingsHeader';
import SlaPolicyCard from './_components/SlaPolicyCard/SlaPolicyCard';
import TeamListCard from './_components/TeamListCard/TeamListCard';

export default function SettingsUsersPage() {
  return (
    <div className="flex h-full w-full flex-col">
      <div className="mx-auto w-full">
        <SettingsHeader />
        
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <TeamListCard />
          </div>
          <div className="lg:col-span-1">
            <SlaPolicyCard />
          </div>
        </div>
      </div>
    </div>
  );
}
