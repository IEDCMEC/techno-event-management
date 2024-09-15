import React from 'react';
import { useRouter } from 'next/router';
import DashboardLayout from '@/layouts/DashboardLayout';
import ComingSoon from '@/components/ComingSoon';

const EmailSettings = () => {
  const router = useRouter();
  const { orgId } = router.query;
  return (
    <DashboardLayout pageTitle="Email Settings" previousPage={`${orgId}`}>
      <ComingSoon />
    </DashboardLayout>
  );
};

export default EmailSettings;
