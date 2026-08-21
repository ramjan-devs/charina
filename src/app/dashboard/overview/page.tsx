import DealFlowTrend from './_components/DealFlowTrend/DealFlowTrend';
import OverviewHeader from './_components/OverviewHeader/OverviewHeader';
import OverviewStats from './_components/OverviewStats/OverviewStats';
import PipelineBreakdown from './_components/PipelineBreakdown/PipelineBreakdown';
import RecentActivity from './_components/RecentActivity/RecentActivity';
import TopDeals from './_components/TopDeals/TopDeals';

export default function OverviewPage() {
  return (
    <div className="flex h-full w-full flex-col">
      <div className="mx-auto w-full">
        <OverviewHeader />
        <OverviewStats />
        
        <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <DealFlowTrend />
          </div>
          <div className="lg:col-span-1">
            <PipelineBreakdown />
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <TopDeals />
          </div>
          <div className="lg:col-span-1">
            <RecentActivity />
          </div>
        </div>
      </div>
    </div>
  );
}
