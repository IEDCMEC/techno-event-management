import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import DashboardLayout from '../../../../layouts/DashboardLayout';
import ParticipantCard from '@/components/cards/ParticipantCard';

import { Skeleton } from '@/components/ui/skeleton';

import axiosInstance from '@/lib/axios';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { PlusCircledIcon } from '@radix-ui/react-icons';

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
      console.log(JSON.stringify(data.participants[0]));
      if (status === 200) {
        setParticipants(data?.participants);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(true);
    }
  };

  const checkInParticipant = async (participantId) => {
    try {
      const { data, status } = await axiosInstance.post(
        `/core/${organizationId}/events/${eventId}/checkin/participants/${participantId}`,
        {
          checkinDetails: {
            checkinTime: new Date().toISOString(),
          },
        },
      );
      console.log(data);
      if (status === 200) {
        window.alert('Participant checked in successfully');
        setLoading(true);
        setParticipants([]);
        fetchParticipants();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchParticipants();
  }, [organizationId, eventId]);

  return (
    <DashboardLayout>
      <Tabs defaultValue="all" className="h-full space-y-6">
        <div className="space-between flex items-center">
          <TabsList>
            <TabsTrigger value="all" className="relative">
              All
            </TabsTrigger>
            <TabsTrigger value="checked-in" disabled>
              Checked In
            </TabsTrigger>
            <TabsTrigger value="not-checked-in" disabled>
              Not Checked In
            </TabsTrigger>
          </TabsList>
          <div className="ml-auto mr-4">
            <Button
              onClick={() => {
                router.push(`/dashboard/${organizationId}/${eventId}/new`);
              }}
            >
              <PlusCircledIcon className="mr-2 h-4 w-4" />
              Add
            </Button>
          </div>
        </div>
        <TabsContent value="all" className="border-none p-0 outline-none flex gap-4">
          <div
            className="h-full w-full bg-black-russian flex flex-row justify-start items-start overflow-y-auto
                    gap-8 flex-wrap p-6"
          >
            {loading && (
              <>
                <Skeleton className="w-[100px] h-[20px] rounded-full" />
                <Skeleton className="w-[100px] h-[20px] rounded-full" />
                <Skeleton className="w-[100px] h-[20px] rounded-full" />
                <Skeleton className="w-[100px] h-[20px] rounded-full" />
              </>
            )}
            {!loading &&
              participants.map((p) => (
                <ParticipantCard
                  key={p.id}
                  participant={p}
                  onClick={(e) => {
                    e.preventDefault();
                    checkInParticipant(p.id);
                  }}
                />
              ))}
          </div>
        </TabsContent>
        <TabsContent
          value="checked-in"
          className="h-full flex-col border-none p-0 data-[state=active]:flex"
        >
          Content 2
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Dashboard;
