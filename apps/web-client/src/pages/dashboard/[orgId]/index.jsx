import React from 'react';
import { useRouter } from 'next/router';

import DashboardLayout from '../../../layouts/DashboardLayout';
import EventCard from '@/components/cards/EventCard';

import { Skeleton } from '@/components/ui/skeleton';

const Dashboard = () => {
  const router = useRouter();
  const { orgId = [] } = router.query;

  return (
    <DashboardLayout>
      <div className="h-full w-full bg-black-russian flex flex-row justify-evenly items-center overflow-y-auto gap-8 flex-wrap p-6">
        <Skeleton className="w-[100px] h-[20px] rounded-full" />
        <Skeleton className="w-[100px] h-[20px] rounded-full" />
        <Skeleton className="w-[100px] h-[20px] rounded-full" />
        <Skeleton className="w-[100px] h-[20px] rounded-full" />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
