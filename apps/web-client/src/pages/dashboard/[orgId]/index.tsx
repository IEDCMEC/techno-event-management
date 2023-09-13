import React from 'react';
import { useRouter } from 'next/router';

import DashboardLayout from '../../../layouts/DashboardLayout';
import EventCard from '@/components/cards/EventCard';

const Dashboard = () => {
  const router = useRouter();
  const { orgId = [] } = router.query;

  return (
    <DashboardLayout>
      <div className="h-full w-full bg-black-russian flex flex-row justify-evenly items-center overflow-y-auto gap-8 flex-wrap p-6">
        <EventCard />
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
