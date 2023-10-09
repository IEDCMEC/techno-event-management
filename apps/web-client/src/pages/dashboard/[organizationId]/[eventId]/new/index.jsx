import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import DashboardLayout from '../../../../../layouts/DashboardLayout';
import ParticipantCard from '@/components/cards/ParticipantCard';

import { Skeleton } from '@/components/ui/skeleton';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import axiosInstance from '@/lib/axios';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  const router = useRouter();
  const { organizationId, eventId } = router.query;

  const [participant, setParticipant] = useState({});

  const addNewParticipant = async () => {
    try {
      const { data, status } = await axiosInstance.post(
        `/core/${organizationId}/events/${eventId}/participants`,
        {
          participant,
        },
      );
      console.log(data);
      if (status === 201) {
        window.alert('Participant added successfully');
        router.push(`/dashboard/${organizationId}/${eventId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DashboardLayout>
      <div
        className="h-full w-full bg-black-russian flex flex-col justify-start items-center overflow-y-auto
                    gap-8 flex-wrap p-6"
      >
        <p className="text-3xl">Add New Participant</p>
        <form
          className="w-3/5 mx-auto flex flex-col gap-4"
          value={participant}
          onChange={(e) => {
            setParticipant({ ...participant, [e.target.id]: e.target.value });
          }}
        >
          <Label htmlFor="firstName">Email</Label>
          <Input type="text" id="firstName" placeholder="John" />
          <Label htmlFor="lastName">Password</Label>
          <Input type="text" id="lastName" placeholder="Doe" />
          <Button
            onClick={(e) => {
              e.preventDefault();
              addNewParticipant();
            }}
          >
            Add
          </Button>
        </form>
      </div>
    </DashboardLayout>
  );
};
export default Dashboard;
