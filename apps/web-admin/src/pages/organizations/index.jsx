'use-client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { Button } from '@chakra-ui/react';

import DashboardLayout from '@/layouts/DashboardLayout';

import { useFetch } from '@/hooks/useFetch';
import { useAlert } from '@/hooks/useAlert';

import DataDisplay from '@/components/DataDisplay';

import { CSVLink } from 'react-csv';

import { useAuth0 } from '@auth0/auth0-react';

const columns = [
  { field: 'id', headerName: 'ID', width: 200 },
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'numberOfEvents', headerName: 'No of Events', width: 200 },
];

export default function Organizations() {
  const router = useRouter();
  const showAlert = useAlert();
  const { user, isAuthenticated } = useAuth0();
  const { loading, get } = useFetch();

  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    const fetchOrganizations = async () => {
      const { data, status } = await get('/core/organizations');
      if (status === 200) {
        setOrganizations(data.organizations || []);
      } else {
        showAlert({
          title: 'Error',
          description: data.error,
          status: 'error',
        });
      }
    };
    fetchOrganizations();
  }, []);

  const exportToCsv = () => {
    const csvData = organizations.map((org) => ({
      ID: org.id,
      Name: org.name,
      NumOfEvent: org.numberOfEvents,
    }));

    return (
      <CSVLink
        data={csvData}
        filename={`orgs.csv`}
        style={{ textDecoration: 'none' }} // Remove underline for link
      >
        <Button
          color="white" // color from other buttons
        >
          {' '}
          Export to CSV
        </Button>
      </CSVLink>
    );
  };
  return (
    <DashboardLayout
      pageTitle="Organizations"
      previousPage={`/organizations`}
      headerButton={
        <>
          <Button
            onClick={() => {
              router.push(`/organizations/new`);
            }}
            isLoading={loading}
          >
            Create Organization
          </Button>
          {exportToCsv()}
        </>
      }
      debugInfo={organizations}
    >
      <DataDisplay
        loading={loading}
        columns={columns}
        rows={organizations}
        onRowClick={(row) => {
          router.push(`/organizations/${row.id}`);
        }}
      />
    </DashboardLayout>
  );
}
