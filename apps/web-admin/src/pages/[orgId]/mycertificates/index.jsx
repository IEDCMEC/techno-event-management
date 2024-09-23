import React from 'react';
import { useRouter } from 'next/router';
import DashboardLayout from '@/layouts/DashboardLayout';
import ComingSoon from '@/components/ComingSoon';
import CertifcateUploadBox from '@/components/CertificateUploadBox';

const MyCertificates = () => {
  const router = useRouter();
  const { orgId } = router.query;
  return (
    <DashboardLayout pageTitle="My Certificates" previousPage={`/${orgId}`}>
      {/* <ComingSoon /> */}
      <CertifcateUploadBox />
    </DashboardLayout>
  );
};

export default MyCertificates;
