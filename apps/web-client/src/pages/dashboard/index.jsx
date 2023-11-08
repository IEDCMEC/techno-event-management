import React, { useEffect, useState } from 'react';
import axiosInstance from '@/lib/axios';

import DashboardLayout from '../../layouts/DashboardLayout';

import { Skeleton } from '@/components/ui/skeleton';
import OrganizationCard from '@/components/cards/OrganizationCard';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [organizations, setOrganizations] = useState([]);

  const fetchOrganizations = async () => {
    try {
      const { data, status } = await axiosInstance.get(`/users/organizations`);
      if (status === 200) {
        setOrganizations(data?.organizations);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(true);
    }
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

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
        {!loading &&
          organizations.map((o) => (
            <OrganizationCard key={o.id} id={o.id} name={o.name} role={o.role} />
          ))}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
