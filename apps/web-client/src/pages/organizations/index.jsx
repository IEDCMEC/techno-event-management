import React, { useEffect, useState } from 'react';
import axiosInstance from '@/lib/axios';

import DashboardLayout from '../../layouts/DashboardLayout';

import { Skeleton } from '@/components/ui/skeleton';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from '@chakra-ui/react';

import { useRouter } from 'next/router';

const Dashboard = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [organizations, setOrganizations] = useState([]);

  const fetchOrganizations = async () => {
    try {
      const { data, status } = await axiosInstance.get('/users/organizations');
      if (status === 200) setOrganizations(data.organizations || []);
      //setLoading(false);
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
            <Skeleton className="w-full h-[20px] rounded-full" />
          </>
        )}
        {!loading && organizations.length > 0 && (
          <TableContainer width="100%">
            <Table>
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Role</Th>
                </Tr>
              </Thead>
              <Tbody>
                {organizations.map((organization) => (
                  <Tr
                    key={organization.id}
                    onClick={() => {
                      router.push(`/organizations/${organization.id}`);
                    }}
                  >
                    <Td>{organization.name}</Td>
                    <Td>{organization.role}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        )}

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
