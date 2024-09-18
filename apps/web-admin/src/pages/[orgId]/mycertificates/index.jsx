import React from 'react';
import { useRouter } from 'next/router';
import DashboardLayout from '@/layouts/DashboardLayout';
import ComingSoon from '@/components/ComingSoon';

const MyCertificates = () => {
  const router = useRouter();
  const { orgId } = router.query;
  return (
    <DashboardLayout pageTitle="My Certificates" previousPage={`${orgId}`}>
      <ComingSoon />
    </DashboardLayout>
  );
};

export default MyCertificates;
