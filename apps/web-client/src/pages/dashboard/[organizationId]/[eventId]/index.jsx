import React from 'react';
import { useRouter } from 'next/router';

import DashboardLayout from '../../../../layouts/DashboardLayout';
import ParticipantCard from '@/components/cards/ParticipantCard';

import { Skeleton } from '@/components/ui/skeleton';

const Dashboard = () => {
  const router = useRouter();
  const { orgId = [] } = router.query;

  const [participant, setParticipant] = React.useState('Allen');

  return (
    <DashboardLayout>
      <ParticipantCard
        name="John Smith"
        email="john"
        participant={participant}
        setParticipant={setParticipant}
      />
      <ParticipantCard name="George Smith" email="john" />
    </DashboardLayout>
  );
};

export default Dashboard;
