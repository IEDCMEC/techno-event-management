import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import axiosInstance from '@/lib/axios';

import DashboardLayout from '../../../layouts/DashboardLayout';
import EventCard from '@/components/cards/EventCard';

import { Skeleton } from '@/components/ui/skeleton';

const Dashboard = () => {
  const router = useRouter();
  const { organizationId } = router.query;

  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const { data, status } = await axiosInstance.get(`/core/${organizationId}/events/`);
      console.log(data);
      if (status === 200) {
        setEvents(data?.events);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(true);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [organizationId]);

  return (
    <DashboardLayout>
      <div className="h-full w-full bg-black-russian flex flex-row justify-start items-start overflow-y-auto gap-8 flex-wrap p-6">
        {loading && (
          <>
            <Skeleton className="w-[100px] h-[20px] rounded-full" />
            <Skeleton className="w-[100px] h-[20px] rounded-full" />
            <Skeleton className="w-[100px] h-[20px] rounded-full" />
            <Skeleton className="w-[100px] h-[20px] rounded-full" />
          </>
        )}
        {!loading && events.map((e) => <EventCard key={e.id} name={e.name} />)}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
