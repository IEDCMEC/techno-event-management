import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import DashboardLayout from '@/layouts/DashboardLayout';
import EventCard from '@/components/cards/EventCard';

import { Skeleton } from '@/components/ui/skeleton';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import axiosInstance from '@/lib/axios';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  const router = useRouter();
  const { organizationId } = router.query;

  const [newEvent, setNewEvent] = useState({});

  const addNewEvent = async () => {
    try {
      const { data, status } = await axiosInstance.post(`/core/${organizationId}/events/newEvent`, {
        participant,
      });
      console.log(data);
      if (status === 201) {
        window.alert('Event added successfully');
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
        <p className="text-3xl">Add New Event</p>
        <form
          className="w-3/5 mx-auto flex flex-col gap-4"
          value={newEvent}
          onChange={(e) => {
            setParticipant({ ...newEvent, [e.target.id]: e.target.value });
          }}
        >
          <Label htmlFor="event">Event</Label>
          <Input type="text" id="event" placeholder="John" />
          <Label htmlFor="eventName">Event Name</Label>
          <Input type="text" id="eventName" placeholder="Doe" />
          <Button
            onClick={(e) => {
              e.preventDefault();
              addNewEvent();
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
