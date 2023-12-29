import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import DashboardLayout from '@/layouts/DashboardLayout';
import EventCard from '@/components/cards/EventCard';

import { Skeleton } from '@/components/ui/skeleton';
import { PlusCircledIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import axiosInstance from '@/lib/axios';

const Dashboard = () => {
  const router = useRouter();
  const { organizationId, eventId } = router.query;

  const [loading, setLoading] = useState(true);
  const [participants, setParticipants] = useState([]);

  const fetchParticipants = async () => {
    try {
      const { data, status } = await axiosInstance.get(
        `/core/${organizationId}/events/${eventId}/participants`,
      );

      if (status === 200) setParticipants(data.participants || []);

      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(true);
    }
  };

  useEffect(() => {
    if (!organizationId || !eventId) return;
    fetchParticipants();
  }, [router, organizationId, eventId]);

  return (
    <DashboardLayout>
      <div className="flex flex-row justify-end">
        <Button
          onClick={() => {
            router.push(`/organizations/${organizationId}/new`);
          }}
        >
          <PlusCircledIcon className="mr-2 h-4 w-4" />
          New
        </Button>
      </div>
      <div className="h-full w-full bg-black-russian flex flex-row justify-start items-start overflow-y-auto gap-8 flex-wrap p-6">
        {loading && (
          <>
            <Skeleton className="w-[100px] h-[20px] rounded-full" />
            <Skeleton className="w-[100px] h-[20px] rounded-full" />
            <Skeleton className="w-[100px] h-[20px] rounded-full" />
            <Skeleton className="w-[100px] h-[20px] rounded-full" />
          </>
        )}
        {participants.map((p) => (
          <div key={p?.id}>{JSON.stringify(p)}</div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
