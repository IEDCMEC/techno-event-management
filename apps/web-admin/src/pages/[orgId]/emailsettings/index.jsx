import React from 'react';
import { useRouter } from 'next/router';
import DashboardLayout from '@/layouts/DashboardLayout';

const EmailSettings = () => {
  const router = useRouter();
  const { orgId } = router.query;
  return (
    <DashboardLayout pageTitle="Email Settings" previousPage={`${orgId}`}>
      <h1>Coming Soon</h1>
      <p>This feature is currently under development</p>
    </DashboardLayout>
  );
};

export default EmailSettings;
