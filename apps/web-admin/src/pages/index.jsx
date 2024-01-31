import { useEffect } from 'react';
import { useRouter } from 'next/router';

import DashboardLayout from '@/layouts/DashboardLayout';

function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/organizations');
  }, [router]);

  return <DashboardLayout></DashboardLayout>;
}

export default Dashboard;
