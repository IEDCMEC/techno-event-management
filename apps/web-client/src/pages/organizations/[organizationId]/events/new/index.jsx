import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import DashboardLayout from '@/layouts/DashboardLayout';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { Button } from '@/components/ui/button';
import axiosInstance from '@/lib/axios';

const Dashboard = () => {
  const router = useRouter();
  const { organizationId } = router.query;

  const [event, setEvent] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, status } = await axiosInstance.post(`/core/${organizationId}/events`, {
      name: event.name,
    });

    if (status === 201) {
      router.push(`/organizations/${organizationId}/events`);
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
          value={event}
          onChange={(e) => {
            setEvent({ ...event, [e.target.id]: e.target.value });
          }}
        >
          <Label htmlFor="name">Name</Label>
          <Input type="text" id="name" placeholder="Big Event" />
          <Button onClick={handleSubmit}>Add</Button>
        </form>
      </div>
    </DashboardLayout>
  );
};
export default Dashboard;
