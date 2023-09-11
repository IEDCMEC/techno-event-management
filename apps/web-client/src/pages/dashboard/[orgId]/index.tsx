import React from 'react';
import { useRouter } from 'next/router';

import DashboardLayout from '../../../layouts/DashboardLayout';
import EventCard from '@/components/cards/EventCard';

const Dashboard = () => {
  const router = useRouter();
  const { orgId = [] } = router.query;

  return (
    <DashboardLayout>
      <div className="h-full w-full bg-neutral-100 flex flex-row justify-start items-start gap-4 flex-wrap">
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
