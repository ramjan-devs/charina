import CompanyInfoCard from './_components/CompanyInfoCard/CompanyInfoCard';
import ContactInfoCard from './_components/ContactInfoCard/ContactInfoCard';
import LeadViewHeader from './_components/LeadViewHeader/LeadViewHeader';

export default function LeadViewPage() {
  return (
    <div className="flex h-full w-full flex-col">
      <div className="mx-auto w-full">
        <LeadViewHeader />
        
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <CompanyInfoCard />
          </div>
          <div className="lg:col-span-1">
            <ContactInfoCard />
          </div>
        </div>
      </div>
    </div>
  );
}
