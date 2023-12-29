import React, { useEffect, useState } from 'react';
import axiosInstance from '@/lib/axios';

import DashboardLayout from '../../layouts/DashboardLayout';

import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

import { useRouter } from 'next/router';

const Dashboard = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [organizations, setOrganizations] = useState([]);

  const fetchOrganizations = async () => {
    try {
      const { data, status } = await axiosInstance.get('/users/organizations');
      if (status === 200) setOrganizations(data.organizations || []);
      setLoading(false);
    } catch (error) {
      console.error(error);
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
        <Table>
          <TableCaption>Organization</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {organizations.map((o) => (
              <TableRow key={o.id}>
                <TableCell>{o.name}</TableCell>
                <TableCell>{o.role}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      router.push(`/organizations/${o.id}`);
                    }}
                  >
                    Manage
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell className="text-right">{organizations?.length}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>

        {!loading && organizations.length === 0 && (
          <div className="w-full h-full flex flex-col justify-center items-center">
            <p className="text-xl">You are not a part of any organization</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
