import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import DashboardLayout from '../../../../layouts/DashboardLayout';
import EventCard from '@/components/cards/EventCard';

import { Skeleton } from '@/components/ui/skeleton';
import { PlusCircledIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import axiosInstance from '@/lib/axios';

const Dashboard = () => {
  const router = useRouter();
  const { organizationId } = router.query;

  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (!organizationId) return;
    const fetchEvents = async () => {
      try {
        const { data, status } = await axiosInstance.get(`core/${organizationId}/events`);

        if (status === 200) setEvents(data.events || []);

        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(true);
      }
    };
    fetchEvents();
  }, [router, organizationId]);

  return (
    <DashboardLayout>
      <div className="flex flex-row justify-end">
        <Button
          onClick={() => {
            router.push(`/organizations/${organizationId}/events/new`);
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
        {events.map((e) => (
          <EventCard key={e.id} event={e} />
        ))}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
