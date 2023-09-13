import React from 'react';
import { useRouter } from 'next/router';

import DashboardLayout from '../../../../layouts/DashboardLayout';
import ParticipantCard from '@/components/cards/ParticipantCard';

const Dashboard = () => {
  const router = useRouter();
  const { orgId = [] } = router.query;

  return (
    <DashboardLayout>
      <div className="h-full w-full bg-neutral-100 flex flex-row justify-start items-start gap-4 flex-wrap">
        <ParticipantCard name="John Doe" email="johndoe@email.com" isCheckedIn={false} />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
